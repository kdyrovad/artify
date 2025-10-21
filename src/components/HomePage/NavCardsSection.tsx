import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage/navcards.css";

const NavCardsSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="section-wrapper nav-cards-section">
      <div className="nav-card" onClick={() => navigate("/categories")}>
        <div className="nav-card-overlay">
          <span className="nav-tag">Genres</span>
          <h3>Browse by Category</h3>
          <p>Explore Impressionism, Sculpture, Abstract Art, and more.</p>
        </div>
        <img src="/assets/nav-categories.jpg" alt="Browse Categories" />
      </div>

      <div className="nav-card" onClick={() => navigate("/artists")}>
        <div className="nav-card-overlay">
          <span className="nav-tag">Artists</span>
          <h3>Featured Artists</h3>
          <p>Discover the minds behind the masterpieces.</p>
        </div>
        <img src="/assets/nav-artists.jpg" alt="Featured Artists" />
      </div>

      <div className="nav-card" onClick={() => navigate("/collections")}>
        <div className="nav-card-overlay">
          <span className="nav-tag">Curated</span>
          <h3>Curated Collections</h3>
          <p>Handpicked themes and art experiences.</p>
        </div>
        <img src="/assets/nav-collections.jpg" alt="Curated Collections" />
      </div>
    </div>
  );
};

export default NavCardsSection;