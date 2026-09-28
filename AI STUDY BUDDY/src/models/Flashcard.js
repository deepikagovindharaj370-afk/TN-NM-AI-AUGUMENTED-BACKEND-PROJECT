const mongoose = require('mongoose');

const flashcardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
  question: String,
  answer: String,
}, { timestamps: true });

module.exports = mongoose.model('Flashcard', flashcardSchema);