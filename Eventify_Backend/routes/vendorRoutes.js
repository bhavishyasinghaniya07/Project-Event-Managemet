import express from 'express';
import { addVendor } from '../controllers/vendorController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();
router.post('/add', authenticateToken, addVendor);

export default router;
