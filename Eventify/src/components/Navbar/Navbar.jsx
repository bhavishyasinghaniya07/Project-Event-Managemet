import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo3.jpg";

const Navbar = () => {
  // Boolean state to track if user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false); // Update the state to indicate the user has logged out
    // You can also clear user data from local storage or session storage here if needed
    alert("You have logged out successfully.");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <img src={logo} alt="Eventify Logo" />{" "}
          {/* Replace with the actual logo path */}
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/venues">Venues</a>
          </li>
          <li>
            <a href="/vendor">Vendors</a>
          </li>
          <li>
            <a href="/about">About Us</a>
          </li>
          <li>
            <a href="/contact">Contact Us</a>
          </li>
        </ul>

        {/* Action Buttons */}
        <ul className="nav-buttons">
          {isLoggedIn ? (
            // Show Log Out button if logged in
            <li className="action-btn" onClick={handleLogout}>
              <a href="#">Logout</a>
            </li>
          ) : (
            // Show Sign In button if not logged in
            <li className="action-btn action-btn1">
              <a href="/signin">Signin</a>
            </li>
          )}

          <li className="action-btn action-btn2">
            <a href="/list">List Business</a>
          </li>
          <li>
            <a href="/UserDashboard">
              <img
                src="https://i.pinimg.com/474x/b3/51/25/b35125ae6b3949e788faebbc783c0dab.jpg"
                alt=""
              />
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
