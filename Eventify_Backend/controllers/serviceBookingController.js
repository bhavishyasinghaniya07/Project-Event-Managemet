// controllers/serviceBookingController.js
import pool from '../config/db.js';

export const bookService = async (req, res) => {
    try {
        const { serviceIDs, eventDate, totalCost } = req.body;
        const customerID = req.user.userId;

        // Create a new booking entry without a venue
        const [bookingResult] = await pool.query(
            'INSERT INTO Booking (CustomerID, VenueID, EventType, EventDate, BookingDate, TotalCost, PaymentStatus) VALUES (?, NULL, ?, ?, NOW(), ?, "Pending")',
            [customerID, "Service", eventDate, totalCost]
        );
        const bookingID = bookingResult.insertId;

        // Add each service to BookingServices
        for (let serviceID of serviceIDs) {
            const [serviceDetails] = await pool.query(
                'SELECT Price FROM Service WHERE ServiceID = ?',
                [serviceID]
            );
            const serviceCost = serviceDetails[0].Price;

            await pool.query(
                'INSERT INTO BookingServices (BookingID, ServiceID, ServiceCost) VALUES (?, ?, ?)',
                [bookingID, serviceID, serviceCost]
            );
        }

        res.status(201).json({ message: 'Services booked successfully', bookingID });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while booking the services.' });
    }
};
