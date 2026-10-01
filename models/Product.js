const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  status: { type: String, enum: ['draft', 'active', 'discontinued'], default: 'draft' },
  createdAt: { type: Date, default: Date.now },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  isDeleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Product', productSchema);
