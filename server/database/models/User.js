const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  googleId: String,
  name: String,
  createAt: {
    type: Date,
    default: Date.now
  },
  credits: {
    type: Number,
    default: 0
  }
});

mongoose.model('user', UserSchema);
