import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../api/artsy";
import { useNavigate } from "react-router-dom";
// import "../styles/main.css";
import '../styles/base.css';
import '../styles/artists.css';

const Artists: React.FC = () => {
  const [artists, setArtists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchArtists() {
      setLoading(true);
      try {
        const token = await getToken();
  
        const res = await axios.get("https://api.artsy.net/api/artists?size=15", {
          headers: { "X-Xapp-Token": token },
        });
  
        const filteredArtists = res.data._embedded.artists.filter(
          (a: any) =>
            a.nationality &&
            a.nationality !== "Unknown" &&
            a._links.image?.href
        );
  
        setArtists(filteredArtists);
      } catch (error: any) {
        if (error.response?.status === 429) {
          alert("You're making too many requests too quickly. Please wait and try again.");
        } else {
          console.error("Error fetching artists:", error);
        }
      } finally {
        setLoading(false);
      }
    }
  
    fetchArtists();
  }, []);

  return (
    <div className="artists-page">
      <div className="artist-hero-banner">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h2 className="category-page-title">Featured Artists</h2>
        <p className="category-page-subtitle">
          Meet the creators behind the masterpieces — spanning genres, cultures, and time periods.
        </p>
      </div>
      <div className="container">
        {loading ? (
          <p className="loading-msg">🎨 Loading artists…</p>
          ) : (
          <div className="artist-grid">
            {artists.map((artist) => (
              <div
                key={artist.id}
                className="artist-card"
                onClick={() => navigate(`/artist/${artist.id}`)}
              >
                <div className="artist-img-wrapper">
                  {artist._links.image?.href ? (
                    <img
                      src={artist._links.image.href.replace("{image_version}", "square")}
                      alt={artist.name}
                      className="artist-img"
                    />
                  ) : (
                    <div className="no-image-placeholder">No image available</div>
                  )}
                  <div className="artist-overlay" />
                </div>
                <div className="artist-info">
                  <h4>{artist.name}</h4>
                  <p>
                    {artist.nationality}
                    {artist.birthday ? ` • Born ${artist.birthday}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Artists;