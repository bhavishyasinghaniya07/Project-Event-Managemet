import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";

const UserProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    name: "",
    role: "Regular User",
    contactNumber: "N/A",
    email: "N/A",
    address: "MP Nagar Bhopal", // Default address
  });

  const fetchUserProfile = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.get(
        `http://localhost:5000/api/user/profile?userId=${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // Log the response to check data structure
      console.log("Profile API response:", response.data);
  
      // Update the state with the data from the API, matching the correct keys
      setUpdatedUser({
        name: response.data.Name || "User", // Correct key for Name
        role: response.data.Role || "Regular User", // Correct key for Role
        contactNumber: response.data.ContactInfo || "N/A", // Correct key for ContactInfo
        email: response.data.Email || "N/A", // Correct key for Email
        address: response.data.address || "MP Nagar Bhopal", // Default if missing
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({
      ...updatedUser,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
  
    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/profile`, // PUT request to update the profile
        {
          // Request body structure should match the one from Postman
          userId: userId,  // If the backend requires userId to be passed
          name: updatedUser.name,
          email: updatedUser.email,
          contactInfo: updatedUser.contactNumber, // Ensure this matches the backend field name
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      console.log("Profile updated:", response.data);
  
      // After saving, exit edit mode
      setIsEditing(false);
  
      // Optionally, you can update the UI or show a success message
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  
  return (
    <div className="profile-card">
      {!isEditing ? (
        <>
          <div className="profile-info">
            <h2 className="user-name">{updatedUser.name}</h2>
            <p className="user-role">{updatedUser.role}</p>
            <p className="user-contact">
              <strong>Contact:</strong> {updatedUser.contactNumber}
            </p>
            <p className="user-email">
              <strong>Email:</strong> {updatedUser.email}
            </p>
            <p className="user-address">
              <strong>Address:</strong> {updatedUser.address}
            </p>
          </div>
          <button className="edit-button" onClick={handleEditClick}>
            Edit Profile
          </button>
        </>
      ) : (
        <div className="edit-form">
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="input-field"
          />
          <input
            type="text"
            name="contactNumber"
            value={updatedUser.contactNumber}
            onChange={handleInputChange}
            placeholder="Contact Number"
            className="input-field"
          />
          <input
            type="email"
            name="email"
            value={updatedUser.email}
            onChange={handleInputChange}
            placeholder="Email"
            className="input-field"
          />
          <input
            type="text"
            name="address"
            value={updatedUser.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="input-field"
          />
          <button className="save-button" onClick={handleSave}>
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
