const mongoose = require('mongoose');

const makeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  logo: { type: String, required: true } // Cloudinary URL
}, { timestamps: true });

module.exports = mongoose.model('Make', makeSchema);