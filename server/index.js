const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./config/keys');

// Init the passport for Oauth2 via google
require('./database/models/User');
require('./services/passport');

// Init the mongoDb
require('./database/setup');

const app = express(); // Create thea app
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // Set the app to accept json body requests

require('./routes/routes')(app); // Attach the router to the app

// Start the app to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Running on port 5000');
});
