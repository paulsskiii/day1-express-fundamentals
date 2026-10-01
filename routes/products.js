// const express = require('express');
// const router = express.Router();

// // router.get('/', async (req, res) => {
// //   const filter = { isDeleted: false };
// //   if (req.query.status) filter.status = req.query.status;
// //   const products = await Product.find(filter);
// //   res.json({ success: true, data: products });
// // });

// // router.get('/:id', async (req, res) => {
// //   const product = await Product.findById(req.params.id);
// //   if (!product || product.isDeleted) {
// //     return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
// //   }
// //   res.json({ success: true, data: product });
// // });

// // const Product = require('../models/Product');

// // router.post('/', async (req, res) => {
// //   try {
// //     const product = await Product.create(req.body);
// //     res.status(201).json({ success: true, data: product });
// //   } catch (err) {
// //     res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
// //   }
// // });


// // router.put('/:id', async (req, res) => {
// //   try {
// //     const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
// //       new: true,
// //       runValidators: true,
// //     });
// //     if (!product) {
// //       return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
// //     }
// //     res.json({ success: true, data: product });
// //   } catch (err) {
// //     res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
// //   }
// // });


// // router.delete('/:id', async (req, res) => {
// //   const product = await Product.findByIdAndUpdate(req.params.id, { isDeleted: true });
// //   if (!product) {
// //     return res.status(404).json({ success: false, error: { message: 'Product not found', code: 'NOT_FOUND' } });
// //   }
// //   res.status(204).send();
// // });


// module.exports = router;
const express = require('express');
const router = express.Router();
const {
  getAllProducts, getProductById, createProduct, updateProduct, deleteProduct,
} = require('../controllers/productController');

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;