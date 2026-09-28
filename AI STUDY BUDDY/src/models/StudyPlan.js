const mongoose = require('mongoose');

const studyPlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  studyPlan: String,
  examDate: Date,
}, { timestamps: true });

module.exports = mongoose.model('StudyPlan', studyPlanSchema);