import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "../api/artsy";
import '../styles/base.css';
import '../styles/artistDetail.css';

const ArtistDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState<any>(null);
  const [artworks, setArtworks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const token = await getToken();
    
        const [artistRes, artworksRes] = await Promise.all([
          axios.get(`https://api.artsy.net/api/artists/${id}`, {
            headers: { "X-Xapp-Token": token },
          }),
          axios.get(`https://api.artsy.net/api/artworks?size=12&artist_id=${id}`, {
            headers: { "X-Xapp-Token": token },
          }),
        ]);
    
        setArtist(artistRes.data);
        const fetched = artworksRes.data._embedded?.artworks || [];
        setArtworks(fetched);
      } catch (e: any) {
        console.error("Error fetching artist or artworks:", e);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  if (loading || !artist) {
    return (
      <>
        <div className="artist-header-banner">
          <button className="back-button" onClick={() => navigate(-1)}>
            ← Back
          </button>
          <h1 className="artist-page-title">Meet the Artist</h1>
        </div>
        <div className="container">
          <p className="loading-msg">🖼️ Loading artist details…</p>
        </div>
      </>
    );
  }

  return (
    <div className="container artist-detail-page">
      {/* Header and Back */}
      <div className="artist-header-banner">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <h1 className="artist-page-title">Meet the Artist</h1>
      </div>

      {/* Bio and Portrait */}
      <div className="artist-detail-header">
        {artist._links.image?.href ? (
          <img
            className="artist-detail-img"
            src={artist._links.image.href.replace("{image_version}", "square")}
            alt={artist.name}
          />
        ) : (
          <div className="no-image-placeholder">No image available</div>
        )}

        <div className="artist-detail-info">
          <h2>{artist.name}</h2>
          <p>
            {artist.nationality || "Unknown Nationality"}{" "}
            {artist.birthday
              ? `(${artist.birthday}${artist.deathday ? ` – ${artist.deathday}` : ""})`
              : ""}
          </p>
          {artist.biography ? (
            <p className="artist-bio">{artist.biography}</p>
          ) : (
            <p className="artist-bio">This artist has no biography available.</p>
          )}
        </div>
      </div>

      {/* Artworks */}
      <h3 className="section-title">Selected Artworks</h3>

      {Array.isArray(artworks) && artworks.length > 0 ? (
        <div className="artwork-grid">
          {artworks.map((art) => (
            <div
              key={art.id}
              className="artwork-card"
              onClick={() => navigate(`/artwork/${art.id}`)}
            >
              {art._links.image?.href ? (
                <img
                  src={art._links.image.href.replace("{image_version}", "large")}
                  alt={art.title}
                  className="artwork-img"
                />
              ) : (
                <div className="no-image-placeholder">No image</div>
              )}
              <div className="artwork-info">
                <h4>{art.title}</h4>
                <p>{art.date}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-artworks-fallback">
          <p>🧑‍🎨 This artist has no public artworks available at the moment.</p>
          <p style={{ fontSize: "0.9rem", color: "#999" }}>
            But you can still explore their biography and creative legacy above!
          </p>
        </div>
      )}
    </div>
  );
};

export default ArtistDetail;