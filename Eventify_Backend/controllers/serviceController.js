// controllers/serviceController.js

import pool from '../config/db.js';
import { createService, findServiceById, updateServiceById, deleteServiceById } from '../models/Service.js';

export const getAllServices = async (req, res) => {
    try {
        // Query the database to retrieve all services offered by vendors
        const [services] = await pool.query('SELECT * FROM Service');
        res.json(services); // Respond with the list of services
    } catch (error) {
        console.error('Error retrieving services:', error);
        res.status(500).json({ message: 'Server error while retrieving services' });
    }
};

export const createServiceController = async (req, res) => {
    try {
        const { ServiceType, ServiceName, ServiceArea, Price, Status = 'Pending', Images } = req.body;
        const VendorID = req.user.userId;; // Take VendorID from req.user

        // Call model function to insert new service
        const serviceID = await createService({ VendorID, ServiceType, ServiceName, ServiceArea, Price, Status, Images });

        res.status(201).json({ message: 'Service created successfully', serviceID });
    } catch (error) {
        console.error('Error creating service:', error.message);
        res.status(500).json({ error: 'Failed to create service' });
    }
};

export const getServiceDetails = async (req, res) => {
    try {
        const { id } = req.params;
        
        // Retrieve service by ID
        const service = await findServiceById(id);
        
        if (!service) {
            return res.status(404).json({ error: 'Service not found' });
        }
        
        res.status(200).json(service);
    } catch (error) {
        console.error('Error retrieving service details:', error.message);
        res.status(500).json({ error: 'Failed to retrieve service details' });
    }
};

export const updateService = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorID = req.user.userId;
        const updatedData = req.body;

        // Update service by ID and VendorID
        const result = await updateServiceById(id, vendorID, updatedData);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Service not found or you are not authorized to update this service.' });
        }

        res.status(200).json({ message: 'Service updated successfully' });
    } catch (error) {
        console.error('Error updating service:', error.message);
        res.status(500).json({ error: 'Failed to update service' });
    }
};

export const deleteService = async (req, res) => {
    try {
        const { id } = req.params;
        const vendorID = req.user.userId; // VendorID from req.user.UserID

        // Attempt to delete the service by ID and VendorID
        const result = await deleteServiceById(id, vendorID);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Service not found or you are not authorized to delete this service.' });
        }

        res.status(200).json({ message: 'Service deleted successfully' });
    } catch (error) {
        console.error('Error deleting service:', error.message);
        res.status(500).json({ error: 'Failed to delete service' });
    }
};
