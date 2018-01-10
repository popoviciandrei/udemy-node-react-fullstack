const IndexController = require('../controllers/index_controller');
module.exports = app => {
  app.get('/', IndexController.helloworld);
};
