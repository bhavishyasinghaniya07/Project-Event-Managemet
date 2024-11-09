import React, { useState } from "react";
import "./BookingComponent.css"; // Add styling as needed

const BookingComponent = ({ venue, onClose }) => {
  const [guests, setGuests] = useState(1);
  const [date, setDate] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false); // State to manage payment processing

  const handlePayment = (e) => {
    e.preventDefault(); // Prevent the default form submission
    setProcessingPayment(true); // Start processing payment

    // Simulate a payment processing delay
    setTimeout(() => {
      setProcessingPayment(false); // Stop processing payment
      setPaymentSuccess(true); // Mark payment as successful
    }, 2000);
  };

  if (paymentSuccess) {
    return (
      <div className="booking-popup">
        <h2>Booking Confirmation</h2>
        <p>
          Your booking for {venue.name} on {date} for {guests} guests has been
          confirmed!
        </p>
        <button onClick={onClose}>Close</button>
      </div>
    );
  }

  return (
    <div className="booking-popup">
      <h2>Book {venue.name}</h2>
      <form onSubmit={handlePayment}>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
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
          <p>Total Price: ₹{venue.vegPrice * guests}</p>
        </div>
        <button type="submit" disabled={processingPayment}>
          {processingPayment ? "Processing Payment..." : "Pay Now"}
        </button>
      </form>
      <button onClick={onClose}>Cancel</button>

      {/* Dummy payment loading indicator */}
      {processingPayment && (
        <div className="payment-loading">
          <p>Processing your payment...</p>
        </div>
      )}
    </div>
  );
};

export default BookingComponent;
