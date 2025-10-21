import React from "react";
import "../../styles/HomePage/newsletter.css";

const NewsletterSection: React.FC = () => (
  <section className="newsletter-wrapper">
    <div className="newsletter-box">
      <h2 className="newsletter-title">Stay in the Loop</h2>
      <p className="newsletter-description">
        Be the first to know about exhibitions, featured collections, and artist spotlights.
      </p>

      <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
        <div className="newsletter-row">
          <input type="text" placeholder="First Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <input type="email" placeholder="Your Email Address" required />
        <div className="newsletter-submit">
          <label>
            <input type="checkbox" required />
            <span>I agree to the privacy policy</span>
          </label>
          <button type="submit" onClick={() => alert("Successfully added!")}>Subscribe →</button>
        </div>
      </form>
    </div>
  </section>
);

export default NewsletterSection;