import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo3.jpg";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");

  // Function to handle logout (consider using a separate logout component)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(""); // Clear user role when logging out
    localStorage.removeItem("jwtToken"); // Remove JWT token from localStorage securely
    alert("You have logged out successfully.");
  };

  // Function to check user role based on JWT token (consider using a dedicated API call)
  const checkUserRole = async () => {
    const storedToken = localStorage.getItem("jwtToken");

    if (storedToken) {
      try {
        const response = await fetch("/api/user/role", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role); // Update user role state
        } else {
          console.error("Failed to retrieve user role:", response.statusText);
          // Handle error gracefully, e.g., redirect to login
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        // Handle error gracefully, e.g., redirect to login
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");
    setIsLoggedIn(!!storedToken); // Set isLoggedIn based on token presence
    checkUserRole(); // Fetch user role if logged in
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo">
          <img src={logo} alt="Eventify Logo" />
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
            <li className="action-btn" onClick={handleLogout}>
              <a href="#">Logout</a>
            </li>
          ) : (
            <li className="action-btn action-btn1">
              <a href="/signin">Signin</a>
            </li>
          )}

          {userRole === "Vendor" && ( // Conditionally show List Business for vendors only
            <li className="action-btn action-btn2">
              <a href="/list">List Business</a>
            </li>
          )}

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