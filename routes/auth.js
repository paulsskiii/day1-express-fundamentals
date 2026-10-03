const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { register, login, refresh, logout } = require('../controllers/authController');
const authenticate = require('../middleware/authenticate');
const validate = require('../middleware/validate');

const registerValidation = [
  body('email').isEmail().withMessage('Must be a valid email'),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
];

router.post('/register', registerValidation, validate, register);
router.post('/login', login);
router.post('/refresh', refresh);
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, (req, res) => {
  res.json({ success: true, data: { id: req.user.id, role: req.user.role } });
});

module.exports = router;
