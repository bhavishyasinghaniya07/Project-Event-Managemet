import React, { useState } from "react";
import "./BookingVendor.css"; // Add your styling as needed

const BookingVendor = ({ vendor, onClose }) => {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [eventType, setEventType] = useState(""); // State for event type
  const [vendorAdded, setVendorAdded] = useState(false); // State for confirmation

  // Setting minimum date to tomorrow's date
  const today = new Date();
  const minDate = new Date(today.setDate(today.getDate() + 1))
    .toISOString()
    .split("T")[0];

  const handleAddToCart = (e) => {
    e.preventDefault();
    setVendorAdded(true); // Set vendor added to true on form submission
  };

  if (vendorAdded) {
    return (
      <div className="booking-popup">
        <h2>Vendor Added to Cart</h2>
        <p>
          {vendor.name} for {eventType} on {date} for {guests} guests has been
          added to your cart!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="booking-popup">
      <h2>Book {vendor.name}</h2>
      <form onSubmit={handleAddToCart}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            min={minDate} // Prevents selection of past or same-day dates
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Event Type:</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            required
          >
            <option value="" disabled>
              Select an event type
            </option>
            <option value="Wedding">Wedding</option>
            <option value="Birthday">Birthday</option>
            <option value="Pool Party">Pool Party</option>
            <option value="Corporate Event">Corporate Event</option>
            <option value="Anniversary">Anniversary</option>
          </select>
        </div>
        <div>
          <label>Number of Guests:</label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            min="1"
            required
          />
        </div>
        <div>
          <p>Total Price: ₹{vendor.priceRange * guests}</p>
        </div>
        <button type="submit">Pay Now</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BookingVendor;
