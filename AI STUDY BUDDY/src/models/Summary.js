const mongoose = require('mongoose');

const summarySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  materialId: { type: mongoose.Schema.Types.ObjectId, ref: 'Material' },
  summary: String,
}, { timestamps: true });

module.exports = mongoose.model('Summary', summarySchema);