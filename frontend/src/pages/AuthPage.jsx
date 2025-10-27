// frontend/src/pages/AuthPage.jsx
import React from 'react';
import LoginSection from '../components/authpageComp/LoginSection.jsx';
import RegisterSection from '../components/authpageComp/RegisterSection.jsx';
import Navbar from '../components/Navbar.jsx'; 
import Footer from '../components/Footer.jsx';

const AuthPage = ({ mode }) => {
  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12">
        {mode === 'login' ? <LoginSection /> : <RegisterSection />}
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;