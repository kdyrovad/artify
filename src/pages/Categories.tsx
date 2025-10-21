import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../api/artsy";
import { useNavigate } from "react-router-dom";
import '../styles/base.css';
import '../styles/categories.css';

const categoryTabs = [
    { id: "all", name: "All" },
    { id: "Sculpture", name: "Sculpture" },
    { id: "Photography", name: "Photography" },
    { id: "Painting", name: "Painting" },
    { id: "Drawing", name: "Drawing" },
    { id: "Printmaking", name: "Printmaking" }
  ];

const Categories: React.FC = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [artworks, setArtworks] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategoryData() {
      setArtworks([]); 
  
      const token = await getToken();
      try {
        let response;
  
        if (activeTab === "all") {
          response = await axios.get(
            `https://api.artsy.net/api/artworks?size=12`,
            { headers: { "X-Xapp-Token": token } }
          );
        } else {
          const encodedMedium = encodeURIComponent(activeTab);
          const url = `https://api.artsy.net/api/artworks?size=12&medium=${encodedMedium}`;
  
          console.log("Fetching:", url);
  
          response = await axios.get(url, {
            headers: { "X-Xapp-Token": token }
          });
        }
  
        const result = response.data._embedded?.artworks || [];
        console.log("Loaded", result.length, "artworks for", activeTab);
        setArtworks(result);
      } catch (err) {
        console.error("Failed to fetch artworks:", err);
        setArtworks([]);
      }
    }
  
    fetchCategoryData();
  }, [activeTab]);

  return (
    <div className="category-page">
      <div className="category-hero-banner">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="category-page-title">Explore Art</h2>
        <p className="category-page-subtitle">
          Explore a diverse range of styles, themes, and techniques brought to life by talented artists from around the globe.
        </p>
      </div>
      <div className="container">
        <div className="category-tabs">
          {categoryTabs.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`category-tab ${activeTab === cat.id ? "active" : ""}`}
            >
            {cat.name}
            </button>
          ))}
        </div>

        <div className="artwork-grid">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="artwork-card"
              onClick={() => navigate(`/artwork/${art.id}`)}
            >
              <img
                src={art._links.image.href.replace("{image_version}", "large")}
                alt={art.title}
                className="artwork-img"
              />
              <div className="artwork-info">
                <h4>{art.title}</h4>
                <p>{art.artist?.name || "Unknown Artist"}</p>
              </div>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;