import React from 'react';
import { Link } from 'react-router-dom';

const BACKEND_URL = 'http://localhost:5000';

const ForSaleItemCard = ({ item }) => {
  // 1. Logika API (dari backend)
  const isFree = item.isFree;
  const displayPrice = isFree ? 'FREE' : `$${item.price}`;
  const imageUrl = item.images && item.images.length > 0 
    ? `${BACKEND_URL}${item.images[0]}`
    : 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy';

  // 2. Style Asli Anda DIKEMBALIKAN (border, shadow-md)
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden group">
      {/* 3. Link ke Halaman Detail (menggunakan item._id dari API) */}
      <Link to={`/dashboard/forsale/${item._id}`} className="block">
        <div className="w-full h-40 bg-gray-200">
          <img 
            src={imageUrl} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy'; }}
          />
        </div>
        <div className="p-3">
          <h4 
            className={`font-semibold text-lg ${isFree ? 'text-green-600' : 'text-gray-800'}`}
          >
            {displayPrice}
          </h4>
          <p className="text-sm text-gray-700 truncate group-hover:underline" title={item.title}>
            {item.title}
          </p>
          {/* 4. Menggunakan 'item.location' dari API */}
          <p className="text-xs text-gray-500 mt-1">{item.location}</p>
        </div>
      </Link>
    </div>
  );
};

export default ForSaleItemCard;