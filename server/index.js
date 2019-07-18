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



app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'), function (err) {
        if (err) {
            res.status(500).send(err)
        }
    })
})

app.post('/francoTest' , (req, res) => {
        const playListDetails = {
            userId: 'franco3445',
            aSideLinks: '[https://www.youtube.com/watch?v=gWju37TZfo0, https://www.youtube.com/watch?v=WLNzTZVvoWs]',
            bSideLinks: '[https://www.youtube.com/watch?v=lDK9QqIzhwk]',
            aTitles: '[Intl Players Anthem, Roses]',
            bTitles: '[Living on a Prayer]',
            tapeDeck: 'blue',
            tapeLabel: 'Hey there!'
        }
        db.storePlaylist(playListDetails, (response) => {
            console.log(response);
            res.end('meow');
        });
        // db.findCreate({googleId:'peter'}, (err, user) => {
        //     res.json(user);
        // })
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
            maxResults: 10,
            videoEmbeddable: true,
            type: 'video',
        }
    }
       axios.get(url, options)
        .then((response)=> {
            data = response.data;
            res.send(data);
            
        })
        .catch((err)=> {
            console.log('Error searching youtube:', err);
            res.send(err);
        })
    
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Your app is sparkling on port ${PORT}!`));