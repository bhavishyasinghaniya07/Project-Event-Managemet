import React, { useState } from "react";
import "./UserProfile.css";

const UserProfile = ({
  user = {
    name: "Manish Kumar Sharma",
    role: "Regular User",
    contactNumber: "78784368648",
    email: "manish@gmail.com",
    address: "MP nagar Bhopal",
  },
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

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

  const handleSave = () => {
    setIsEditing(false);
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
