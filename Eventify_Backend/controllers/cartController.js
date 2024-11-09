// controllers/cartController.js
import pool from '../config/db.js';

// Function to add a venue to the cart
export const addVenueToCart = async (req, res) => {
    try {
        const { VenueID } = req.body; // Venue ID from the request body
        const CustomerID = req.user.userId; // Extract customer ID from authenticated user

        // Check if the venue is already in the cart
        const [existingCart] = await pool.query(
            'SELECT * FROM Cart WHERE CustomerID = ? AND VenueID = ?',
            [CustomerID, VenueID]
        );
        if (existingCart.length > 0) {
            return res.status(409).json({ message: 'Venue is already in the cart.' });
        }

        // Insert the venue into the cart
        await pool.query(
            'INSERT INTO Cart (CustomerID, VenueID) VALUES (?, ?)',
            [CustomerID, VenueID]
        );
        res.status(201).json({ message: 'Venue added to cart successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding venue to cart.' });
    }
};

// Function to add a service to the cart
export const addServiceToCart = async (req, res) => {
    try {
        const { ServiceID } = req.body; // Service ID from the request body
        const CustomerID = req.user.userId; // Extract customer ID from authenticated user

        // Check if the service is already in the cart
        const [existingCart] = await pool.query(
            'SELECT * FROM Cart WHERE CustomerID = ? AND ServiceID = ?',
            [CustomerID, ServiceID]
        );
        if (existingCart.length > 0) {
            return res.status(409).json({ message: 'Service is already in the cart.' });
        }

        // Insert the service into the cart with VenueID set to NULL
        await pool.query(
            'INSERT INTO Cart (CustomerID, ServiceID, VenueID) VALUES (?, ?, NULL)',
            [CustomerID, ServiceID]
        );
        res.status(201).json({ message: 'Service added to cart successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while adding service to cart.' });
    }
};