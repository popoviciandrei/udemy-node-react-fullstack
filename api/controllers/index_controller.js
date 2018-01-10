// Default controller
// Used as a hello world
module.exports = {
  // GET / api call
  helloworld(req, res, next) {
    res.send({ hi: 'there' });
  }
};
