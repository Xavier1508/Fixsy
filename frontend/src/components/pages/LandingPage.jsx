import React from 'react'
import Navbar from '../Navbar.jsx'
import HeroSection from '../HeroSection.jsx'
import FeaturesSection from '../FeaturesSection.jsx'
import Footer from '../Footer.jsx'
import ServicesSection from '../ServicesSection.jsx'

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
  )
}

export default LandingPage
