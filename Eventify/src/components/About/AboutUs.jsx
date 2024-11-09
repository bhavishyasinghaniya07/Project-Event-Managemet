import React from "react";
import "./AboutUs.css";

const values = [
  {
    title: "Innovation",
    image: "https://www.venuelook.com/images/core-value-1.png",
    description:
      "Innovation is at the core of our business values. Our team is constantly thinking on creating a better user experience, and offering unique, state-of-the-art services to our users.",
  },
  {
    title: "Openness",
    image: "https://www.venuelook.com/images/core-value-2.png",
    description:
      "We encourage every team member to share their opinions, ideas and feedback openly. This helps in building strong relationships, better products and processes.",
  },
  {
    title: "Change",
    image: "https://www.venuelook.com/images/core-value-3.png",
    description:
      "We are evolving and believe in creating value by driving change in the way things are done at present. We are happy to embrace every opportunity with open arms.",
  },
  {
    title: "Ownership",
    image: "https://www.venuelook.com/images/core-value-4.png",
    description:
      "Every member of our team takes complete ownership of the task they take up. We encourage collaboration while building individual accountability.",
  },
  {
    title: "Honesty",
    image: "https://www.venuelook.com/images/core-value-5.png",
    description:
      "We believe in doing and communicating the right thing under all circumstances.",
  },
];

const CompanyTeamSection = () => {
  return (
    <div className="company-team-section">
      {/* Company Section */}
      <div className="company-section">
        <div className="company-header">
          <h1>The Company</h1>
        </div>
        <div className="company-content">
          <div className="company-description">
            <p>
              Founded in 2014, VenueLook.com is a product of TENXT SOLUTIONS PVT
              LTD, an Indian internet company. VenueLook team is making it
              easier to find and book venues and vendors across 30+ cities in
              India. We are a young team that loves to find all kinds of trendy,
              chic, professional, or unique venues and vendors. We are building
              a product that showcases the amazing spaces and event
              professionals we come across and at the same time, we aim to help
              event organizers save time and effort when looking for their kind
              of venues and event partners. The ultimate objective is to connect
              the right people to the right kind of venues and vendors, bridging
              the gap and delivering value!
            </p>
          </div>
          <div className="company-image">
            <img
              src="https://www.venuelook.com/images/company-11.png"
              alt="Founder"
              className="founder-image"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="team-section">
        <div className="team-content">
          <div className="team-image">
            <img
              src="https://www.venuelook.com/images/company-21.png"
              alt="Team"
              className="team-photo"
            />
          </div>
          <div className="team-description">
            <h2>The Team</h2>
            <p>
              VenueLook has a passionate, committed woman founder at its helm
              with some sharpest, experienced brains behind it as angel
              advisors. As with any great team, VenueLook is a good mix of
              sharp, intelligent, focused, hard-working team. We're young, we're
              enthusiastic and yes, we love hunting down the coolest venues and
              event vendors around.
            </p>
          </div>
        </div>
      </div>

      {/* Join Team Section */}
      <div className="join-team-section">
        <div className="join-team-content">
          <div className="join-description">
            <h2>Join Our Team</h2>
            <p>
              We believe that even though we're so often communicating and
              socialising online, it’s those offline weddings, social and
              corporate events and activities that are most important. So we are
              starting off by making it easier for people to organise offline
              weddings, social and corporate events and find venues, artists,
              decorators, entertainers etc. for the same. What we have created
              is a web-based venue and vendor discovery platform that links
              event-organisers with the best function venues and vendors across
              India. If you want to contribute towards our big hairy audacious
              goal to make it easier for Indians to create social experiences,
              you should definitely join us! You can send in your resume at:
              info@tenxt.com
            </p>
          </div>
          <div className="join-image">
            <img
              src="https://www.venuelook.com/images/company-31.png"
              alt="Join Us"
              className="team-photo"
            />
          </div>
        </div>
      </div>

      {/* Values Section with Cards */}
      <div className="values-section">
        <h2>Core Values</h2>
        <div className="values-cards">
          {values.map((value, index) => (
            <div key={index} className="value-card">
              <img
                src={value.image}
                alt={value.title}
                className="value-image"
              />
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyTeamSection;
