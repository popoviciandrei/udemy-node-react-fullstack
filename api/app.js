const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const routes = require('./routes/routes');
const app = express();

// Init the Mongodb connection
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  mongoose.connect('mongodb://127.0.0.1/udemy_emaily', {
    useMongoClient: true
  });
}

// Set the app to accept json body requests
app.use(bodyParser.json());

// Attach the router to the app
routes(app);

module.exports = app;
