const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['draft', 'active', 'discontinued'], default: 'draft' },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isDeleted: { type: Boolean, default: false },
  description: { type: String, default: '' },
  imageUrl: { type: String, default: '' },
  inStock: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', productSchema);
