import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/HomePage/carousel.css";
import { fetchArtworks } from "../../api/artsy";

const CarouselSection: React.FC = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [artworks, setArtworks] = useState<any[]>([]);

  useEffect(() => {
    const cached = sessionStorage.getItem("popularArtworks");

    if (cached) {
      setArtworks(JSON.parse(cached));
    } else {
      fetchArtworks().then((data) => {
        setArtworks(data);
        sessionStorage.setItem("popularArtworks", JSON.stringify(data));
      });
    }
  }, []);

  const scrollLeft = () => {
    carouselRef.current?.scrollBy({ left: -600, behavior: "smooth" });
  };
  const scrollRight = () => {
    carouselRef.current?.scrollBy({ left: 600, behavior: "smooth" });
  };

  return (
    <>
      <h2 className="carousel-title">THE MOST POPULAR PAINTINGS</h2>
      <p className="carousel-subtitle">This was one of the most accomplished paintings of his generation...</p>

      <div className="carousel-wrapper">
        <button className="carousel-arrow left" onClick={scrollLeft}>←</button>
        <div className="carousel-track" ref={carouselRef}>
          {artworks.map((art) => (
            <div
              className="carousel-card"
              key={art.id}
              onClick={() => navigate(`/artwork/${art.id}`)}
            >
              <img src={art._links.image.href.replace("{image_version}", "large")} />
              <div className="card-overlay">
                <div className="artist-info">
                  <div>
                    <h4>{art.artist?.name || "Unknown Artist"}</h4>
                    <p className="artist-years">1620–1675</p>
                  </div>
                </div>
                <div className="art-title-block">
                  <h3>{art.title}</h3>
                  <p className="date">{art.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="carousel-arrow right" onClick={scrollRight}>→</button>
      </div>
    </>
  );
};

export default CarouselSection;