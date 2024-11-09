import express from 'express';
import { registerVenue, registerVendor } from '../controllers/businessController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/venue', upload.array('venueImages'), registerVenue);
router.post('/vendor', upload.array('vendorImages'), registerVendor);

export default router;
