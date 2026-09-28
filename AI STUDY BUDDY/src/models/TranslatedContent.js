const mongoose = require('mongoose');
const translatedSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sourceType: { type: String, enum: ['summary', 'flashcard', 'quiz', 'studyPlan'] },
  sourceId: { type: mongoose.Schema.Types.ObjectId, required: true },
  language: String,
  translatedText: String,
}, { timestamps: true });
module.exports = mongoose.model('TranslatedContent', translatedSchema);