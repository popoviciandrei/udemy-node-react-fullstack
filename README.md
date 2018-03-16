Demo Project Using React/Nodejs/MongoDb

Feature:
- Authenticate on the site using Google Oauth
- Customer can buy tokens ( using Stripe )
- Customer can use 1 token to create and email a campaign
- Email are being sent to users via SendGrid Api serivce
- The newsletter receivers have the option to click "yes"/"no" 
in their email to newsletter  "Polls" 
- The response is being captured back in the app and the results are being shown against
the newsletter campaing ( Count of "Yes", Count of "No") 

The project is built to be deployed with heroku (https://www.heroku.com/) 



Local setup:
After cloning locally run these steps:
1. Install npm dependencies for "server" & "client"
    ```bash
    npm install
    npm install --prefix client
    ```
2. Inside "server/config" copy a "keys-prod.js" to "keys-dev.js"
    You'll have to replace all the "process.env.<<CONST>>" with values that you
    want to use on your local dev:
    * googleClientID & googleClientSecret keys: can be obtained from https://console.developers.google.com/.
        * Go To "Credentials". 
        * In the new screen click "Create Credentails" dropdown and select "OAuth client ID".
        * Select "Web application"
        * In the new screen You should get the keys for the "clientID" & "clientSecret". These values to be added in the key-dev.js
        * Also add http://localhost:3000 & http://localhost:5000 for "Authorised JavaScript origins"
        * Also add http://localhost:3000/auth/google/callback & http://localhost:5000/auth/google/callback for authorised redirect URIs
    * mongoURI: path to your mongo instance
    * cookieKey: any random text to encrypt the cookie
    * stripePublishableKey & stripeSecretKey: these needs to come from your Strip test account (https://stripe.com/gb)
    * sendGridKey: the key to connect to SendGrid (http://www.sendgrid.com/) and send emails 
     



### Miscelaneous
#### Server libraries:
- "nodman" 
- "redux"
- "localtunnel" : for forwarding calls to localhost

### Client libraries:

- "axios": for ajax requests
- "redux-thunk": to allow 
- "react-stripe-checkout": Strip Payment checkout
_ "_" lodash https://lodash.com/: A modern JavaScript utility library delivering modularity, performance & extras.
