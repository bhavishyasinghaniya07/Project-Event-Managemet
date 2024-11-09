import pool from '../config/db.js';
import { v4 as uuidv4 } from 'uuid';  // For generating a unique transaction ID

// Function to initiate checkout and calculate the total cost
export const checkout = async (req, res) => {
    const customerID = req.user.userId; // Extract customer ID from authenticated user
    const { eventDate, eventType } = req.body;  // Event date and event type from request
    
    try {
        // 1. Fetch cart items (venue + services)
        const [cartItems] = await pool.query(
            'SELECT * FROM Cart WHERE CustomerID = ?',
            [customerID]
        );
        
        if (cartItems.length === 0) {
            return res.status(400).json({ message: 'Your cart is empty.' });
        }

        let totalCost = 0;
        let venueID = null;
        let services = [];

        // 2. Calculate total cost: add the venue cost and services cost
        for (let item of cartItems) {
            if (item.VenueID) {
                // Calculate venue cost (fetch venue details)
                const [venueDetails] = await pool.query(
                    'SELECT * FROM Venue WHERE VenueID = ?',
                    [item.VenueID]
                );
                if (venueDetails.length > 0) {
                    venueID = venueDetails[0].VenueID;
                    totalCost += parseFloat(venueDetails[0].PricePerPlate || 0);  // Add venue price to total cost
                }
            }
            if (item.ServiceID) {
                // Calculate service cost (fetch service details)
                const [serviceDetails] = await pool.query(
                    'SELECT * FROM Service WHERE ServiceID = ?',
                    [item.ServiceID]
                );
                if (serviceDetails.length > 0) {
                    services.push(serviceDetails[0]);  // Store service details
                    totalCost += parseFloat(serviceDetails[0].Price || 0);  // Add service price to total cost
                }
            }
        }

        // 3. Check if the venue is already booked for the given event date
        const [existingBooking] = await pool.query(
            'SELECT * FROM Booking WHERE VenueID = ? AND EventDate = ? AND PaymentStatus != ?',
            [venueID, eventDate, 'Failed']  // Exclude failed payments from check
        );

        if (existingBooking.length > 0) {
            return res.status(400).json({ message: 'This venue is already booked for the selected date.' });
        }

        // 4. Create a booking entry if the venue is available
        const [bookingResult] = await pool.query(
            'INSERT INTO Booking (CustomerID, VenueID, EventType, EventDate, BookingDate, TotalCost, PaymentStatus) VALUES (?, ?, ?, ?, NOW(), ?, ?)',
            [customerID, venueID, eventType, eventDate, totalCost.toFixed(2), 'Pending']
        );
        const bookingID = bookingResult.insertId;

        // 5. Add services to the booking
        for (let service of services) {
            await pool.query(
                'INSERT INTO BookingServices (BookingID, ServiceID, ServiceCost) VALUES (?, ?, ?)',
                [bookingID, service.ServiceID, service.Price]
            );
        }

        // 6. Create a payment record (for now, just pending)
        const transactionID = uuidv4();  // Generate a unique transaction ID (for demo purposes)
        const paymentDate = new Date().toISOString().split('T')[0];  // Get today's date
        
        const [paymentResult] = await pool.query(
            'INSERT INTO Payment (BookingID, CustomerID, PaymentMethod, PaymentDate, AmountPaid, PaymentStatus, TransactionID) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [bookingID, customerID, 'Pending', paymentDate, totalCost.toFixed(2), 'Pending', transactionID]
        );

        const paymentID = paymentResult.insertId;

        // 7. Create an invoice for the booking
        await pool.query(
            'INSERT INTO Invoice (BookingID, PaymentID, TotalAmount, Tax, PaymentMethod, PaymentDate) VALUES (?, ?, ?, ?, ?, ?)',
            [bookingID, paymentID, totalCost.toFixed(2), (totalCost * 0.18).toFixed(2), 'Pending', paymentDate]  // Assuming 18% tax
        );

        // 8. Empty the cart (clear items after checkout)
        await pool.query('DELETE FROM Cart WHERE CustomerID = ?', [customerID]);

        res.status(201).json({
            message: 'Checkout initiated successfully.',
            bookingID,
            totalCost: totalCost.toFixed(2),
            paymentStatus: 'Pending',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred during checkout.' });
    }
};
