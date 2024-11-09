import pool from '../config/db.js';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { findUserByEmail } from '../models/User.js';
dotenv.config();

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required.' });
        }

        // Find user by email
        const user = await findUserByEmail(email);
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.UserID, role: user.Role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful.',
            token,
            user: { id: user.UserID, name: user.Name, role: user.Role }
        });
    } catch (error) {
        console.error('Login error:', error.message);
        res.status(500).json({ error: 'Something went wrong.' });
    }
};
