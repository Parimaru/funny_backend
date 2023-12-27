const mongoose = require('mongoose');

const quoteDataSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  fakeAuthor: {
    type: String,
    required: true,
    minLength: [2, 'min length is 2 chars'],
    maxLength: [20, 'max length is 20 chars'],
  },
  originalAuthor: { type: String, required: true },
  funny: { type: Number, required: true, default: 0 },
  notfunny: { type: Number, required: true, default: 0 },
  creator: {
    type: String,
    required: true,
    minLength: [2, 'min length is 2 chars'],
    maxLength: [20, 'max length is 20 chars'],
  },
  reported: { type: Boolean, default: false },
});

module.exports = mongoose.model('QuoteData', quoteDataSchema);
