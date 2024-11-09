// routes/serviceBooking.js
import express from 'express';
import { bookService } from '../controllers/serviceBookingController.js';
import {authenticateToken} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/service', authenticateToken, bookService);

export default router;
