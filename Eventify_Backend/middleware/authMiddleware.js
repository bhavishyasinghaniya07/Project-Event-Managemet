// middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const authenticateToken = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) return res.status(401).json({ error: 'Access denied. No token provided.' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. Malformed token.' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired. Please login again.' });
    }
    res.status(403).json({ error: 'Invalid token. Access forbidden.' });
  }
};

export const authorizeAdminOrOwner = (req, res, next) => {

  // Check if the user is either an Admin or a Venue Owner (Service Provider with Type 'Venue Owner')
  if (!req.user || (req.user.role !== 'Admin' && !(req.user.role === 'Service Provider'))) {
    return res.status(403).json({ message: 'Access denied' });
  }

  // Proceed to the next middleware/handler if the check passes
  next();
};

