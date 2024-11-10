import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import AboutUs from "./components/About/AboutUs";
import ContactUs from "./components/Contact/ContactUs";
import Home from "./components/Home/Home";
import LandingPage from "./pages/landing/LandingPage";
import Footer from "./components/Footer/Footer";
import Register from "./components/Register/Register";
import List from "./components/List/List";
import Venue from "./pages/venue/Venue";

import VenueData from "./Context/VenueData";
import Vendor from "./pages/vendor/Vendor";
import Cart from "./components/Cart/Cart";
import BookingComponent from "./components/Booking/BookingComponent";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import VenueDashboard from "./components/VenueDashboard/VenueDashboard";
import VendorDashboard from "./components/VendorDashboard/VendorDashboard";
import { UserContext } from "./Context/UserContext"; // Import UserContext

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userRole = localStorage.getItem("role");

    if (token && userRole) {
      setIsLoggedIn(true);
      setRole(userRole);
    }
  }, []);

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn, role, setRole }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/UserDashboard" element={<UserDashboard />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/venues" element={<Venue />} />
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/signin" element={<Register />} />
          <Route path="/list" element={<List />} />
          <Route path="/venuepage" element={<VenueCard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/booking" element={<BookingComponent />} />
          <Route path="/VendorDashboard" element={<VendorDashboard />} />
          <Route path="/VenueDashboard" element={<VenueDashboard />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </UserContext.Provider>
  );
}

export default App;
