import express from 'express';
import { loginUser } from '../controllers/authController.js';

const router = express.Router();

// Route for user login
router.post('/login', loginUser);

export default router;
