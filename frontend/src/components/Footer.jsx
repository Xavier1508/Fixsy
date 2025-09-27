import React from 'react';
import logoImg from '../assets/images/logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-gray-600 font-medium py-12 px-4">
      <div className="container mx-auto text-center">
        <img src={logoImg} alt="Fixsy Logo" className="h-12 w-auto mx-auto mb-4" />
        <p className="max-w-md mx-auto mb-6 text-gray-500">
          Connecting neighbors to build stronger, more helpful communities.
        </p>
        <div className="flex justify-center space-x-20 mb-7">
          <a href="#" className="hover:text-[#3a9bdc]">About</a>
          <a href="#" className="hover:text-[#3a9bdc]">Services</a>
          <a href="#" className="hover:text-[#3a9bdc]">Contact</a>
          <a href="#" className="hover:text-[#3a9bdc]">Privacy Policy</a>
        </div>
        <div className="border-t border-gray-700 pt-6 text-sm text-gray-400">
          &copy; {currentYear} Fixsy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;