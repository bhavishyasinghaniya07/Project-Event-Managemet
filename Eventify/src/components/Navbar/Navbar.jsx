import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext"; // Import UserContext
import "./Navbar.css";
import logo from "../../assets/logo3.jpg";

const Navbar = () => {
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useContext(UserContext); // Use context
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, [setIsLoggedIn, setRole]); // This effect will run on component mount

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    alert("You have logged out successfully.");
    navigate("/"); // Navigate to homepage
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="logo">
          <img src={logo} alt="Eventify Logo" />
        </div>

        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/venues">Venues</a></li>
          <li><a href="/vendor">Vendors</a></li>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>

        <ul className="nav-buttons">
          {isLoggedIn ? (
            <>
              {/* Show the Logout button for all logged-in users */}
              <li className="action-btn" onClick={handleLogout}><a href="#">Logout</a></li>

              {/* Show List Business button only if role is Service Provider */}
              {role === "Service Provider" && (
                <li className="action-btn"><a href="/list">List Business</a></li>
              )}

              {/* Profile image for all logged-in users */}
              <li>
                <a href="/UserDashboard">
                  <img
                    src="https://i.pinimg.com/474x/b3/51/25/b35125ae6b3949e788faebbc783c0dab.jpg"
                    alt="Profile"
                  />
                </a>
              </li>
            </>
          ) : (
            <>
              {/* Show only Signin button when not logged in */}
              <li className="action-btn action-btn1"><a href="/signin">Signin</a></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
