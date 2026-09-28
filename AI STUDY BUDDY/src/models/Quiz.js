const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
  questions: [
    {
      question: String,
      options: [String],
      correctAnswer: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Quiz', quizSchema);