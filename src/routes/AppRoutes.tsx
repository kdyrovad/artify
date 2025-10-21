// src/routes/AppRoutes.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ArtworkDetail from "../pages/ArtworkDetail";
import ArtistDetail from "../pages/ArtistDetail";
import CategoryView from "../pages/CategoryView";
import Categories from "../pages/Categories";
import Artists from "../pages/Artists";
import Collections from "../pages/Collections";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/artwork/:id" element={<ArtworkDetail />} />
    <Route path="/artist/:id" element={<ArtistDetail />} />
    <Route path="/category/:slug" element={<CategoryView />} />
    <Route path="/categories" element={<Categories />} />
    <Route path="/artists" element={<Artists />} />
    <Route path="/collections" element={<Collections />} />
  </Routes>
);

export default AppRoutes;