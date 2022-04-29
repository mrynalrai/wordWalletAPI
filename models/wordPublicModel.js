const mongoose = require('mongoose');

const wordPublicSchema = new mongoose.Schema({
  word: {
    type: String,
    required: [true, 'A word must have a name'],
    unique: true,
  },
  meaning: {
    type: String,
    required: [true, 'A word must have a meaning'],
  },
  sample: {
    type: String,
  },
  details: {
    type: String,
  },
});

const Word = mongoose.model('Words-Public', wordPublicSchema);

module.exports = Word;
