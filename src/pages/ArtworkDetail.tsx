import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../api/artsy";
import "../styles/artworkDetail.css";

const ArtworkDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artwork, setArtwork] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArtwork() {
      const token = await getToken();
      try {
        const res = await axios.get(`https://api.artsy.net/api/artworks/${id}`, {
          headers: { "X-Xapp-Token": token },
        });
        setArtwork(res.data);
      } catch (err) {
        console.error("Failed to fetch artwork:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchArtwork();
  }, [id]);

  if (loading || !artwork) {
    return <div className="container"><p className="loading-msg">🎨 Loading artwork…</p></div>;
  }

  return (
    <div className="container artwork-detail-page">
      <div className="artwork-back-header">
        <button className="back-button-fancy" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>
  
      <div className="artwork-detail-hero">
        {artwork._links.image?.href ? (
          <img
            src={artwork._links.image.href.replace("{image_version}", "large")}
            alt={artwork.title}
            className="artwork-image-full"
          />
        ) : (
          <div className="no-image-placeholder">No image</div>
        )}
      </div>
  
      <div className="artwork-detail-info">
        <h1 className="artwork-title">{artwork.title}</h1>
        <p className="artwork-artist">{artwork.artist?.name || "Unknown Artist"}</p>
        <p className="artwork-date">{artwork.date || "Unknown Date"}</p>
  
        <div className="artwork-attributes">
          {artwork.medium && (
            <div className="attr-row">
              <span>Medium:</span>
              <span>{artwork.medium}</span>
            </div>
          )}
          {artwork.dimensions?.text && (
            <div className="attr-row">
              <span>Dimensions:</span>
              <span>{artwork.dimensions.text}</span>
            </div>
          )}
          {artwork.category && (
            <div className="attr-row">
              <span>Category:</span>
              <span>{artwork.category}</span>
            </div>
          )}
        </div>
  
        {artwork.blurb && (
          <div className="artwork-blurb">
            <h3>About this artwork</h3>
            <p>{artwork.blurb}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetail;