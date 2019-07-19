const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('../database/index.js')
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (obj, done) {
//this function will use the user info to access database info
    done(null, obj);
});


//beginning of google authentication
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/callback',
    passReqToCallback: true,
},
    function (req, token, tokenSecret, profile, done) {
        db.findCreate({ googleId: profile.id }, (err, user) => {
            return done(err, user);
        });
        console.log(profile);
       process.nextTick(function(){
           return done(null, profile);
       })
    }
))


// when refreshing on different endpoints, our page would crash.
// https://tylermcginnis.com/react-router-cannot-get-url-refresh/
// Read article above for explanation 
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.post('/update' , (req, res) => {
    // need to figure out how we are sending info to endpoint
    const filter = { userId: 'CHANGE THE FILTER SOMEHOW FILL_ME_IN'};
    const update = { tapeDeck: 'FILL_ME_IN'};
    db.updatePlaylist(filter, update, (response) => {
        console.log(response);
        res.end('Playlist Updated');
    });
});

app.post('/store' , (req, res) => {
    // need to figure out how we are sending info to endpoint
    const {userId, aSideLinks, bSideLinks, tapeDeck, tapeLabel} = req.body
    const playlistDetails = {
            userId,
            aSideLinks: aSideLinks.toString(),
            bSideLinks: bSideLinks.toString(),
            tapeDeck,
            tapeLabel,
        }
        console.log(playlistDetails);
        db.storePlaylist(playlistDetails, (response) => {
        // console.log(response);
        res.end('Playlist Stored')
    });
});

app.post('/mixtape-player', (req, res) => {
    //need to do this dynamically
    const filter = {'FIL_ME_IN': 'FIL_ME_IN'}
    db.retrievePlaylist(filter, (response) => {
        console.log(response);  
        res.end('word', response)
    });
});



// This will call google's authentication
app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

// Redirect on success or failure
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
       res.redirect('http://localhost:3000/');
    });

app.get('/', (req, res) => {
    console.log(req);
    res.render('/');
});

app.post('/search', (req, res) => {
    let data;
    let queryString = req.body.query
    let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet';
    let options = {
        params: {
            key: process.env.YOUTUBE_API_KEY,
            q: queryString,
            maxResults: 8,
            videoEmbeddable: true,
            type: 'video',
        }
    }
    axios.get(url, options)
        .then((response)=> {
            res.send(response.data);
            
        })
        .catch((err)=> {
            console.log('Error searching youtube:', err);
            res.send(err);
        })
    
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Your app is sparkling on port ${PORT}!`));