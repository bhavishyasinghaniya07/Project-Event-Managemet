// routes/checkout.js
import express from 'express';
import { checkout } from '../controllers/checkoutController.js';
import {authenticateToken} from '../middleware/authMiddleware.js'; // Assuming you have this to handle JWT authentication

const router = express.Router();

// Route to initiate checkout
router.post('/checkout', authenticateToken, checkout);

export default router;
