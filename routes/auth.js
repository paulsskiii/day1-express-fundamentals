const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticate, (req, res) => {
  res.json({ success: true, data: { id: req.user.id, role: req.user.role } });
});

module.exports = router;
