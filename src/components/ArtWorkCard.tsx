import React from "react";

type Props = {
  imageUrl: string;
  title: string;
  artistName: string;
  onClick: () => void;
};

const ArtworkCard: React.FC<Props> = ({ imageUrl, title, artistName, onClick }) => (
  <div className="artwork-card" onClick={onClick}>
    <img src={imageUrl} alt={title} className="artwork-image" />
    <div className="card-body">
      <div className="card-title">{title}</div>
      <div className="card-text">{artistName}</div>
    </div>
  </div>
);

export default ArtworkCard;