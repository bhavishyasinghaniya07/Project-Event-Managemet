import pool from '../config/db.js';

// Register Business Logic
export const listYourBusiness = async (req, res) => {
    const { businessType } = req.body;  // 'VenueOwner' or 'Vendor'
    const { userId } = req.user;        // Extract userId from token

    try {
        // Step 1: Check if the user is already in the ServiceProvider table
        const [existingProvider] = await pool.query(
            'SELECT * FROM ServiceProvider WHERE ProviderID = ?',
            [userId]
        );

        if (existingProvider.length === 0) {
            // Step 2: Add the user to the ServiceProvider table
            await pool.query(
                'INSERT INTO ServiceProvider (ProviderID, Type) VALUES (?, ?)',
                [userId, businessType]
            );
            console.log(`User ${userId} added to ServiceProvider as ${businessType}`);
        } else {
            console.log(`User ${userId} already exists in ServiceProvider. Skipping insertion.`);
        }

        // Step 3: Add the user to either VenueOwner or Vendor table based on the business type
        if (businessType === 'Venue Owner') {
            await pool.query('INSERT INTO VenueOwner (OwnerID) VALUES (?)', [userId]);
            res.status(201).json({ message: 'Registered as Venue Owner successfully.' });
        } else if (businessType === 'Vendor') {
            await pool.query('INSERT INTO Vendor (VendorID) VALUES (?)', [userId]);
            res.status(201).json({ message: 'Registered as Vendor successfully.' });
        } else {
            res.status(400).json({ error: 'Invalid business type selection.' });
        }
    } catch (error) {
        console.error('Error registering business:', error.message);
        res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
};