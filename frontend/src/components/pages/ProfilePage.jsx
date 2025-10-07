import React from 'react';
import { profile } from '../../constant/index.jsx';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { AiFillDollarCircle } from "react-icons/ai";

function ProfilePage() {
  const navigate = useNavigate();
  const user = profile[0];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-8 py-4 bg-gray-180 shadow-sm">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Fixsy Logo" className="w-10 h-10 object-contain" />
          <h1 className="text-2xl font-bold text-blue-600">Fixsy</h1>
        </div>
        <div className="flex-1"></div>
        <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">
          Back
        </button>
      </header>

      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-6 shadow-lg bg-white">
          <h1 className="text-2xl font-bold mb-6 border-b pb-2">Profile</h1>
          <div className="flex flex-col items-center w-full space-y-4">
            <img src={user.profilePicture} alt="Profile" className="w-32 h-32 rounded-full object-cover mb-4 shadow-md"/>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Full Name</label>
              <input type="text" value={user.name} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none"/>
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Email</label>
              <input type="text" value={user.email} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none"/>
            </div>
            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Phone</label>
              <input type="text" value={user.phone} readOnly className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none"/>
            </div>

            <div className="w-full">
              <label className="block text-gray-700 font-medium mb-1">Address</label>
              <textarea value={user.address} readOnly rows="2" className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none resize-none"></textarea>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="w-full md:w-2/3 p-6 shadow-lg bg-gray-50 space-y-8">
          <div id='about'>
            <h1 className="text-2xl font-bold mb-4 border-b pb-2">About</h1>
            <p className="text-gray-700 leading-relaxed">
                Saya ingin berkontribusi bagi lingkungan sekitar dengan memanfaatkan keahlian saya dalam merawat hewan, perbaikan listrik ringan, dan bantuan rumah tangga, sambil mencari pengalaman dan penghasilan tambahan.
            </p>
          </div>

          <div id='skill'>
            <h1 className="text-2xl font-bold mb-4 border-b pb-2">Skills</h1>
            <div className="flex flex-wrap gap-2">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                Pet Care
              </span>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                Electrical Fix
              </span>
              <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                Moving Assistance
              </span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                Cleaning
              </span>
            </div>
          </div>

          <div id='history'>
            <h1 className="text-2xl font-bold mb-6 border-b pb-2">History</h1>
            <div className="space-y-4">
              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col relative">
                <div className="absolute top-2 right-3 px-0 py-1 rounded-md flex items-center justify-center space-x-1 text-green-600">
                        <AiFillDollarCircle className='text-xl' />
                </div>
                <div className=''>
                    <p className="font-semibold">Jaga Komodo</p>
                    <p className="text-sm text-gray-500">01 October 2025</p>
                </div>
                <div className='text-l text-end'>
                    <a href='' className="text-blue-700 underline">Details&gt;&gt;</a>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col relative">
                <div className="absolute top-2 right-3 px-0 py-1 rounded-md flex items-center justify-center space-x-1 text-green-600">
                        <AiFillDollarCircle className='text-xl' />
                </div>
                <div className=''>
                    <p className="font-semibold">Pasang Lampu</p>
                    <p className="text-sm text-gray-500">03 October 2025</p>
                </div>
                <div className='text-l text-end'>
                    <a href='' className="text-blue-700 underline">Details&gt;&gt;</a>
                </div>
              </div>

              <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col relative">
                <div className="absolute top-2 right-3 px-0 py-1 rounded-md flex items-center justify-center space-x-1 text-green-600">
                </div>
                <div className=''>
                    <p className="font-semibold">Bantu Pindah Rumah</p>
                    <p className="text-sm text-gray-500">01 October 2025</p>
                </div>
                <div className='text-l text-end'>
                    <a href='' className="text-blue-700 underline">Details&gt;&gt;</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
