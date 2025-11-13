import React from 'react';
import { Link } from 'react-router-dom';

const ForSaleItemCard = ({ item }) => {
  const isFree = item.price.toUpperCase() === 'FREE';
  
  // BORDER DIHAPUS. Hanya shadow dan rounded-lg
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden group">
      <Link to={`/dashboard/forsale/${item.id}`} className="block">
        <div className="w-full h-40 bg-gray-200">
          <img 
            src={item.image} 
            alt={item.title} 
            className="w-full h-full object-cover group-hover:opacity-90 transition-opacity"
            onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy'; }}
          />
        </div>
        <div className="p-3">
          <h4 
            className={`font-semibold text-lg ${isFree ? 'text-green-600' : 'text-gray-800'}`}
          >
            {item.price}
          </h4>
          <p className="text-sm text-gray-700 truncate group-hover:underline" title={item.title}>
            {item.title}
          </p>
          <p className="text-xs text-gray-500 mt-1">{item.location}</p>
        </div>
      </Link>
    </div>
  );
};

export default ForSaleItemCard;