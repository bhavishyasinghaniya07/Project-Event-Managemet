// controllers/venueBookingController.js
import pool from '../config/db.js';

export const bookVenue = async (req, res) => {
    try {
        const { VenueID, eventDate, eventType, totalCost } = req.body;
        const customerID = req.user.userId;

        // Check if the venue is already booked on the selected date
        const [existingBooking] = await pool.query(
            'SELECT * FROM Booking WHERE VenueID = ? AND EventDate = ? AND Status = "Confirmed"',
            [VenueID, eventDate]
        );
        if (existingBooking.length > 0) {
            return res.status(409).json({ message: 'Venue is already booked on the selected date.' });
        }

        // Create the venue booking
        const [bookingResult] = await pool.query(
            'INSERT INTO Booking (CustomerID, VenueID, EventType, EventDate, BookingDate, TotalCost, PaymentStatus) VALUES (?, ?, ?, ?, NOW(), ?, "Pending")',
            [customerID, VenueID, eventType, eventDate, totalCost]
        );

        res.status(201).json({ message: 'Venue booked successfully', bookingID: bookingResult.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while booking the venue.' });
    }
};
