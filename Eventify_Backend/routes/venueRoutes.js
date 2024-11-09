// routes/venueRoutes.js
import express from 'express';
import { createVenue, listVenues, getVenueDetails, updateVenueDetails, deleteVenue } from '../controllers/venueController.js';
import { authenticateToken, authorizeAdminOrOwner } from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to list all venues
router.get('/venues', listVenues);

// Route to create a new venue with authorization
router.post('/venues', authenticateToken, authorizeAdminOrOwner, createVenue);

// GET /api/venues/:id - Fetch specific venue details by ID
router.get('/venues/:id', getVenueDetails);

// Route to update venue details
router.put('/venues/:id', authenticateToken, authorizeAdminOrOwner, updateVenueDetails);

// Route to Delete venue
router.delete('/venues/:id', authenticateToken, authorizeAdminOrOwner, deleteVenue);

export default router;
