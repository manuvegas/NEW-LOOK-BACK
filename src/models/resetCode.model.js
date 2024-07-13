const mongoose = require('mongoose');

const ResetCodeSchema = new mongoose.Schema({
  email: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: '15m' }, // Expires after 15 minutes
});

module.exports = mongoose.model('ResetCode', ResetCodeSchema);