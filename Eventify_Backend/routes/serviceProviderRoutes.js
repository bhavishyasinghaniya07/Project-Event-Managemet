// routes/serviceProviderRoutes.js
import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { listYourBusiness /*,createVenue, createService*/ } from '../controllers/serviceProviderController.js';

const router = express.Router();

// Register as Venue Owner or Vendor based on radio button selection
router.post('/list-your-business', authenticateToken, listYourBusiness);

// // Add Venue (only accessible after registering as Venue Owner)
// router.post('/venues', authenticateToken, createVenue);

// // Add Service (only accessible after registering as Vendor)
// router.post('/services', authenticateToken, createService);

export default router;
