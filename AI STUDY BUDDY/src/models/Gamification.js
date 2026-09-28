const mongoose = require('mongoose');
const gamificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  points: { type: Number, default: 0 },
  level: { type: Number, default: 1 },
  badges: [{ type: String }],
  streak: { type: Number, default: 0 },
  lastActiveDate: { type: Date },
}, { timestamps: true });
module.exports = mongoose.model('Gamification', gamificationSchema);
