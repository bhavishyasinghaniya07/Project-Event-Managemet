import React, { useState } from "react";
import "./AdminDashboard.css";
import UserProfile from "../UserProfile/UserProfile";

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    id: null,
    firstName: "",
    lastName: "",
    username: "",
    profilePicture: "",
    email: "",
    phone: "",
    location: "",
    role: "",
    accountStatus: "",
    registrationDate: "",
    lastLogin: "",
  });

  const [users, setUsers] = useState([
    {
      id: 1,
      firstName: "Alice",
      lastName: "Johnson",
      username: "alicej",
      profilePicture:
        "https://i.pinimg.com/236x/fa/9c/4b/fa9c4bccfffa98a27009017c63c27d26.jpg",
      email: "alice@example.com",
      phone: "123-456-7890",
      location: "New York, USA",
      role: "Organizer",
      accountStatus: "Active",
      registrationDate: "2023-01-01",
      lastLogin: "2023-11-01",
    },
    {
      id: 2,
      firstName: "Bhupendra",
      lastName: "singh",
      username: "bobsmith",
      profilePicture:
        "https://i.pinimg.com/236x/4c/34/f3/4c34f3cc3fccf59b678e2b3b2ec99a14.jpg",
      email: "bob@example.com",
      phone: "987-654-3210",
      location: "California, USA",
      role: "Attendee",
      accountStatus: "Inactive",
      registrationDate: "2023-02-15",
      lastLogin: "2023-11-05",
    },
  ]);

  // Dummy data for vendors and venues
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      location: "Lalghati , bhopal",
      status: "Active",
      rating: 4.5,
    },
    {
      id: 2,
      name: "Mahendra verma",
      location: "Kolar , Bhopal",
      status: "Inactive",
      rating: 3.8,
    },
  ]);

  const [venues, setVenues] = useState([
    {
      id: 1,
      name: "Surendra Nayak",
      location: "Bhadbhada , bhopal",
      capacity: 150,
      status: "Available",
    },
    {
      id: 2,
      name: "Jeevan joshi",
      location: "Bairagarh",
      capacity: 300,
      status: "Booked",
    },
  ]);

  const dashboardData = {
    users: 1280,
    vendors: 356,
    venues: 195,
    successfulEvents: 276,
    upcomingEvents: 54,
    revenue: "6,15,000",
  };

  const handleSectionChange = (section) => {
    setSelectedSection(section);
  };

  const handleEdit = (item) => {
    setEditForm(item);
    setIsEditing(true);
  };

  const handleSave = () => {
    if (selectedSection === "users") {
      const updatedUsers = users.map((user) =>
        user.id === editForm.id ? { ...user, ...editForm } : user
      );
      setUsers(updatedUsers);
    } else if (selectedSection === "vendors") {
      const updatedVendors = vendors.map((vendor) =>
        vendor.id === editForm.id ? { ...vendor, ...editForm } : vendor
      );
      setVendors(updatedVendors);
    } else if (selectedSection === "venues") {
      const updatedVenues = venues.map((venue) =>
        venue.id === editForm.id ? { ...venue, ...editForm } : venue
      );
      setVenues(updatedVenues);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleBlockUnblock = (id) => {
    if (selectedSection === "users") {
      setUsers(
        users.map((user) =>
          user.id === id
            ? {
                ...user,
                accountStatus:
                  user.accountStatus === "Active" ? "Blocked" : "Active",
              }
            : user
        )
      );
    } else if (selectedSection === "vendors") {
      setVendors(
        vendors.map((vendor) =>
          vendor.id === id
            ? {
                ...vendor,
                status: vendor.status === "Active" ? "Inactive" : "Active",
              }
            : vendor
        )
      );
    } else if (selectedSection === "venues") {
      setVenues(
        venues.map((venue) =>
          venue.id === id
            ? {
                ...venue,
                status: venue.status === "Available" ? "Booked" : "Available",
              }
            : venue
        )
      );
    }
  };

  const handleDelete = (id) => {
    if (selectedSection === "users") {
      setUsers(users.filter((user) => user.id !== id));
    } else if (selectedSection === "vendors") {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    } else if (selectedSection === "venues") {
      setVenues(venues.filter((venue) => venue.id !== id));
    }
  };

  return (
    <div className="container">
      {/* Navbar */}
      <nav className="navbar">
        <h1>Admin Dashboard</h1>
        <button onClick={() => handleSectionChange("users")}>
          Manage Users
        </button>
        <button onClick={() => handleSectionChange("vendors")}>
          Manage Vendors
        </button>
        <button onClick={() => handleSectionChange("venues")}>
          Manage Venues
        </button>
      </nav>
      <UserProfile />
      {/* Go Back Button */}
      {selectedSection && (
        <button
          onClick={() => handleSectionChange(null)}
          className="back-button"
        >
          Go Back
        </button>
      )}

      {/* Dashboard Overview Cards */}
      {!selectedSection && (
        <div className="dashboard-cards">
          <div className="card">Users: {dashboardData.users}</div>
          <div className="card">Vendors: {dashboardData.vendors}</div>
          <div className="card">Venues: {dashboardData.venues}</div>
          <div className="card">
            Successful Events: {dashboardData.successfulEvents}
          </div>
          <div className="card">
            Upcoming Events: {dashboardData.upcomingEvents}
          </div>
          <div className="card">Revenue: {dashboardData.revenue}</div>
        </div>
      )}

      {/* User, Vendor, Venue Detail Cards */}
      {selectedSection &&
        (selectedSection === "users"
          ? users
          : selectedSection === "vendors"
          ? vendors
          : venues
        ).map((item) => (
          <div key={item.id} className="detail-card">
            <h3>
              {selectedSection === "users"
                ? `${item.firstName} ${item.lastName}`
                : item.name}
            </h3>
            <p>ID: {item.id}</p>
            <p>
              {selectedSection === "users"
                ? `Email: ${item.email}`
                : selectedSection === "vendors"
                ? `Rating: ${item.rating}`
                : `Capacity: ${item.capacity}`}
            </p>
            <p>Location: {item.location}</p>
            <p>
              Status:{" "}
              {selectedSection === "users" ? item.accountStatus : item.status}
            </p>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleBlockUnblock(item.id)}>
              {selectedSection === "users"
                ? item.accountStatus === "Active"
                  ? "Block"
                  : "Unblock"
                : item.status === "Active"
                ? "Deactivate"
                : "Activate"}
            </button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        ))}

      {/* Edit Modal Form */}
      {isEditing && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              Edit{" "}
              {selectedSection === "users"
                ? "User"
                : selectedSection === "vendors"
                ? "Vendor"
                : "Venue"}{" "}
              Details
            </h2>
            <form>
              <label>Name:</label>
              <input
                type="text"
                value={
                  selectedSection === "users"
                    ? editForm.firstName
                    : editForm.name
                }
                onChange={(e) =>
                  setEditForm({ ...editForm, name: e.target.value })
                }
              />
              <label>Location:</label>
              <input
                type="text"
                value={editForm.location}
                onChange={(e) =>
                  setEditForm({ ...editForm, location: e.target.value })
                }
              />
              {selectedSection === "vendors" && (
                <>
                  <label>Rating:</label>
                  <input
                    type="number"
                    value={editForm.rating}
                    onChange={(e) =>
                      setEditForm({ ...editForm, rating: e.target.value })
                    }
                  />
                </>
              )}
              {selectedSection === "venues" && (
                <>
                  <label>Capacity:</label>
                  <input
                    type="number"
                    value={editForm.capacity}
                    onChange={(e) =>
                      setEditForm({ ...editForm, capacity: e.target.value })
                    }
                  />
                </>
              )}
              <button type="button" onClick={handleSave}>
                Save
              </button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
