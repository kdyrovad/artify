import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken } from "../api/artsy";
import { curatedCollections } from "../data/curatedCollections";
import '../styles/base.css';
import '../styles/collections.css';
import { useNavigate } from "react-router-dom";

type Artwork = {
  id: string;
  title: string;
  date: string;
  _links: {
    image?: { href: string };
  };
};

const Collections: React.FC = () => {
  const [collectionsData, setCollectionsData] = useState<
    { title: string; description: string; banner: string; artworks: Artwork[] }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const cached = sessionStorage.getItem("collectionsData");
    if (cached) {
      setCollectionsData(JSON.parse(cached));
      setLoading(false);
      return;
    }
  
    async function fetchCollections() {
      setLoading(true);
      const token = await getToken();
      const usedArtworkIds = new Set<string>();
  
      const result = await Promise.all(
        curatedCollections.map(async (collection) => {
          try {
            const res = await axios.get(
              `https://api.artsy.net/api/artworks?size=60&gene_id=${collection.geneId}`,
              {
                headers: { "X-Xapp-Token": token },
              }
            );
  
            const allArtworks: Artwork[] = res.data._embedded?.artworks || [];
  
            const uniqueArtworks = allArtworks.filter((art) => !usedArtworkIds.has(art.id));
  
            let selectedArtworks: Artwork[] = [];
  
            if (uniqueArtworks.length >= 5) {
              selectedArtworks = uniqueArtworks.slice(0, 5);
            } else {
              const remaining = 5 - uniqueArtworks.length;
              const fillers = allArtworks
                .filter((art) => !uniqueArtworks.includes(art)) 
                .slice(0, remaining);
  
              selectedArtworks = [...uniqueArtworks, ...fillers].slice(0, 5);
            }
  
            selectedArtworks.forEach((a) => usedArtworkIds.add(a.id));
  
            return {
              title: collection.title,
              description: collection.description,
              banner: collection.banner,
              artworks: selectedArtworks,
            };
          } catch (e) {
            console.warn(`Error while loading a collection ${collection.title}`, e);
            return {
              title: collection.title,
              description: collection.description,
              banner: collection.banner,
              artworks: [],
            };
          }
        })
      );
  
      setCollectionsData(result);
      sessionStorage.setItem("collectionsData", JSON.stringify(result));
      setLoading(false);
    }
  
    fetchCollections();
  }, []);

  return (
    <div className="collections-magazine">
        <div className="collections-hero">
            <button className="back-button" onClick={() => navigate(-1)}>
                ← Back
            </button>
            <div className="hero-content">
                <h1>Curated Collections</h1>
                <p>
                    A visual journey through distinct artistic movements and mediums — handpicked for you.
                </p>
            </div>
        </div>
      {loading ? (
        <p className="loading-msg">🖼️ Loading collections...</p>
      ) : (
        collectionsData.map(({ title, description, banner, artworks }) => (
          <div key={title} className="magazine-collection">
            <div
              className="collection-banner"
              style={{
                backgroundImage: `url(${banner})`,
              }}
            >
              <div className="banner-overlay">
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
            </div>

            <div className="magazine-artworks">
              {artworks.map((art) => (
                <div 
                  key={art.id} 
                  className="artwork-preview-card"
                  onClick={() => navigate(`/artwork/${art.id}`)}
                >
                  {art._links.image?.href ? (
                    <img
                      src={art._links.image.href.replace("{image_version}", "square")}
                      alt={art.title}
                    />
                  ) : (
                    <div className="no-image-placeholder">No image</div>
                  )}
                  <div className="preview-meta">
                    <p className="preview-title">{art.title}</p>
                    <p className="preview-date">{art.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Collections;