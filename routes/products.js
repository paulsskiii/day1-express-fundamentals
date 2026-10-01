const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.json([{ id: 1, name: 'Keyboard' }, { id: 2, name: 'Mouse' }]);
});
router.get('/:id', (req, res) => {
  res.json({ id: req.params.id, name: 'Sample Product' });
});
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Product created', data: req.body });
});
router.put('/:id', (req, res) => {
  res.json({ message: `Product ${req.params.id} updated (stub)` });
});
router.delete('/:id', (req, res) => {
  res.status(204).send();
});

module.exports = router;
