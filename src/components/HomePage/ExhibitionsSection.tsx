import React from "react";
import "../../styles/HomePage/exhibitions.css";

const events = [
  { title: "Contemporary Art Week", date: "Until Jun 23, 2025" },
  { title: "Art Grooves", date: "Jul 01 – Aug 12, 2025" },
  { title: "Spring Auctions", date: "Sep 10 – Oct 01, 2025" },
  { title: "The Soul (Ungendered)", date: "Oct 15 – Nov 12, 2025" }
];

const ExhibitionsSection: React.FC = () => (
  <section className="exhibitions-section">
    <div className="exhibitions-header">
      <h2 className="exhibitions-title">Exhibitions and Events</h2>
      <p className="exhibitions-subtitle">
        We are more than an online art gallery! We regularly organize exhibitions, pop-ups, and events around the world.
      </p>
    </div>

    <div className="exhibitions-body">
      <div className="exhibitions-left">
        <img src="/assets/statue.png" alt="Statue" className="exhibition-image" />
      </div>

      <div className="exhibitions-right">
        <div className="exhibition-list">
          {events.map((event, index) => (
            <div className="exhibition-row" key={index}>
              <div>
                <h4>{event.title}</h4>
                <p className="date">{event.date}</p>
              </div>
              <span className="arrow">→</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ExhibitionsSection;