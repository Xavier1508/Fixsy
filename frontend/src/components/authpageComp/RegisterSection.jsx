// frontend/src/components/authpageComponents/RegisterSection.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

const RegisterSection = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { firstName, lastName, email, phoneNumber, password, confirmPassword } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password tidak cocok');
      return;
    }
    setMessage('');
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      
      const { data } = await axios.post(
        'http://localhost:5000/api/auth/register',
        { firstName, lastName, email, phoneNumber, password },
        config
      );

      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/');

    } catch (error) {
      setMessage(error.response?.data?.message || 'Terjadi kesalahan');
    }
  };

  return (
    <div className="bg-white p-8 shadow-2xl rounded-lg w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Register</h1>
        <p className="text-gray-500 mt-2">Create a new Fixsy account</p>
      </div>

      {message && <div className="text-red-500 text-center mb-4">{message}</div>}

      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="firstName">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm mb-2" htmlFor="lastName">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={onChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            placeholder="08123456789"
            value={phoneNumber}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm mb-2" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="••••••••"
            value={confirmPassword}
            onChange={onChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#3a9bdc] text-white font-bold py-3 rounded-md hover:bg-[#7abbe6] transition-colors"
        >
          REGISTER
        </button>

        <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-4 text-gray-500">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        <div className="space-y-3">
          <button type="button" className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50">
            <FcGoogle className="mr-2 text-2xl" /> Continue with Google
          </button>
          <button type="button" className="w-full flex items-center justify-center py-3 px-4 border border-gray-900 rounded-lg shadow-sm bg-black text-white font-medium hover:bg-gray-800">
            <FaApple className="mr-2 text-2xl" /> Continue with Apple
          </button>
        </div>
      </form>

      <div className="text-center mt-6">
        <p className="text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#3a9bdc] hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterSection;