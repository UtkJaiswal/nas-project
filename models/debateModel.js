const mongoose = require('mongoose');

const debateSchema = new mongoose.Schema({
  standard: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  questions: {
    type: [String],
    required: true,
  }
});


module.exports = mongoose.model('Debate', debateSchema);