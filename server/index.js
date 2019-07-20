const express = require('express');
const session = require('express-session');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../database/index.js');
const ObjectId = require('mongodb').ObjectID;

require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((obj, done) => {
// this function will use the user info to access database info
  done(null, obj);
});


// beginning of google authentication
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true,
},
((req, token, tokenSecret, profile, done) => {
  db.findCreate({ googleId: profile.id, displayName: profile.displayName }, (err, user) => done(err, user));
  console.log(profile);
  process.nextTick(() => done(null, profile));
})));

// This will call google's authentication
app.get('/auth/google',
  passport.authenticate('google', {
    scope:
            ['email', 'profile'],
  }));

// Redirect on success or failure
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    res.redirect('http://localhost:3000/mixtape-player');
  });


app.get('/user/', (req, res) => {
  res.send(req.user);
});

app.get('/logout', (req, res) => {
  req.logOut();
  console.log('logged out');
});
// when refreshing on different endpoints, our page would crash.
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/
// Read article above for explanation
app.get('/getUser', (req, res) => {
  db.findCreate(req.query, (info, response) => {
    console.log(response);
    res.send(response);
  });
});

app.get('/userPlaylists', (req, res) => {
  const { id, displayName } = req.user;
   console.log(displayName);
  db.getAllPlaylists({ userId: id }, (info, response) => {
    console.log(response);
    const data = { response, displayName };
    res.send(data);
  });
});

app.get('/', (req, res) => {
  res.redirect('http://localhost:3000/mixtape-player');
});

app.get('/*', (req, res) => {
  if (req.path !== '/auth/google/callback') {
    if (req.path === '/create-mixtapes') {
      if (!req.user) {
        res.redirect('http://localhost:3000/login');
      }
    } else if (req.path === '/') {
      res.redirect('http://localhost:3000/mixtape-player');
    } else {
      res.sendFile(path.join(__dirname, '../dist/index.html'));
    }
  }
});

app.post('/update', (req, res) => {
  // need to figure out how we are sending info to endpoint
  const filter = { userId: 'CHANGE THE FILTER SOMEHOW FILL_ME_IN' };
  const update = { tapeDeck: 'FILL_ME_IN' };
  db.updatePlaylist(filter, update, (response) => {
    console.log(response);
    res.end('Playlist Updated');
  });
});

app.post('/store', (req, res) => {
  // need to figure out how we are sending info to endpoint
  const {
    userId, aSideLinks, bSideLinks, tapeDeck, tapeLabel,
  } = req.body;
  const playlistDetails = {
    userId,
    aSideLinks: JSON.stringify(aSideLinks),
    bSideLinks: JSON.stringify(bSideLinks),
    tapeDeck,
    tapeLabel,
  };
  // console.log(playlistDetails);
  db.storePlaylist(playlistDetails, (response) => {
    console.log(response);
    res.end('Playlist Stored');
  });
});

app.post('/getLink', (req, res) => {
  const { key } = req.body;
  const filter = { aSideLinks: key };
  db.retrievePlaylist(filter, (response) => {
    if (response === null) {
      res.end('No Results Found');
    } else {
      console.log(response._id);

      res.send({ id: response._id });
    }
  });
});

app.post('/mixtape-player/', (req, res) => {
  // need to do this dynamically
  const { id } = req.body;
  const filter = { _id: id };

  db.retrievePlaylist(filter, (response) => {
    if (response === null) {
      res.end('No Results Found');
    } else {
      const {
        aSideLinks, bSideLinks, tapeDeck, tapeLabel, userId,
      } = response;
      const aSide = JSON.parse(aSideLinks);
      let bSide;
      if (bSideLinks) {
        bSide = JSON.parse(bSideLinks);
        const data = {
          aSide,
          bSide,
          tapeDeck,
          tapeLabel,
          userId,
        };
        res.send(data);
      } else {
        const data = {
          aSide,
          tapeDeck,
          tapeLabel,
          userId,
        };
        res.send(data);
      }
    }
  });
});


app.post('/search', (req, res) => {
  const queryString = req.body.query;
  const url = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
  const options = {
    params: {
      key: process.env.YOUTUBE_API_KEY,
      q: queryString,
      maxResults: 8,
      videoEmbeddable: true,
      type: 'video',
    },
  };
  axios.get(url, options)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error searching youtube:', err);
      res.send(err);
    });
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Your app is sparkling on port ${PORT}!`));
