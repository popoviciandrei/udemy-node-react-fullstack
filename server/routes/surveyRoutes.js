const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin'); // method to check if logged in
const requireCredits = require('../middlewares/requireCredits'); // to check if user has enough credit

const RecipientSchema = require('../database/models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys/thx', (req, res) => {
    console.log(req.body);
    res.send('Thx for voting!');
  });

  // Create a new survey and send an email to all the recipients
  app.post(
    '/api/surveys',
    requireLogin, // check if user is logged in
    requireCredits, // check if user has enough credits
    async (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients.split(',').map(email => ({ email })),
        _user: req.user.id,
        dateSent: Date.now()
      });

      // Place to send the email
      const mailer = new Mailer(survey, surveyTemplate(survey));

      try {
        await mailer.send();
        await survey.save();

        req.user.credits -= 1;
        const user = await req.user.save();

        console.log(user);

        res.send(user);
      } catch (err) {
        console.log(err);
        res.status(422).send(err);
      }
    }
  );
};
