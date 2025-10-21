import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/HomePage/dotMenu.css";

const DotMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        open &&
        menuRef.current &&
        !(menuRef.current as any).contains(event.target) &&
        !(event.target as HTMLElement).closest(".dot-icon")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false); 
  };

  return (
    <div className="dot-menu-wrapper">
      <div className="dot-icon" onClick={() => setOpen(!open)}>
        <span />
        <span />
        <span />
        <span />
      </div>

      {open && (
        <div className="floating-menu aesthetic" ref={menuRef}>
          <ul>
            <li onClick={() => handleNavigate("/")}>Home</li>
            <li onClick={() => handleNavigate("/categories")}>Categories</li>
            <li onClick={() => handleNavigate("/artists")}>Artists</li>
            <li onClick={() => handleNavigate("/collections")}>Collections</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DotMenu;