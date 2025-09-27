import React from 'react';
import heroBgImage from '../assets/images/banner1.jpg'; 
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative flex items-center justify-center h-screen bg-cover bg-center" style={{ backgroundImage: `url(${heroBgImage})` }}>
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">Discover your neighborhood</h1>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50">
            <FcGoogle className="mr-2 text-2xl" /> Continue with Google
          </button>
          <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-900 rounded-lg shadow-sm bg-black text-white font-medium hover:bg-gray-800">
            <FaApple className="mr-2 text-2xl" /> Continue with Apple
          </button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <form className="space-y-4">
          <div>
            <input type="email" placeholder="Email address" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <div>
            <input type="password" placeholder="Create a password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors">
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;