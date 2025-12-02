import React, { useState } from 'react';
import heroBgImage from '../../assets/images/banner1.jpg'; 
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/auth/login", 
        { email, password }, 
        config
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      navigate("/dashboard");

    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <section
      className="relative flex items-center justify-center h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${heroBgImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-20"></div>

      <div className="relative z-10 bg-white p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Discover your neighborhood
        </h1>

        {message && (
          <div className="text-red-500 text-center mb-4">{message}</div>
        )}

        <form className="space-y-4" onSubmit={submitHandler}>
          <div>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300" />
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300" />
          </div>

          <div className="space-y-3">
            <button type="button" className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50">
              <FcGoogle className="mr-2 text-2xl" /> Continue with Google
            </button>
            <button type="button" className="w-full flex items-center justify-center py-3 px-4 border border-gray-900 rounded-lg shadow-sm bg-black text-white font-medium hover:bg-gray-800">
              <FaApple className="mr-2 text-2xl" /> Continue with Apple
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-4 py-3 px-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
