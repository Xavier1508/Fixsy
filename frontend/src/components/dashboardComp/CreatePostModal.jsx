// frontend/src/components/dashboardComp/CreatePost.jsx
import React, { useState } from 'react';
import { X, Globe, Image, MapPin, AtSign, ShoppingBag, Calendar, BarChart } from 'lucide-react';
import { GiPumpkin } from "react-icons/gi";

const CreatePost = ({ onClose }) => {
  const [postType, setPostType] = useState('text'); // 'text', 'sell', 'event', 'poll'

  const PostTypeButton = ({ icon: Icon, label, type }) => (
    <button 
      onClick={() => setPostType(type)}
      className={`flex flex-col items-center justify-center p-4 w-full rounded-lg transition-colors ${
        postType === type ? 'bg-[#e0f2fe] text-[#3a9bdc]' : 'bg-gray-100 hover:bg-gray-200'
      }`}
    >
      <Icon className="h-8 w-8 mb-2" />
      <span className="font-semibold text-sm text-center">{label}</span>
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl grid grid-cols-1 md:grid-cols-3">
        
        {/* Kolom Kiri: Editor Teks */}
        <div className="md:col-span-2 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-300"></div>
              <div>
                <h4 className="font-semibold">Xavier Renjiro</h4>
                <button className="flex items-center text-sm text-gray-500 border rounded-full px-2 py-0.5 hover:bg-gray-100">
                  <Globe className="h-4 w-4 mr-1" /> Anyone
                </button>
              </div>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          {/* Text Area */}
          <textarea 
            placeholder="What's on your mind, neighbor?"
            className="w-full h-40 p-2 border-none focus:ring-0 resize-none text-lg"
          ></textarea>

          {/* Tombol Aksi Bawah */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#3a9bdc]">
                <Image className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#3a9bdc]">
                <MapPin className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-[#3a9bdc]">
                <AtSign className="h-6 w-6" />
              </button>
            </div>
            <button className="py-2 px-6 rounded-full bg-[#3a9bdc] text-white font-bold hover:bg-[#2582c0]">
              Post
            </button>
          </div>
        </div>

        {/* Kolom Kanan: Tipe Postingan */}
        <div className="bg-gray-50 p-6 rounded-r-lg border-l">
          <h3 className="font-bold text-lg mb-4 text-gray-800">Create something</h3>
          <div className="space-y-3">
            <PostTypeButton icon={GiPumpkin} label="Add to the Treat Map" type="treat" />
            <PostTypeButton icon={ShoppingBag} label="Sell or give away" type="sell" />
            <PostTypeButton icon={Calendar} label="Create an event" type="event" />
            <PostTypeButton icon={BarChart} label="Poll your neighbors" type="poll" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;