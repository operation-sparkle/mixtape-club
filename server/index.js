const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
require('dotenv').config();

const app = express();

app.use(express.static(path.join(__dirname, '../dist')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

process.env.CLIENT_ID;
debugger;
const PORT = 3000;

app.listen(PORT, () => console.log(`Your app is sparkling on port ${PORT}!`));