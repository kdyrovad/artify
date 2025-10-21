import React from "react";
import "../../styles/HomePage/footer.css";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <img src="/assets/logo.png" alt="The Art Gallery" />
        </div>

        <nav className="footer-nav">
          <button>Collection</button>
          <button>Ticket</button>
          <button>Tours</button>
          <button>News</button>
          <button>About Us</button>
        </nav>
      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <p>Copyright © 2025 The Art Gallery. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;