const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  createAt: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('user', UserSchema);
