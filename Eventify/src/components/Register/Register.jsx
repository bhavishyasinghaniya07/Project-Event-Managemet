import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext"; // Import the UserContext
import "./Register.css";

// App component to switch between SignIn and Register forms
function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  const toggleForm = () => setIsRegistering(!isRegistering);

  return (
    <div className="sign-in-register-wrapper">
      {!isRegistering ? (
        <>
          <div className="sign-in-container">
            <h2>Sign In</h2>
            <SignInForm />
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
          <h2>Register Yourself</h2>
          <RegisterForm toggleForm={toggleForm} />
        </div>
      )}
    </div>
  );
}

// SignInForm component that handles user sign-in
function SignInForm() {
  const { setIsLoggedIn, setRole } = useContext(UserContext); // Use context to set login state globally
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });

      const { token, user } = response.data; // Destructure token and user from response
      const { role, serviceType } = user; // Extract role and serviceType from user

      // Store token, role, and serviceType in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("serviceType", serviceType); // Store serviceType
      localStorage.setItem("userId", user.id);

      // Update global context state
      setIsLoggedIn(true);
      setRole(role);

      // Redirect based on role and serviceType for Service Provider
      if (role === "Admin") {
        navigate("/AdminDashboard");
      } else if (role === "Customer") {
        navigate("/UserDashboard");
      } else if (role === "Service Provider") {
        if (serviceType === "Venue Owner") {
          navigate("/VenueDashboard"); // Navigate to Venue Dashboard for Venue Owner
        } else if (serviceType === "Vendor") {
          navigate("/VendorDashboard"); // Navigate to Vendor Dashboard for Vendor
        }
      }
    } catch (error) {
      setError("Invalid email or password.");
    }
  };

  return (
    <form onSubmit={handleSignIn}>
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
      <a href="">Forgot Password?</a>
    </form>
  );
}


// RegisterForm component that handles user registration
function RegisterForm({ toggleForm }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [serviceType, setServiceType] = useState("");
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
        ServiceType: role === "Service Provider" ? serviceType : "",
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
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="">Select Role</option>
          <option value="Customer">Customer</option>
          <option value="Service Provider">Service Provider</option>
        </select>
      </div>

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
