const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
  const filter = { isDeleted: false };
  if (req.query.status) filter.status = req.query.status;
  const products = await Product.find(filter);
  res.json({ success: true, data: products });
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.isDeleted) {
    return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
  }
  res.json({ success: true, data: product });
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!product) {
      return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
    }
    res.json({ success: true, data: product });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
  }
};

exports.deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
  if (!product) {
    return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
  }
  res.status(204).send();
};