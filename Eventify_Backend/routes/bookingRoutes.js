import express from 'express';
import { createVenueBooking, getVenueBookingDetails, listVenueBookings, updateVenueBooking, deleteVenueBooking, createServiceBooking, getServiceBookingDetails, listServiceBookings, updateServiceBooking, cancelServiceBooking } from '../controllers/bookingController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Import the middleware

const router = express.Router();

// Apply authentication middleware to the create booking route
router.post('/venue', authenticateToken, createVenueBooking);  // Protecting this route with authentication


// Route to get booking details with venue information
router.get('/venue/:bookingId', authenticateToken, getVenueBookingDetails);

// Route to list all venue bookings (filterable by CustomerID or VenueID)
router.get('/venue', authenticateToken, listVenueBookings);

// Route to update a specific venue booking by bookingId
router.put('/venue/:bookingId', authenticateToken, updateVenueBooking);

// DELETE: Cancel a venue booking
router.delete('/venue/:bookingId', deleteVenueBooking);

// POST: Create a service booking for one or more services
router.post('/bookings/service', createServiceBooking);

// GET: Retrieve details of a specific service booking
router.get('/bookings/service/:bookingId', getServiceBookingDetails);

// GET: List all service bookings, filterable by CustomerID or ServiceID
router.get('/bookings/service', listServiceBookings);

// PUT: Update a specific service booking
router.put('/bookings/service/:bookingId', updateServiceBooking);

// DELETE: Cancel a specific service booking
router.delete('/bookings/service/:bookingId', cancelServiceBooking);

export default router;
