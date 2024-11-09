import { addUser } from '../models/User.js';
import pool from '../config/db.js'; // Import the database pool
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Create new user
export const createUser = async (req, res) => {
    try {
        const { Name, Email, Password, Role, ContactInfo, ServiceType } = req.body;

        // Check if required fields are provided
        if (!Name || !Email || !Password || !Role) {
            return res.status(400).json({ error: 'All fields are required.' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Insert the user into the User table
        const query = `
            INSERT INTO User (Name, Email, Password, Role, ContactInfo)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [userResult] = await pool.query(query, [
            Name, Email, hashedPassword, Role, ContactInfo || null
        ]);

        const userId = userResult.insertId; // Get the new user's ID

        // Perform role-based updates
        if (Role === 'Customer') {
            await pool.query('INSERT INTO Customer (CustomerID) VALUES (?)', [userId]);
            console.log(`User ${userId} added as a Customer.`);
        } else if (Role === 'Admin') {
            await pool.query('INSERT INTO Admin (UserID) VALUES (?)', [userId]);
            console.log(`User ${userId} added as an Admin.`);
        } else if (Role === 'Service Provider') {
            // Insert into ServiceProvider table
            await pool.query('INSERT INTO ServiceProvider (ProviderID, Type) VALUES (?, ?)', [userId, ServiceType]);
            console.log(`User ${userId} added as a Service Provider.`);

            // Add to Venue Owner or Vendor based on ServiceType
            if (ServiceType === 'Venue Owner') {
                await pool.query('INSERT INTO VenueOwner (OwnerID) VALUES (?)', [userId]);
                console.log(`User ${userId} added as a Venue Owner.`);
            } else if (ServiceType === 'Vendor') {
                await pool.query('INSERT INTO Vendor (VendorID) VALUES (?)', [userId]);
                console.log(`User ${userId} added as a Vendor.`);
            } else {
                return res.status(400).json({ error: 'Invalid ServiceType.' });
            }
        }

        res.status(201).json({ message: 'User created successfully.', userId });
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

// Get User Profile by ID or Email
export const getUserProfile = async (req, res) => {
    try {
        const { userId, email } = req.query; // Extract query parameters

        if (!userId && !email) {
            return res.status(400).json({ error: 'User ID or email is required.' });
        }

        let query = 'SELECT UserID, Name, Email, Role, ContactInfo FROM User WHERE';
        const params = [];

        if (userId) {
            query += ' UserID = ?';
            params.push(userId);
        }
        if (email) {
            if (params.length > 0) query += ' OR'; // Handle "OR" if both are provided
            query += ' Email = ?';
            params.push(email);
        }

        const [rows] = await pool.query(query, params); // Query the database

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json(rows[0]); // Return the user profile
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

// Update User Profile
export const updateUserProfile = async (req, res) => {
    try {
        const { userId } = req.user; // Extract userId from the decoded token in req.user
        const { name, email, contactInfo } = req.body; // Get the updated data from the request body

        if (!name && !email && !contactInfo) {
            return res.status(400).json({ error: 'At least one field is required to update.' });
        }

        // Build the dynamic SQL query to update only provided fields
        const updates = [];
        const params = [];

        if (name) {
            updates.push('Name = ?');
            params.push(name);
        }
        if (email) {
            updates.push('Email = ?');
            params.push(email);
        }
        if (contactInfo) {
            updates.push('ContactInfo = ?');
            params.push(contactInfo);
        }

        params.push(userId); // Add userId to the parameters list for the WHERE clause

        const query = `UPDATE User SET ${updates.join(', ')} WHERE UserID = ?`;
        const [result] = await pool.query(query, params);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        res.status(200).json({ message: 'Profile updated successfully.' });
    } catch (error) {
        console.error('Error updating user profile:', error.message);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};

// Delete User Account
export const deleteUser = async (req, res) => {
    const { userId } = req.user; // Extract userId from decoded token

    try {
        // Start a transaction to ensure atomic deletion
        await pool.query('START TRANSACTION');

        // Check the role of the user
        const [user] = await pool.query('SELECT Role FROM User WHERE UserID = ?', [userId]);

        if (user.length === 0) {
            return res.status(404).json({ error: 'User not found.' });
        }

        const role = user[0].Role;

        // Delete related entries based on the user role
        if (role === 'Customer') {
            await pool.query('DELETE FROM Customer WHERE CustomerID = ?', [userId]);
        } else if (role === 'Admin') {
            await pool.query('DELETE FROM Admin WHERE UserID = ?', [userId]);
        }

        // Delete the user from the User table
        const [result] = await pool.query('DELETE FROM User WHERE UserID = ?', [userId]);

        if (result.affectedRows === 0) {
            await pool.query('ROLLBACK'); // If something went wrong, rollback the transaction
            return res.status(404).json({ error: 'User not found.' });
        }

        await pool.query('COMMIT'); // Commit the transaction if all deletions succeed

        res.status(200).json({ message: 'Account deleted successfully.' });
    } catch (error) {
        await pool.query('ROLLBACK'); // Rollback the transaction on error
        console.error('Error deleting user:', error.message);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};
