import React from "react";
import sanchi from "../../assets/sanchi.webp";
import hero from "../../assets/hero3.jpg";
import "../Home/Home.css";
import Hero from "./Hero";
import Hero2 from "./Hero2";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <div className="heroimg">
        <Hero />
        <img src={hero} alt="" />
      </div>
      <Hero2 />
      <Footer />
    </>
  );
};

export default Home;
