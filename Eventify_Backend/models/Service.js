// models/Service.js
import pool from '../config/db.js';

// Function to create a new service
export const createService = async (serviceData) => {
    const query = `
        INSERT INTO Service (
            VendorID, ServiceType, ServiceName, ServiceArea, Price, Status, Images
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [
        serviceData.VendorID,
        serviceData.ServiceType,
        serviceData.ServiceName,
        serviceData.ServiceArea,
        serviceData.Price,
        serviceData.Status || 'Pending', // Default to 'Pending' if not provided
        serviceData.Images
    ]);
    return result.insertId; // Return the new service ID
};

export const findServiceById = async (serviceID) => {
    const query = `
        SELECT * FROM Service WHERE ServiceID = ?
    `;
    const [rows] = await pool.query(query, [serviceID]);
    
    return rows[0]; // Return the service if found
};

export const updateServiceById = async (serviceID, vendorID, updatedData) => {
    const query = `
        UPDATE Service SET 
            ServiceType = ?, 
            ServiceName = ?, 
            ServiceArea = ?, 
            Price = ?, 
            Status = ?, 
            Images = ? 
        WHERE ServiceID = ? AND VendorID = ?
    `;

    const [result] = await pool.query(query, [
        updatedData.ServiceType,
        updatedData.ServiceName,
        updatedData.ServiceArea,
        updatedData.Price,
        updatedData.Status,
        updatedData.Images,
        serviceID,
        vendorID
    ]);

    return result;
};

export const deleteServiceById = async (serviceID, vendorID) => {
    const query = `DELETE FROM Service WHERE ServiceID = ? AND VendorID = ?`;

    const [result] = await pool.query(query, [serviceID, vendorID]);

    return result;
};
