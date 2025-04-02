//WR\backend\routes\noteRoutes.js
import express from 'express';
import { trackNote } from '../controllers/trackController.js'; // Add .js extension for ES modules

const router = express.Router();

router.post('/track', trackNote);

router.get('/track', (req, res) => {
  res.status(405).json({ message: 'Only POST requests are allowed on this route.' });
});

export default router; // Use ES module export