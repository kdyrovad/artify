import React, { useEffect, useState } from "react";
import HeaderSection from "../components/HomePage/Header";
import HeroSection from "../components/HomePage/HeroSection";
import CarouselSection from "../components/HomePage/CarouselSection";
import NavCardsSection from "../components/HomePage/NavCardsSection";
import ExhibitionsSection from "../components/HomePage/ExhibitionsSection";
import NewsletterSection from "../components/HomePage/NewsletterSection";
import Footer from "../components/HomePage/Footer";

const Home: React.FC = () => {

  return (
    <>
      <HeaderSection />
      <HeroSection />
      <CarouselSection />
      <NavCardsSection />
      <ExhibitionsSection />
      <NewsletterSection />
      <Footer />
    </>
  );
};

export default Home;