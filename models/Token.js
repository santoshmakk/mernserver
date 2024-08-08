// models/Token.js
const mongoose = require('mongoose');

const TokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  scopes: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Token', TokenSchema);
