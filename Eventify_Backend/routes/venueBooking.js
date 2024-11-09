// routes/venueBooking.js
import express from 'express';
import { bookVenue } from '../controllers/venueBookingController.js';
import {authenticateToken} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/venue', authenticateToken, bookVenue);

export default router;
