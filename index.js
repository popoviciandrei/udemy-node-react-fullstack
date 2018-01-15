const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');

const keys = require('./server/config/keys');

// Init the passport for Oauth2 via google
require('./server/database/models/User');
require('./server/services/passport');

// Init the mongoDb
require('./server/database/setup');

const app = express(); // Create thea app

// Add the middlewares for various checks
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json()); // Set the app to accept json body requests

require('./server/routes/authRoutes')(app); // Attach the authentication router to the app
require('./server/routes/billingRoutes')(app); // Attach the billing router

if (process.env.NODE_ENV === 'production') {
  // Express will server up production assets
  // like our main.js file or main.css file!
  app.use(express.static('client/build'));
  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Start the app to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Running on port 5000');
});
