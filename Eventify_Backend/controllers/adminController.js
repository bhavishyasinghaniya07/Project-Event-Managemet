// controllers/adminController.js
import * as Admin from '../models/Admin.js';

// Create a new admin
export const createAdmin = async (req, res) => {
    try {
        const { UserID, LastLogin } = req.body;

        // Check if the UserID already exists in the Admin table
        const existingAdmin = await Admin.getAdminByUserId(UserID);
        if (existingAdmin) {
            return res.status(400).json({ message: 'User is already an admin' });
        }

        // Prepare the admin data
        const adminData = {
            UserID,
            LastLogin: LastLogin || new Date(), // Default to current date if not provided
        };

        // Create the admin
        const adminId = await Admin.createAdmin(adminData);

        res.status(201).json({ message: 'Admin created successfully', adminId });
    } catch (error) {
        res.status(500).json({ message: 'Error creating admin', error });
    }
};

// Get an admin by AdminID
export const getAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
        console.log("Fetching admin with AdminID:", adminId); // Log the AdminID
        
        const admin = await Admin.getAdminById(adminId);
        if (!admin) return res.status(404).json({ message: 'Admin not found' });
        
        res.json(admin);
    } catch (error) {
        console.error("Error fetching admin:", error); // Log any errors
        res.status(500).json({ message: 'Error fetching admin profile', error });
    }
};


// Update an admin by AdminID
export const updateAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;

        // Check if the admin exists
        const existingAdmin = await Admin.getAdminById(adminId);
        if (!existingAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Update admin information
        await Admin.updateAdminById(adminId, req.body);
        res.json({ message: 'Admin profile updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating admin profile', error });
    }
};

// Delete an admin by AdminID
export const deleteAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;

        // Check if the admin with the given AdminID exists
        const existingAdmin = await Admin.getAdminById(adminId);
        if (!existingAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }

        // Delete the admin
        await Admin.deleteAdminById(adminId);

        res.status(200).json({ message: 'Admin deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting admin', error });
    }
};
