const mongoose = require('mongoose');
const { Schema } = mongoose;

const RecipientSchema = new Schema({
  email: String,
  responded: { type: Boolean, default: false }
});

mongoose.model('recipient', RecipientSchema);
