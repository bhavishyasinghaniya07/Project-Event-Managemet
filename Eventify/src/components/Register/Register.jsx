import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

function App() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [userType, setUserType] = useState("");

  const toggleForm = () => setIsRegistering(!isRegistering);

  return (
    <div className="sign-in-register-wrapper">
      {!isRegistering ? (
        <>
          <div className="sign-in-container">
            <h2>Sign In</h2>
            <SignInForm userType={userType} setUserType={setUserType} />
          </div>
          <div className="register-container">
            <p>Don't have an account?</p>
            <button onClick={toggleForm} className="register-button">
              Register
            </button>
          </div>
        </>
      ) : (
        <div className="register-container">
          <h2>Register</h2>
          <RegisterForm toggleForm={toggleForm} />
        </div>
      )}
    </div>
  );
}

function SignInForm({ userType, setUserType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      alert(`Welcome, ${userType || "Regular User"}!`);
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSignIn}>
      <div className="user-type-group">
        {["Admin", "Vendor", "Regular User"].map((type) => (
          <label key={type} className="user-type-label">
            <input
              type="radio"
              value={type}
              checked={userType === type}
              onChange={(e) => setUserType(e.target.value)}
            />
            {type}
          </label>
        ))}
      </div>

      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="sign-in-button">
        Sign In
      </button>
    </form>
  );
}

function RegisterForm({ toggleForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [serviceType, setServiceType] = useState(""); // New state for service provider type
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/users", {
        Name: name,
        Email: email,
        Password: password,
        Role: role,
        ServiceType: role === "Service Provider" ? serviceType : "", // Add service type only if applicable
        ContactInfo: contactInfo,
      });
      alert("Registration successful!");
      toggleForm();
    } catch (error) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="input-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="input-group">
        <label>Role:</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="Customer">Customer</option>
          <option value="Admin">Admin</option>
          <option value="Service Provider">Service Provider</option>
        </select>
      </div>

      {/* Conditionally render service type options if Service Provider is selected */}
      {role === "Service Provider" && (
        <div className="input-group">
          <label>Service Type:</label>
          <select
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Venue Owner">Venue Owner</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>
      )}

      <div className="input-group">
        <label>Contact Info:</label>
        <input
          type="text"
          value={contactInfo}
          onChange={(e) => setContactInfo(e.target.value)}
          required
        />
      </div>

      {error && <p className="error-message">{error}</p>}

      <button type="submit" className="register-button">
        Register
      </button>

      <p className="toggle-link">
        Already have an account? <span onClick={toggleForm}>Sign In</span>
      </p>
    </form>
  );
}

export default App;
