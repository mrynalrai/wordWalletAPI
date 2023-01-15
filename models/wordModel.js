const mongoose = require('mongoose');

// For imposing uniqueness check on case-insensitives words
// word: {
//   type: String,
//   required: [true, 'A word must have a name'],
//   index: {
//     unique: true,
//     collation: { locale: 'en', strength: 2 },
//   },
// }
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

wordSchema.index({ word: 1, user: 1 }, { unique: true });

const Word = mongoose.model('Word', wordSchema);

module.exports = Word;
