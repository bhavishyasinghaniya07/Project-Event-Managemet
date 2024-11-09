// routes/cart.js
import express from 'express';
import { addVenueToCart, addServiceToCart } from '../controllers/cartController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Assuming you have this middleware

const router = express.Router();

// POST /api/cart/venue - Add a venue to the cart
router.post('/cart/venue', authenticateToken, addVenueToCart);

// POST /api/cart/service - Add a service to the cart
router.post('/cart/service', authenticateToken, addServiceToCart);

export default router;
