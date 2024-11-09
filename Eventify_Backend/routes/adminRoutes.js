// routes/adminRoutes.js
import express from 'express';
import {
    createAdmin,
    getAdminById,
    updateAdminById,
    deleteAdminById
} from '../controllers/adminController.js';

const router = express.Router();

// Define routes for admin management
router.post('/admins', createAdmin);           // Create Admin
router.get('/admins/:id', getAdminById);       // Get Admin by ID
router.put('/admins/:id', updateAdminById);    // Update Admin by ID
router.delete('/admins/:id', deleteAdminById); // Delete Admin by ID

export default router;
