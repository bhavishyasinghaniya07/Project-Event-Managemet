import React, { useState } from "react";
import "./List.css";
import axios from "axios";

const BusinessForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    serviceType: "",
    businessName: "",
    serviceArea: "",
    price: "",
    venueName: "",
    venueCapacity: "",
    venuePricePerPlate: "",
    venueDescription: "",
    venueCity: "",
    venueAddress: "",
    venueBestForEventTypes: "",
    venueFoodType: "",
    venueAmenities: "",
    venueWebsite: "",
    venueTwitter: "",
    venueInstagram: "",
    venueImages: [],
    vendorImages: [],
  });

  const handleServiceSelection = (e) => {
    setSelectedService(e.target.value);
    setFormData({
      serviceType: "",
      businessName: "",
      serviceArea: "",
      price: "",
      venueName: "",
      venueCapacity: "",
      venuePricePerPlate: "",
      venueDescription: "",
      venueCity: "",
      venueAddress: "",
      venueBestForEventTypes: "",
      venueFoodType: "",
      venueAmenities: "",
      venueWebsite: "",
      venueTwitter: "",
      venueInstagram: "",
      venueImages: [],
      vendorImages: [],
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("You are not authenticated. Please log in.");
      return;
    }

    const url =
      selectedService === "venue"
        ? "http://localhost:5000/api/venues"
        : "http://localhost:5000/api/services";

    try {
      const data = new FormData();

      // Handle the venue or vendor form data depending on the selection
      if (selectedService === "venue") {
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "venueImages" && key !== "vendorImages") {
            data.append(key, value);
          }
        });

        // Append venue images
        for (let i = 0; i < formData.venueImages.length; i++) {
          data.append("venueImages", formData.venueImages[i]);
        }
      } else if (selectedService === "vendor") {
        Object.entries(formData).forEach(([key, value]) => {
          if (key !== "venueImages" && key !== "vendorImages") {
            data.append(key, value);
          }
        });

        // Append vendor images
        for (let i = 0; i < formData.vendorImages.length; i++) {
          data.append("vendorImages", formData.vendorImages[i]);
        }
      }

      const response = await axios.post(url, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        alert("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  const services = [
    "Catering", "Photography", "Videography", "Music Band", "Decoration", "Event Planning",
    "Transportation", "Security Services", "Lighting Services", "Sound Equipment Rental",
    "Venue Booking", "Makeup Artist", "Florist", "Baker", "Rentals", "Bartending", "DJ Services",
    "MC Services", "Graphic Design", "Social Media Management",
  ];

  return (
    <div className="business-form__container">
      <h2 className="business-form__heading">Which service are you interested in?</h2>
      <div className="business-form__service-options">
        <div className="business-form__radio-group">
          <input
            type="radio"
            id="venue"
            value="venue"
            name="service"
            checked={selectedService === "venue"}
            onChange={handleServiceSelection}
          />
          <label htmlFor="venue">List your Venue</label>
        </div>
        <div className="business-form__radio-group">
          <input
            type="radio"
            id="vendor"
            value="vendor"
            name="service"
            checked={selectedService === "vendor"}
            onChange={handleServiceSelection}
          />
          <label htmlFor="vendor">List as a Vendor</label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="business-form__service-form">
        {selectedService === "venue" && (
          <>
            <div className="business-form__card">
              <h3 className="business-form__card-heading">Venue Details</h3>
              <div className="business-form__input-group">
                <label>Venue Name *</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Capacity *</label>
                <input
                  type="number"
                  name="venueCapacity"
                  value={formData.venueCapacity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Price per Plate *</label>
                <input
                  type="number"
                  name="venuePricePerPlate"
                  value={formData.venuePricePerPlate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Description *</label>
                <textarea
                  name="venueDescription"
                  value={formData.venueDescription}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>City *</label>
                <input
                  type="text"
                  name="venueCity"
                  value={formData.venueCity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Address *</label>
                <input
                  type="text"
                  name="venueAddress"
                  value={formData.venueAddress}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Best for Event Types *</label>
                <input
                  type="text"
                  name="venueBestForEventTypes"
                  value={formData.venueBestForEventTypes}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Food Type *</label>
                <input
                  type="text"
                  name="venueFoodType"
                  value={formData.venueFoodType}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Amenities *</label>
                <input
                  type="text"
                  name="venueAmenities"
                  value={formData.venueAmenities}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Website</label>
                <input
                  type="text"
                  name="venueWebsite"
                  value={formData.venueWebsite}
                  onChange={handleInputChange}
                />
              </div>
              <div className="business-form__input-group">
                <label>Twitter</label>
                <input
                  type="text"
                  name="venueTwitter"
                  value={formData.venueTwitter}
                  onChange={handleInputChange}
                />
              </div>
              <div className="business-form__input-group">
                <label>Instagram</label>
                <input
                  type="text"
                  name="venueInstagram"
                  value={formData.venueInstagram}
                  onChange={handleInputChange}
                />
              </div>
              <div className="business-form__input-group">
                <label>Upload Venue Images</label>
                <input
                  type="file"
                  name="venueImages"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </>
        )}

        {selectedService === "vendor" && (
          <>
            <div className="business-form__card">
              <h3 className="business-form__card-heading">Vendor Details</h3>
              <div className="business-form__input-group">
                <label>Service Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Service Area *</label>
                <input
                  type="text"
                  name="serviceArea"
                  value={formData.serviceArea}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Price *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Upload Vendor Images</label>
                <input
                  type="file"
                  name="vendorImages"
                  multiple
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </>
        )}

        <button type="submit" className="business-form__submit-btn">
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusinessForm;
