import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, MapPin, ChevronLeft, MoreHorizontal } from 'lucide-react';

const EventDetailHeader = ({ image, title, date, location }) => {
  const navigate = useNavigate();

  return (
    // 'relative' ditambahkan ke wrapper utama
    <div className="relative">
      
      {/* Tombol Kembali (Overlay) */}
      <button
        onClick={() => navigate(-1)} // Aksi kembali
        className="absolute top-4 left-4 z-10 bg-white bg-opacity-90 rounded-full p-2 text-gray-700 hover:bg-opacity-100"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Tombol Opsi Lainnya (Overlay) */}
      <button
        className="absolute top-4 right-4 z-10 bg-white bg-opacity-90 rounded-full p-2 text-gray-700 hover:bg-opacity-100"
      >
        <MoreHorizontal className="h-6 w-6" />
      </button>

      {/* Gambar Header */}
      <div className="w-full h-48 bg-gray-200">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      {/* Info Detail (Judul, Tanggal, Lokasi) */}
      <div className="p-4">
        <h1 className="text-xl font-bold text-gray-900 mb-3">{title}</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-700 mb-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>{date}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-700">
          <MapPin className="h-4 w-4 text-gray-500" />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
};

export default EventDetailHeader;