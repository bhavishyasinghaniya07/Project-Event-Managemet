import React from "react";

import c1 from "../../assets/c1.png";
import c2 from "../../assets/c2.png";
import c3 from "../../assets/c3.png";
import c4 from "../../assets/c4.png";
import c5 from "../../assets/c5.png";
import c6 from "../../assets/c6.png";

import "./Hero2.css";

const Hero2 = () => {
  return (
    <>
      <div className="head head2">
        <h1>Choose the event you want to organise</h1>
      </div>

      <div className="catogory">
        <div className="cat">
          <img src={c2} alt="" /> <h3>Birthday</h3>
        </div>
        <div className="cat">
          <img src={c1} alt="" /> <h3>Wedding</h3>
        </div>
        <div className="cat">
          <img src={c3} alt="" /> <h3>Engagement</h3>
        </div>
        <div className="cat">
          <img src={c5} alt="" /> <h3>Coprate Party</h3>
        </div>
        <div className="cat">
          <img src={c4} alt="" /> <h3>Pool Party</h3>
        </div>
        <div className="cat">
          <img src={c6} alt="" /> <h3>Kitty Party</h3>
        </div>
      </div>

      <div className="head2">
        <h1>How We Operate</h1>
      </div>
      <div className="para">
        <p>
          At our event management platform, we simplify event planning by
          offering end-to-end solutions for all types of gatherings—whether it's
          a wedding, birthday, or corporate event. Our streamlined process
          allows users to create, manage, and book events effortlessly, ensuring
          seamless registration, ticketing, and personalized communication every
          step of the way.
        </p>
      </div>
    </>
  );
};

export default Hero2;
