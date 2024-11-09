import React from "react";
import "./Navbar.css";
import logo from "../../assets/logo3.jpg";

const Navbar = () => {
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
          <li className="action-btn action-btn1">
            <a href="/signin">Signin</a>
          </li>
          <li className="action-btn">
            <a href="/list">List Your Business</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
