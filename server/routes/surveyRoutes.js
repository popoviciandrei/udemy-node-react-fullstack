const _ = require('lodash');
const Path = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');

const requireLogin = require('../middlewares/requireLogin'); // method to check if logged in
const requireCredits = require('../middlewares/requireCredits'); // to check if user has enough credit

const RecipientSchema = require('../database/models/Recipient');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  // Get a list of surveys for current user
  app.get(
    '/api/surveys',
    requireLogin, // check if user is logged
    async (req, res) => {
      const surveys = await Survey.find({ _user: req.user.id }).select({
        recipients: false
      });

      res.send(surveys);
    }
  );

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('<h1>Thank you for your vote!</h1>');
  });

  /**
   * Get the callback of newsletters SendGrid service
   */
  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    // Used the loadash chaining technique
    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {
            email,
            surveyId: match.surveyId,
            choice: match.choice
          };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
          },
          {
            $inc: { [choice]: 1 }, // increment yes or no property for survey with 1,
            // $inc is for incrementing
            $set: { 'recipients.$.responded': true }, // update the sub recipient
            // collection with responded : true. $ is for recipient id,
            lastResponded: new Date()
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  // Create a new survey and send an email to all the recipients
  app.post(
    '/api/surveys',
    requireLogin, // check if user is logged redux method
    requireCredits, // check if user has enough credits redux method
    async (req, res) => {
      const { title, subject, body, recipients } = req.body;

      const survey = new Survey({
        title,
        subject,
        body,
        recipients: recipients
          .split(',')
          .map(email => ({ email, responded: false })),
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

        res.send(user);
      } catch (err) {
        res.status(422).send(err);
      }
    }
  );
};
