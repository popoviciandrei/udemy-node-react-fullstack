const passport = require('passport');

module.exports = app => {
  app.get('/', (req, res) => {
    res.send({ hello: 'World' });
  });
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout(); // this clears the cookie, session..
    res.send(req.user);
  });

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });

  app.get('/api/music_albums', (req, res) => {
    res.send([
      {
        title: 'Taylor Swift',
        artist: 'Taylor Swift'
      },
      {
        title: 'Fearless',
        artist: 'Taylor Swift'
      },
      {
        title: 'Speak Now',
        artist: 'Taylor Swift'
      }
    ]);
  });
};