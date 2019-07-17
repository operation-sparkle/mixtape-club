const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
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
        // User.findOrCreate({ googleId: profile.id }, function (err, user) {
        //     return done(err, user);
        // });
        console.log(profile);
       process.nextTick(function(){
           return done(null, profile);
       })
    }
))


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
    debugger;
    let queryString = req.body.query
    axios({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet',
            params: {
            key: process.env.YOUTUBE_API_KEY,
            q: queryString,
            maxResults: 10,
            videoEmbeddable: true,
            type: 'video',
            }
        })
        .then((response)=> {
            console.log(response);
        })
        .catch((err)=> {
            console.log('Error searching youtube:', err);
        })
    
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Your app is sparkling on port ${PORT}!`));