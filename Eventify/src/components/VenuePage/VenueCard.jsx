// VenueCard.jsx
import React, { useState } from "react";
import "./VenueCard.css";
import VenueData from "../../Context/VenueData";

const VenueCard = ({ venue }) => {
  const [availabilityChecked, setAvailabilityChecked] = useState(false);

  const handleCheckAvailability = (e) => {
    e.preventDefault();
    // Logic to check availability
    setAvailabilityChecked(true);
  };

  return (
    <div className="venue-card">
      <div className="venue-header">
        <h2>{VenueData[0].name}</h2>
        <p className="location">
          <strong>Location:</strong> {VenueData.location}
        </p>
      </div>
      <div className="venue-images">
        {VenueData[0].images.map((image, index) => (
          <img key={index} src={image} alt={`${VenueData.name} ${index + 1}`} />
        ))}
      </div>
      <div className="venue-details">
        <div className="details-section">
          <h3>Venue Details</h3>
          <div className="detail-category">
            <h4>Address</h4>
            <p>{VenueData.address}</p>
          </div>
          <div className="detail-category">
            <h4>Guest Capacity</h4>
            <p>{VenueData.guestCapacity}</p>
          </div>
          <div className="detail-category">
            <h4>Rating</h4>
            <p>{VenueData.rating} ⭐</p>
          </div>
          <div className="detail-category">
            <h4>Views</h4>
            <p>{VenueData.views}</p>
          </div>
        </div>

        <div className="pricing-section">
          <h3>Pricing</h3>
          <div className="detail-category">
            <h4>Vegetarian Plate Price</h4>
            <p>{VenueData.vegPrice}</p>
          </div>
          <div className="detail-category">
            <h4>Non-Vegetarian Plate Price</h4>
            <p>{VenueData.nonVegPrice}</p>
          </div>
          <div className="detail-category">
            <h4>Rooms Available</h4>
            <p>{VenueData.rooms}</p>
          </div>
          <div className="detail-category">
            <h4>Alcohol Served</h4>
            <p>{VenueData.alcoholServed ? "Yes" : "No"}</p>
          </div>
        </div>

        <div className="reviews-section">
          <h3>Customer Reviews</h3>

          {VenueData[0].customerReviews.map((review, index) => (
            <div key={index} className="review">
              <strong>{review.name}</strong>: {review.review}
            </div>
          ))}
        </div>
      </div>

      <div className="venue-actions">
        <button className="btn request-quote">Request a Quote</button>
        <button className="btn schedule-visit">Schedule a Visit</button>
      </div>

      <form onSubmit={handleCheckAvailability} className="availability-form">
        <h3>Check Availability</h3>
        <input type="date" required />
        <button type="submit">Check</button>
        {availabilityChecked && (
          <p className="availability-message">
            Availability checked for selected date.
          </p>
        )}
      </form>
    </div>
  );
};

export default VenueCard;
