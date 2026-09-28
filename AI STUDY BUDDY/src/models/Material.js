const mongoose = require('mongoose');
const materialSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: String,
  subject: String,
  content: { type: String, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Material', materialSchema);