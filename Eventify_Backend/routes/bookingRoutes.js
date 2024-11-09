import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Example: Book an event (protected route)
router.post('/bookings', authenticateToken, (req, res) => {
  // Booking logic goes here
  res.status(201).json({ message: 'Booking successful!' });
});

// Example: Get a user’s bookings (protected route)
router.get('/bookings', authenticateToken, (req, res) => {
  // Fetch the bookings based on req.user.userId
  res.status(200).json({ message: 'Bookings retrieved.', bookings: [] });
});

export default router;
