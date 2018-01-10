const app = require('./app');

// Start the app to listen on port 5000
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('Running on port 5000');
});
