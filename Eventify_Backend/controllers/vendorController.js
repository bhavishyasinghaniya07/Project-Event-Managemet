import pool from '../config/db.js';
import cloudinary from '../config/cloudinary.js';

export const addVendor = async (req, res) => {
    const { businessName, city, serviceType, vendorID } = req.body;

    try {
        const [result] = await pool.execute(
            'INSERT INTO Service (ServiceName, ServiceArea, VendorID) VALUES (?, ?, ?)',
            [businessName, city, vendorID]
        );

        res.status(201).json({ vendorId: result.insertId, message: 'Vendor listed successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
