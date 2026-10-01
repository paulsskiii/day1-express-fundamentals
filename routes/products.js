const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const products = [{ id: 1, name: 'Keyboard' }, { id: 2, name: 'Mouse' }];
  res.json({ success: true, data: products });
});

router.get('/:id', (req, res) => {
  if (req.params.id === '999') {
    return res.status(404).json({
      success: false,
      error: { message: 'Product not found', code: 'NOT_FOUND' }
    });
  }
  const product = { id: req.params.id, name: 'Sample Product' };
  res.json({ success: true, data: product });
});

router.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      error: { message: 'Name is required', code: 'VALIDATION_ERROR' }
    });
  }
  res.status(201).json({ success: true, data: req.body });
});

router.put('/:id', (req, res) => {
  res.json({ success: true, data: { id: req.params.id, ...req.body } });
});

router.delete('/:id', (req, res) => {
  res.status(204).send(); // 204 has no body by definition — no envelope here
});

module.exports = router;
