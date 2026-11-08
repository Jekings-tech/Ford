const mongoose = require('mongoose');

const modelSchema = new mongoose.Schema({
  make: { type: mongoose.Schema.Types.ObjectId, ref: 'Make', required: true },
  name: { type: String, required: true },
  yearStart: { type: Number, required: true, default: 2014 },
  yearEnd: { type: Number, required: true, default: 2026 }
}, { timestamps: true });

module.exports = mongoose.model('Model', modelSchema);