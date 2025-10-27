import React from 'react';
import Navbar from '../components/Navbar.jsx';
import HeroSection from '../components/landingpageComp/HeroSection.jsx'; 
import FeaturesSection from '../components/landingpageComp/FeaturesSection.jsx';
import Footer from '../components/Footer.jsx';
import ServicesSection from '../components/landingpageComp/ServicesSection.jsx';

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;