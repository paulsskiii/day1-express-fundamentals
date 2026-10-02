const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

router.post('/avatar', authenticate, (req, res) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, error: { message: err.message } });
    }
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.status(201).json({ success: true, data: { url: fileUrl } });
  });
});

module.exports = router;
