import React from "react";
import "./LandingPage.css";

import wedding from "../../assets/c1.png";
import birthday from "../../assets/c2.png";
import engagement from "../../assets/c3.png";
import pool from "../../assets/c4.png";
import cocktail from "../../assets/c5.png";
import corp from "../../assets/c6.png";

const LandingPage = () => {
  const testimonialsData = [
    {
      id: 1,
      name: "Anjali Sharma",
      feedback:
        "Amazing service! The venue was perfect, and everything was handled smoothly. Highly recommend!",
      image: "customer1.jpg", // Replace with actual image path
    },
    {
      id: 2,
      name: "Rohit Mehta",
      feedback:
        "I had the best experience organizing my corporate event. The team was very professional.",
      image: "customer2.jpg",
    },
    {
      id: 3,
      name: "Sara Khan",
      feedback:
        "From booking to the actual event, everything was seamless. Excellent platform!",
      image: "customer3.jpg",
    },
    {
      id: 4,
      name: "Priya Singh",
      feedback:
        "Very satisfied with the venue and the overall service. My wedding was magical.",
      image: "customer4.jpg",
    },
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <section className="hero-section">
        <h1>Make Your Events Special</h1>
        <p>Find the best venues and vendors for all kinds of events.</p>
        <a href="#categories" className="btn-primary1">
          Explore Events
        </a>
      </section>

      {/* Event Categories Section */}
      <section className="event-categories" id="categories">
        <h2>Event Categories</h2>
        <div className="categories-grid">
          <div className="category-card">
            <img src={wedding} alt="Wedding" />
            <h3>Wedding</h3>
            <p>Elegant and grand venues for your special day.</p>
          </div>
          <div className="category-card">
            <img src={birthday} alt="Birthday" />
            <h3>Birthday</h3>
            <p>Celebrate birthdays with joy and fun venues.</p>
          </div>
          <div className="category-card">
            <img src={engagement} alt="Engagement" />
            <h3>Engagement</h3>
            <p>Beautiful venues to begin your lifelong journey together.</p>
          </div>
          <div className="category-card">
            <img src={pool} alt="Pool Party" />
            <h3>Pool Party</h3>
            <p>Cool off with friends at an amazing pool party venue.</p>
          </div>
          <div className="category-card">
            <img src={cocktail} alt="Cocktail Party" />
            <h3>Cocktail Party</h3>
            <p>Chic venues to raise a toast and have a great evening.</p>
          </div>
          <div className="category-card">
            <img src={corp} alt="Corporate Party" />
            <h3>Corporate Party</h3>
            <p>Formal and stylish venues for your corporate events.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <img src="browse.jpg" alt="Browse Venues" />
            <h3>Browse Venues & Vendors</h3>
            <p>Explore the best options to match your event theme and style.</p>
          </div>
          <div className="step-card">
            <img src="book.jpg" alt="Book" />
            <h3>Book with Ease</h3>
            <p>Choose the best fit and book them online without any hassle.</p>
          </div>
          <div className="step-card">
            <img src="organize.jpg" alt="Organize" />
            <h3>Organize Your Event</h3>
            <p>Efficiently plan and manage everything with our support.</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="services-grid">
          <div className="service-card">
            <img src="24by7.jpg" alt="24/7 Service" />
            <h3>24/7 Available</h3>
            <p>We are here to assist you round the clock for any needs.</p>
          </div>
          <div className="service-card">
            <img src="verified.jpg" alt="Verified" />
            <h3>Verified Venues & Vendors</h3>
            <p>
              All venues and vendors are thoroughly verified for reliability.
            </p>
          </div>
          <div className="service-card">
            <img src="happy-customers.jpg" alt="Happy Customers" />
            <h3>Happy Customers</h3>
            <p>
              We have successfully managed thousands of events with satisfied
              customers.
            </p>
          </div>
          <div className="service-card">
            <img src="network.jpg" alt="Wide Network" />
            <h3>Extensive Network</h3>
            <p>
              We have a wide network of venues and vendors to fit your
              preferences.
            </p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-grid">
          {testimonialsData.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card">
              <img src={testimonial.image} alt={testimonial.name} />
              <p>"{testimonial.feedback}"</p>
              <h4>{testimonial.name}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Plan Your Event?</h2>
        <a href="#contact" className="btn-primary1">
          Get Started Now
        </a>
      </section>
    </div>
  );
};

export default LandingPage;
