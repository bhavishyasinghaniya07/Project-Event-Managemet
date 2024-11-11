// controllers/bookingController.js
import { getVenueById } from '../models/Venue.js';
import { getBookingWithVenueDetails, getAllBookings, getBookingById, updateBooking, deleteBooking, createServiceBooking1, getServiceBookingDetails1, fetchServiceBookings, modifyServiceBooking, deleteServiceBooking } from '../models/Booking.js';
import pool from '../config/db.js'; // Assuming you're using this to interact with the database

// Create a venue booking (protected by JWT)
export const createVenueBooking = async (req, res) => {
  try {
    // Extract customerId from JWT (which is set in the middleware)
    const customerId = req.user.userId; // Assuming userId is part of the JWT payload
    const { venueId, eventType, eventDate, guestCount, totalCost } = req.body;

    // Check if the venue exists and is approved
    const venue = await getVenueById(venueId);
    if (!venue || venue.Status !== 'Approved') {
      return res.status(404).json({ error: 'Venue not found or not approved' });
    }

    // Automatically use the venue address as event address
    const eventAddress = venue.Address;

    // Create the booking in the database
    const query = `
      INSERT INTO Booking (CustomerID, VenueID, EventType, EventDate, EventAddress, GuestCount, TotalCost, PaymentStatus, Status)
      VALUES (?, ?, ?, ?, ?, ?, ?, 'Pending', 'Pending')
    `;
    const [result] = await pool.query(query, [
      customerId, // Use the customerId from the JWT token
      venueId,
      eventType,
      eventDate,
      eventAddress,
      guestCount,
      totalCost
    ]);

    res.status(201).json({ message: 'Venue booking created successfully', bookingId: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create booking' });
  }
};

// Controller method to get booking details with venue information
// Get booking details with venue details
export const getVenueBookingDetails = async (req, res) => {
  const bookingId = req.params.bookingId;

  try {
    const booking = await getBookingWithVenueDetails(bookingId);

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch booking details' });
  }
};

// Controller method to list all venue bookings (filterable by CustomerID or VenueID)
export const listVenueBookings = async (req, res) => {
  try {
    // Extract filter parameters from the query string
    const { customerId, venueId } = req.query;

    // Fetch bookings from the model (with or without filters)
    const bookings = await getAllBookings(customerId, venueId);

    // Return the bookings (empty array if no bookings found)
    res.status(200).json({ bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve bookings' });
  }
};

// Update venue booking details
export const updateVenueBooking = async (req, res) => {
  const bookingId = req.params.bookingId;  // Extract the bookingId from the URL
  const { customerId, venueId, eventType, eventDate, eventAddress, guestCount, totalCost, paymentStatus, status } = req.body;

  // Check if all required fields are present
  if (!customerId || !venueId || !eventType || !eventDate || !eventAddress || !guestCount || !totalCost || !paymentStatus || !status) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const result = await updateBooking(bookingId, {
      customerId,
      venueId,
      eventType,
      eventDate,
      eventAddress,
      guestCount,
      totalCost,
      paymentStatus,
      status
    });

    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Booking updated successfully' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update booking' });
  }
};

export const deleteVenueBooking = async (req, res) => {
  const { bookingId } = req.params; // Extract bookingId from URL parameters

  try {
    // Delete the booking using the bookingId
    const result = await deleteBooking(bookingId);

    if (result.affectedRows > 0) {
      // Successfully deleted the booking
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } else {
      // If no booking was found with the provided bookingId
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to cancel the booking' });
  }
};

export const createServiceBooking = async (req, res) => {
  try {
    const { customerId, services, eventType, eventDate, eventAddress, totalCost } = req.body;

    // Validate required fields
    if (!customerId || !services || services.length === 0 || !eventType || !eventDate || !eventAddress) {
      return res.status(400).json({ error: 'Required fields: customerId, services, eventType, eventDate, eventAddress' });
    }

    // Pass data to the model to handle DB insertion
    const bookingId = await createServiceBooking1({
      customerId,
      services,         // Array of services with their IDs and costs
      eventType,
      eventDate,
      eventAddress,
      totalCost
    });

    res.status(201).json({ message: 'Service booking created successfully', bookingId });
  } catch (error) {
    console.error('Error creating service booking:', error);
    res.status(500).json({ error: 'Failed to create service booking' });
  }
};

export const getServiceBookingDetails = async (req, res) => {
  try {
    const bookingId = req.params.bookingId;

    // Fetch booking details from the model
    const bookingDetails = await getServiceBookingDetails1(bookingId);

    if (!bookingDetails) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.status(200).json(bookingDetails);
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ error: 'Failed to retrieve booking details' });
  }
};

export const listServiceBookings = async (req, res) => {
  try {
    const { CustomerID, ServiceID } = req.query;

    // Fetch service bookings with optional filters
    const serviceBookings = await fetchServiceBookings({ CustomerID, ServiceID });

    res.status(200).json(serviceBookings);
  } catch (error) {
    console.error('Error fetching service bookings:', error);
    res.status(500).json({ error: 'Failed to retrieve service bookings' });
  }
};

export const updateServiceBooking = async (req, res) => {
  const { bookingId } = req.params;
  const {
    EventType,
    EventDate,
    EventAddress,
    GuestCount,
    TotalCost,
    PaymentStatus,
    Status,
    ServiceIDs,  // Array of service IDs for this booking
  } = req.body;

  try {
    const updatedBooking = await modifyServiceBooking({
      bookingId,
      EventType,
      EventDate,
      EventAddress,
      GuestCount,
      TotalCost,
      PaymentStatus,
      Status,
      ServiceIDs,
    });

    if (updatedBooking) {
      res.status(200).json({ message: 'Service booking updated successfully', booking: updatedBooking });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error updating service booking:', error);
    res.status(500).json({ error: 'Failed to update service booking' });
  }
};

export const cancelServiceBooking = async (req, res) => {
  const { bookingId } = req.params;

  try {
    const result = await deleteServiceBooking(bookingId);

    if (result) {
      res.status(200).json({ message: 'Service booking canceled successfully' });
    } else {
      res.status(404).json({ error: 'Booking not found' });
    }
  } catch (error) {
    console.error('Error canceling service booking:', error);
    res.status(500).json({ error: 'Failed to cancel service booking' });
  }
};