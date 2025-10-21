import React from "react";
import DotMenu from "./DotMenu";
import "../../styles/HomePage/hero.css";

const HeroSection: React.FC = () => {
  return (
    <div className="hero-section">
      <DotMenu />
      <div className="hero-overlay">
        <h1>THE COST OF ART IN THE RENAISSANCE</h1>
        <button
          className="explore-btn"
          onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
        >
          EXPLORE NOW!
        </button>
        <div className="scroll-icon">↓</div>
      </div>
      <div className="hero-fade" />
    </div>
  );
};

export default HeroSection;