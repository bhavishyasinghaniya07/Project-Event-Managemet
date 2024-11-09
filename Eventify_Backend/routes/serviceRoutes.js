// routes/serviceRoutes.js

import express from 'express';
import { getAllServices, createServiceController, getServiceDetails, updateService, deleteService } from '../controllers/serviceController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/services', getAllServices); // GET /api/services

// Endpoint to create a new service
router.post('/services', authenticateToken, createServiceController);

router.get('/services/:id', authenticateToken, getServiceDetails);

router.put('/services/:id', authenticateToken, updateService);

router.delete('/services/:id', authenticateToken, deleteService);

export default router;
