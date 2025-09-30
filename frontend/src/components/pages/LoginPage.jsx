import React from 'react'
import {Link} from "react-router-dom";
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

const LoginPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className='bg-white p-8 shadow-2xl rounded-lg w-full max-w-md'>
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white-500">Sign In</h1>
          <p className="text-gray-400 mt-2">Access your Fixsy account</p>
        </div>

        <form>
          <div className="mb-4">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="email">
              Email
            </label>
            <input 
              id="email"
              type="email" 
              placeholder="you@example.com"
              className="w-full p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-sm mb-2" htmlFor="password">
              Password
            </label>
            <input 
              id="password"
              type="password" 
              placeholder="••••••••"
              className="w-full p-3 bg-gray-700 rounded-md text-white border border-gray-600 focus:outline-none focus:border-cyan-400"
            />
          </div>
          
          <button type="submit" className="w-full bg-cyan-500 text-white font-bold py-3 rounded-md hover:bg-cyan-600 transition-colors">
            SIGN IN
          </button>

          <div className="my-6 flex items-center" >
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>  
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50">
              <FcGoogle className="mr-2 text-2xl" /> Continue with Google
            </button>
            <button className="w-full flex items-center justify-center py-3 px-4 border border-gray-900 rounded-lg shadow-sm bg-black text-white font-medium hover:bg-gray-800">
              <FaApple className="mr-2 text-2xl" /> Continue with Apple
            </button>
          </div>
        </form>

        <div className="text-center mt-6">
          <p className="text-gray-400">
            New here?{' '}
            <Link to="/register" className="text-cyan-400 hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
      
    </div>
  )
}

export default LoginPage
