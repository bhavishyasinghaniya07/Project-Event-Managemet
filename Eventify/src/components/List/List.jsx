import React, { useState } from "react";
import "./List.css";
import axios from "axios"; // Axios for HTTP requests

const BusinessForm = () => {
  const [selectedService, setSelectedService] = useState("");
  const [formData, setFormData] = useState({
    serviceType: "",
    businessName: "",
    city: "",
    location: "",
    phoneNumber: "",
    email: "",
    venueName: "",
    venueCapacity: "",
    venuePrice: "",
    venueDescription: "",
    venueCity: "",
    venueLocality: "",
    venueAddress: "",
    venueWebsite: "",
    venueTwitter: "",
    venueInstagram: "",
    ownerName: "",
    ownerPhoneNumber: "",
    ownerEmail: "",
    venueImages: [],
    vendorImages: [],
    selectedVendorServices: "",
  });

  const handleServiceSelection = (e) => {
    setSelectedService(e.target.value);
    setFormData({
      serviceType: "",
      businessName: "",
      city: "",
      location: "",
      phoneNumber: "",
      email: "",
      venueName: "",
      venueCapacity: "",
      venuePrice: "",
      venueDescription: "",
      venueCity: "",
      venueLocality: "",
      venueAddress: "",
      venueWebsite: "",
      venueTwitter: "",
      venueInstagram: "",
      ownerName: "",
      ownerPhoneNumber: "",
      ownerEmail: "",
      venueImages: [],
      vendorImages: [],
      selectedVendorServices: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: [...files] });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  //   alert("Form submitted successfully");
  // };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url =
      selectedService === "venue"
        ? "http://localhost:5000/api/business/venue"
        : "http://localhost:5000/api/business/vendor";


    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((file) => data.append(key, file)); // Handle multiple files
        } else {
          data.append(key, value);
        }
      });

      const response = await axios.post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 201) {
        alert("Form submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };


  // Predefined list of vendor services
  const services = [
    "Catering",
    "Photography",
    "Videography",
    "Music Band",
    "Decoration",
    "Event Planning",
    "Transportation",
    "Security Services",
    "Lighting Services",
    "Sound Equipment Rental",
    "Venue Booking",
    "Makeup Artist",
    "Florist",
    "Baker",
    "Rentals",
    "Bartending",
    "DJ Services",
    "MC Services",
    "Graphic Design",
    "Social Media Management",
  ];

  return (
    <div className="business-form__container">
      <h2 className="business-form__heading">
        Which service are you interested in?
      </h2>
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
                <label>Venue Name</label>
                <input
                  type="text"
                  name="venueName"
                  value={formData.venueName}
                  onChange={handleInputChange}
                  placeholder="Enter the venue name"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Capacity</label>
                <input
                  type="number"
                  name="venueCapacity"
                  value={formData.venueCapacity}
                  onChange={handleInputChange}
                  placeholder="Enter the capacity"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Price</label>
                <input
                  type="number"
                  name="venuePrice"
                  value={formData.venuePrice}
                  onChange={handleInputChange}
                  placeholder="Enter the price"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Description</label>
                <textarea
                  name="venueDescription"
                  value={formData.venueDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the venue"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue City</label>
                <input
                  type="text"
                  name="venueCity"
                  value={formData.venueCity}
                  onChange={handleInputChange}
                  placeholder="Enter the city"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Locality</label>
                <input
                  type="text"
                  name="venueLocality"
                  value={formData.venueLocality}
                  onChange={handleInputChange}
                  placeholder="Enter the locality"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Address</label>
                <input
                  type="text"
                  name="venueAddress"
                  value={formData.venueAddress}
                  onChange={handleInputChange}
                  placeholder="Enter the address"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Website</label>
                <input
                  type="url"
                  name="venueWebsite"
                  value={formData.venueWebsite}
                  onChange={handleInputChange}
                  placeholder="Enter the website URL"
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Twitter</label>
                <input
                  type="url"
                  name="venueTwitter"
                  value={formData.venueTwitter}
                  onChange={handleInputChange}
                  placeholder="Enter Twitter URL"
                />
              </div>
              <div className="business-form__input-group">
                <label>Venue Instagram</label>
                <input
                  type="url"
                  name="venueInstagram"
                  value={formData.venueInstagram}
                  onChange={handleInputChange}
                  placeholder="Enter Instagram URL"
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
              <div className="business-form__input-group">
                <label>Owner Name</label>
                <input
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  placeholder="Enter the owner's name"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Owner Phone Number</label>
                <input
                  type="tel"
                  name="ownerPhoneNumber"
                  value={formData.ownerPhoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter the owner's phone number"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Owner Email</label>
                <input
                  type="email"
                  name="ownerEmail"
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  placeholder="Enter the owner's email"
                  required
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
                <label>Vendor Business Name</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter the business name"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter the city"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter the location"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Enter the phone number"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter the email"
                  required
                />
              </div>
              <div className="business-form__input-group">
                <label>Vendor Services</label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select Service Type
                  </option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
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

        {selectedService && (
          <>
            <button type="submit" className="business-form__submit-button">
              List your business
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default BusinessForm;
