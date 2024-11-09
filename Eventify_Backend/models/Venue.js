// models/Venue.js

import pool from '../config/db.js';

// Function to retrieve a list of all available venues
export const getAllVenues = async () => {
    const [rows] = await pool.query('SELECT * FROM Venue');
    return rows;
};

// Function to create a new venue
export const createVenue = async (venueData) => {
    const query = `
        INSERT INTO Venue (
            OwnerID, Name, Address, City, Capacity, BestForEventTypes, PricePerPlate,
            FoodType, Amenities, Photos, Status, Description, Website, Twitter, Instagram
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
        venueData.OwnerID,
        venueData.Name,
        venueData.Address,
        venueData.City,
        venueData.Capacity,
        venueData.BestForEventTypes,
        venueData.PricePerPlate,
        venueData.FoodType,
        venueData.Amenities,
        venueData.Photos,
        venueData.Status || 'Pending', // Default to 'Pending' if not provided
        venueData.Description,
        venueData.Website,
        venueData.Twitter,
        venueData.Instagram
    ]);
    return result.insertId; // Return the new venue ID
};

// Function to retrieve details of a specific venue by ID
export const getVenueById = async (id) => {
    const query = 'SELECT * FROM Venue WHERE VenueID = ?';
    const [rows] = await pool.query(query, [id]);
    return rows[0]; // Return the first row (or undefined if not found)
};

// Function to update venue details
export const updateVenue = async (id, venueData) => {
    const query = `
        UPDATE Venue
        SET Name = ?, Address = ?, City = ?, Capacity = ?, BestForEventTypes = ?,
            PricePerPlate = ?, FoodType = ?, Amenities = ?, Photos = ?, Status = ?,
            Description = ?, Website = ?, Twitter = ?, Instagram = ?
        WHERE VenueID = ? AND OwnerID = ?
    `;
    const [result] = await pool.query(query, [
        venueData.Name,
        venueData.Address,
        venueData.City,
        venueData.Capacity,
        venueData.BestForEventTypes,
        venueData.PricePerPlate,
        venueData.FoodType,
        venueData.Amenities,
        venueData.Photos,
        venueData.Status || 'Pending',
        venueData.Description,
        venueData.Website,
        venueData.Twitter,
        venueData.Instagram,
        id,
        venueData.OwnerID // Ensure the owner is updating their own venue
    ]);
    return result.affectedRows; // Number of rows affected
};