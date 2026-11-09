const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  fitsModels: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Model' }],
  fitsYears: [{ type: Number }], // NEW: Exact years this part fits
  originalPrice: { type: Number, required: true },
  salePrice: { type: Number, required: true },
  condition: { type: String, enum: ['New', 'Used', 'Junkyard'], required: true },
  images: { type: [String], required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);