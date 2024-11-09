import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>About Us</h3>
          <p>
            We are a leading platform for event planning and management, helping
            you find the perfect venues and vendors for every occasion.
          </p>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#categories">Event Categories</a>
            </li>
            <li>
              <a href="#how-it-works">How It Works</a>
            </li>
            <li>
              <a href="#testimonials">Testimonials</a>
            </li>
            <li>
              <a href="#contact">Contact Us</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Services</h3>
          <ul>
            <li>
              <a href="#wedding">Wedding Planning</a>
            </li>
            <li>
              <a href="#corporate-events">Corporate Events</a>
            </li>
            <li>
              <a href="#birthday-parties">Birthday Parties</a>
            </li>
            <li>
              <a href="#engagements">Engagements</a>
            </li>
            <li>
              <a href="#pool-parties">Pool Parties</a>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Contact Info</h3>
          <ul>
            <li>
              <i className="fas fa-map-marker-alt"></i> 54/9 MP Nagar, Bhopal,
              India
            </li>
            <li>
              <i className="fas fa-phone"></i> +91 9876543210
            </li>
            <li>
              <i className="fas fa-envelope"></i> info@eventmanagement.com
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Event Management | All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
