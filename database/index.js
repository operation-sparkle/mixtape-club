var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mtc', {useNewUrlParser: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('we live');
});     
const playlistSchema = new mongoose.Schema({
    id: Number,
    userId: Number,
    aSideLinks: String,
    bSideLinks: String,
    aTitles: String,
    bTitles: String,
    tapeDeck: String,
    tapeLabel: String,
});

const userSchema = new mongoose.Schema({
    id: Number,
    googleId: String,
    profileId: String,
});

const Playlist = mongoose.model('Playlist', playlistSchema);
const User = mongoose.model('User', userSchema);
