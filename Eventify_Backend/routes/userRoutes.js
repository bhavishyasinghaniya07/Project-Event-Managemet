import express from 'express';
import { createUser } from '../controllers/userController.js';
import { getUserProfile } from '../controllers/userController.js';
import { updateUserProfile } from '../controllers/userController.js';
import { deleteUser } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; // Middleware for token authentication

const router = express.Router();

// POST: Route to create a new user
router.post('/users', createUser);

// GET: Fetch user profile by ID or email (protected route)
router.get('/user/profile', authenticateToken, getUserProfile);

// PUT: Update user profile (protected route)
router.put('/user/profile', authenticateToken, updateUserProfile);

// DELETE: Delete user account (protected route)
router.delete('/user/delete', authenticateToken, deleteUser);

export default router;
