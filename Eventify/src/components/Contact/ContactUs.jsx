import React from "react";
import "./ContactUs.css";

const ContactUs = () => {
  return (
    <div className="contact-us">
      <h1>Contact Us</h1>
      <div className="contact-content">
        {/* Contact Form Section */}
        <div className="contact-form">
          <h2>Have any questions?</h2>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile:</label>
              <input type="tel" id="mobile" required />
            </div>
            <div className="form-group">
              <label htmlFor="query">Your Query:</label>
              <textarea id="query" rows="4" required></textarea>
            </div>
            <button type="submit" className="submit-btn">
              Submit
            </button>
          </form>
        </div>

        {/* Contact Details Section */}
        <div className="contact-details">
          <h2>Contact Details</h2>
          <div className="office">
            <h3>Head Office</h3>
            <p>54/9 MP Nagar,</p>
            <p>Bhopal 432003</p>
            <p>Email: support@eventify.com</p>
            <p>Phone: +1 (555) 012-3456</p>
          </div>
          <div className="office">
            <h3>Branch Office</h3>
            <p>456, gufa mandir Lalghati,</p>
            <p>Bhopal 432005</p>
            <p>Email: branch@eventify.com</p>
            <p>Phone: +1 (555) 987-6543</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
