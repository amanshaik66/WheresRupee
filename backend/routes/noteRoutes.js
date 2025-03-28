//WR\backend\routes\noteRoutes.js
const express = require('express');
const { trackNote } = require('../controllers/trackController');
const router = express.Router();

router.post('/track', trackNote);

router.get('/track', (req, res) => {
    res.send('This route only accepts POST requests for tracking.');
  });
  

module.exports = router;
