import React from "react";
import "../../styles/HomePage/header.css";

const HeaderSection: React.FC = () => {
  return (
    <header className="home-header">
    <div className="logo-container">
      <img src="/assets/logo.png" alt="The Art Gallery Logo" className="header-logo" />
    </div>
  </header>
  );
};

export default HeaderSection;