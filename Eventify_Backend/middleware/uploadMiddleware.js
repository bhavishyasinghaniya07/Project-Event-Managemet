import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'venues', // Folder name in Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
  },
});

// Multer middleware setup
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Max file size: 5MB
});

export default upload;
