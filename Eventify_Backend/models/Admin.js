import pool from '../config/db.js';

// Function to check if an admin with the given UserID already exists
export const getAdminByUserId = async (UserID) => {
    const [rows] = await pool.query('SELECT * FROM Admin WHERE UserID = ?', [UserID]);
    return rows[0]; // Return the admin record if it exists, otherwise undefined
};

// Function to create a new admin
export const createAdmin = async (adminData) => {
    const query = `
        INSERT INTO Admin (UserID, LastLogin)
        VALUES (?, ?)
    `;
    const [result] = await pool.query(query, [adminData.UserID, adminData.LastLogin]);
    return result.insertId;
};

// Function to get an admin by AdminID
export const getAdminById = async (adminId) => {
    const [rows] = await pool.query('SELECT * FROM Admin WHERE AdminID = ?', [adminId]);
    return rows[0]; // Return the admin record if it exists, otherwise undefined
};

export const updateAdminById = async (adminId, updateData) => {
    await pool.query('UPDATE Admin SET ? WHERE AdminID = ?', [updateData, adminId]);
};

// Function to delete an admin by AdminID
export const deleteAdminById = async (adminId) => {
    const query = 'DELETE FROM Admin WHERE AdminID = ?';
    await pool.query(query, [adminId]);
};