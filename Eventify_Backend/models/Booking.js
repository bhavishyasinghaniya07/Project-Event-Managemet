import pool from '../config/db.js';

// Function to create a new venue booking
export const createVenueBooking = async (bookingData) => {
  const query = `
    INSERT INTO Booking (
      CustomerID, VenueID, EventType, EventDate, EventAddress, GuestCount, TotalCost, PaymentStatus
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await pool.query(query, [
    bookingData.CustomerID,
    bookingData.VenueID,
    bookingData.EventType,
    bookingData.EventDate,
    bookingData.eventAddress, // Venue address, derived from venue details
    bookingData.GuestCount,
    bookingData.TotalCost,
    bookingData.PaymentStatus || 'Pending'
  ]);
  return result.insertId; // Return the new booking ID
};

// Function to retrieve booking details by ID
export const getBookingById = async (bookingId) => {
  console.log("Searching for booking with ID:", bookingId);
  const query = 'SELECT * FROM Booking WHERE BookingID = ?';
  const [rows] = await pool.query(query, [bookingId]);

  if (rows.length > 0) {
    console.log("Booking found:", rows[0]);
    return rows[0];
  } else {
    console.log("No booking found with the given ID");
    return null;
  }
};

// Function to retrieve booking details with venue details
export const getBookingWithVenueDetails = async (bookingId) => {
  const query = `
    SELECT 
      b.BookingID, b.CustomerID, b.VenueID, b.EventType, b.EventDate, b.EventAddress, 
      b.GuestCount, b.TotalCost, b.PaymentStatus, b.Status, 
      v.Name AS VenueName, v.Address AS VenueAddress, v.City AS VenueCity, v.Capacity AS VenueCapacity
    FROM Booking b
    JOIN Venue v ON b.VenueID = v.VenueID
    WHERE b.BookingID = ?
  `;
  const [rows] = await pool.query(query, [bookingId]);
  return rows.length > 0 ? rows[0] : null;
};

// Function to get all venue bookings, with optional filters by CustomerID or VenueID
export const getAllBookings = async (customerId = null, venueId = null) => {
  let query = `
    SELECT 
      b.BookingID, b.CustomerID, b.VenueID, b.EventType, b.EventDate, b.EventAddress, 
      b.GuestCount, b.TotalCost, b.PaymentStatus, b.Status, 
      v.Name AS VenueName, v.Address AS VenueAddress, v.City AS VenueCity, v.Capacity AS VenueCapacity
    FROM Booking b
    JOIN Venue v ON b.VenueID = v.VenueID
  `;

  const queryParams = [];
  if (customerId) {
    query += ' WHERE b.CustomerID = ?';
    queryParams.push(customerId);
  }
  if (venueId) {
    query += customerId ? ' AND b.VenueID = ?' : ' WHERE b.VenueID = ?';
    queryParams.push(venueId);
  }

  const [rows] = await pool.query(query, queryParams);
  return rows;
};

// Function to update a booking by bookingId
export const updateBooking = async (bookingId, updateData) => {
  const { customerId, venueId, eventType, eventDate, eventAddress, guestCount, totalCost, paymentStatus, status } = updateData;

  // SQL query to update the booking details
  const query = `
      UPDATE Booking
      SET 
        CustomerID = ?, 
        VenueID = ?, 
        EventType = ?, 
        EventDate = ?, 
        EventAddress = ?, 
        GuestCount = ?, 
        TotalCost = ?, 
        PaymentStatus = ?, 
        Status = ?
      WHERE BookingID = ? 
    `;

  const [result] = await pool.query(query, [
    customerId,
    venueId,
    eventType,
    eventDate,
    eventAddress,
    guestCount,
    totalCost,
    paymentStatus,
    status,
    bookingId
  ]);

  return result;
};

export const deleteBooking = async (bookingId) => {
  const query = 'DELETE FROM Booking WHERE BookingID = ?';
  const [result] = await pool.query(query, [bookingId]);
  return result;
};

export const createServiceBooking1 = async ({ customerId, services, eventType, eventDate, eventAddress, totalCost }) => {
  const connection = await pool.getConnection();

  try {
    // Begin a transaction
    await connection.beginTransaction();

    // Insert booking data into the `Booking` table
    const [bookingResult] = await connection.query(
      `INSERT INTO Booking (CustomerID, EventType, EventDate, EventAddress, TotalCost, PaymentStatus, Status) 
       VALUES (?, ?, ?, ?, ?, 'Pending', 'Pending')`,
      [customerId, eventType, eventDate, eventAddress, totalCost]
    );
    const bookingId = bookingResult.insertId;

    // Insert each service into `BookingServices`
    const serviceQueries = services.map(service => {
      return connection.query(
        `INSERT INTO BookingServices (BookingID, ServiceID, ServiceCost) 
         VALUES (?, ?, ?)`,
        [bookingId, service.serviceId, service.cost]
      );
    });

    // Execute all service insertions
    await Promise.all(serviceQueries);

    // Commit the transaction
    await connection.commit();

    return bookingId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const getServiceBookingDetails1 = async (bookingId) => {
  const connection = await pool.getConnection();

  try {
    // Query to get booking details
    const [bookingRows] = await connection.query(
      `SELECT 
         b.BookingID,
         b.CustomerID,
         b.EventType,
         b.EventDate,
         b.EventAddress,
         b.TotalCost,
         b.PaymentStatus,
         b.Status,
         u.Name AS CustomerName
       FROM Booking b
       JOIN Customer c ON b.CustomerID = c.CustomerID
       JOIN User u ON c.CustomerID = u.UserID
       WHERE b.BookingID = ? AND b.VenueID IS NULL`,
      [bookingId]
    );

    if (bookingRows.length === 0) {
      return null; // No booking found
    }

    const bookingDetails = bookingRows[0];

    // Query to get the services associated with this booking
    const [serviceRows] = await connection.query(
      `SELECT 
         bs.ServiceID,
         s.ServiceName,
         bs.ServiceCost,
         s.ServiceType,
         s.ServiceArea
       FROM BookingServices bs
       JOIN Service s ON bs.ServiceID = s.ServiceID
       WHERE bs.BookingID = ?`,
      [bookingId]
    );

    // Attach services to booking details
    bookingDetails.services = serviceRows;

    return bookingDetails;
  } finally {
    connection.release();
  }
};

export const fetchServiceBookings = async (filters) => {
  const { CustomerID, ServiceID } = filters;
  const connection = await pool.getConnection();

  try {
    // Base query for fetching service bookings
    let query = `
      SELECT 
        b.BookingID,
        b.CustomerID,
        u.Name AS CustomerName,
        b.EventType,
        b.EventDate,
        b.EventAddress,
        b.TotalCost,
        b.PaymentStatus,
        b.Status,
        GROUP_CONCAT(s.ServiceID) AS ServiceIDs,
        GROUP_CONCAT(s.ServiceName) AS ServiceNames
      FROM Booking b
      JOIN Customer c ON b.CustomerID = c.CustomerID
      JOIN User u ON c.CustomerID = u.UserID
      LEFT JOIN BookingServices bs ON b.BookingID = bs.BookingID
      LEFT JOIN Service s ON bs.ServiceID = s.ServiceID
      WHERE b.VenueID IS NULL`;

    const queryParams = [];

    // Add filters for CustomerID and ServiceID if provided
    if (CustomerID) {
      query += ` AND b.CustomerID = ?`;
      queryParams.push(CustomerID);
    }
    if (ServiceID) {
      query += ` AND s.ServiceID = ?`;
      queryParams.push(ServiceID);
    }

    query += `
      GROUP BY b.BookingID
      ORDER BY b.BookingDate DESC`;

    // Execute query with parameters
    const [rows] = await connection.query(query, queryParams);

    return rows;
  } finally {
    connection.release();
  }
};

export const modifyServiceBooking = async ({
  bookingId,
  EventType,
  EventDate,
  EventAddress,
  GuestCount,
  TotalCost,
  PaymentStatus,
  Status,
  ServiceIDs,
}) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Update main booking details in Booking table
    const [result] = await connection.query(
      `UPDATE Booking SET
        EventType = ?,
        EventDate = ?,
        EventAddress = ?,
        GuestCount = ?,
        TotalCost = ?,
        PaymentStatus = ?,
        Status = ?
      WHERE BookingID = ? AND VenueID IS NULL`,
      [EventType, EventDate, EventAddress, GuestCount, TotalCost, PaymentStatus, Status, bookingId]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return null;
    }

    // Remove all current entries in BookingServices for this booking
    await connection.query(`DELETE FROM BookingServices WHERE BookingID = ?`, [bookingId]);

    // Insert new services for the booking
    const bookingServicesData = ServiceIDs.map((serviceId) => [bookingId, serviceId, null]); // assuming no cost for individual services here

    await connection.query(
      `INSERT INTO BookingServices (BookingID, ServiceID, ServiceCost) VALUES ?`,
      [bookingServicesData]
    );

    await connection.commit();

    // Return updated booking details
    const [[updatedBooking]] = await connection.query(
      `SELECT * FROM Booking WHERE BookingID = ?`,
      [bookingId]
    );

    return updatedBooking;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

export const deleteServiceBooking = async (bookingId) => {
  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // Delete associated services in BookingServices
    await connection.query(
      `DELETE FROM BookingServices WHERE BookingID = ?`,
      [bookingId]
    );

    // Delete the booking itself from the Booking table
    const [result] = await connection.query(
      `DELETE FROM Booking WHERE BookingID = ? AND VenueID IS NULL`,
      [bookingId]
    );

    if (result.affectedRows === 0) {
      await connection.rollback();
      return null;
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};