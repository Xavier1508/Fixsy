import React, { useState } from 'react';
import { ChevronLeft, Home, MapPin, TreeDeciduous, Bird, Droplet, Users, Ticket, CheckCircle, Clock } from 'lucide-react'; // 1. Impor ChevronLeft

// 2. Terima 'onBack' sebagai prop
const YourEvents = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState('Interested');

  const renderTab = (label) => {
    const isActive = activeTab === label;
    return (
      <button
        key={label}
        onClick={() => setActiveTab(label)}
        className={`px-4 py-2 text-sm font-medium ${
          isActive
            ? 'text-blue-600 border-b-2 border-blue-600'
            : 'text-gray-600 hover:text-gray-800'
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    // 3. Gunakan 'max-w-7xl' agar konsisten dengan header
    <div className="w-full max-w-7xl mx-auto py-6">
      <div className="flex justify-between items-center mb-4">
        
        {/* 4. TAMBAHKAN JUDUL DENGAN TOMBOL KEMBALI */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={onBack} // Panggil fungsi onBack saat diklik
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h2 className="text-xl font-bold text-gray-900">Your events</h2>
        </div>
        
        <button className="bg-gray-800 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-gray-900">
          Create an event
        </button>
      </div>

      {/* 5. Navigasi tab (Interested, Going, dst.) */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-2">
          {['Interested', 'Going', 'Host', 'Invited', 'Past'].map(renderTab)}
        </nav>
      </div>

      {/* 6. Konten "No events yet" (dibuat 'max-w-3xl' agar terpusat) */}
      <div className="text-center py-16 px-6 bg-white rounded-lg border border-gray-200 max-w-6xl mx-auto">
        <div className="flex justify-center items-center space-x-4 text-gray-400 mb-6">
          <Home className="h-8 w-8" />
          <Users className="h-8 w-8" />
          <TreeDeciduous className="h-8 w-8" />
          <Bird className="h-8 w-8" />
          <Droplet className="h-8 w-8" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No events yet</h3>
        <p className="text-sm text-gray-600 mb-6">
          Bring neighbors together by hosting an event
        </p>
        <button className="bg-gray-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-gray-900">
          Create an event
        </button>
      </div>
    </div>
  );
};

export default YourEvents;