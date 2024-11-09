import db from '../config/db.js';

// Add new user
export const addUser = async (userData) => {
    const { name, email, password, role, contactInfo } = userData;
    const query = `
    INSERT INTO User (Name, Email, Password, Role, ContactInfo)
    VALUES (?, ?, ?, ?, ?);
  `;

    try {
        const [result] = await db.execute(query, [name, email, password, role, contactInfo || null]);
        return { success: true, userId: result.insertId };
    } catch (error) {
        console.error('Error adding user:', error.message);
        throw new Error('Could not add user.');
    }
};

// Find a user by email
export const findUserByEmail = async (email) => {
    const query = `SELECT * FROM User WHERE Email = ?`;
    const [rows] = await db.execute(query, [email]);
    return rows[0];  // Return the first user found, or undefined if not found
};
