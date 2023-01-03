const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema(
  {
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
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Word must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
