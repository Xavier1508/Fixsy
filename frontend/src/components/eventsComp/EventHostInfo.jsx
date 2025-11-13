import React, { useState } from 'react';
import { Globe } from 'lucide-react';

// Fungsi untuk mempersingkat teks
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, text.lastIndexOf(' ', maxLength)) + '...';
};

const EventHostInfo = ({ host, description }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxLength = 200;
  
  const isLongText = description.length > maxLength;
  const displayText = isExpanded ? description : truncateText(description, maxLength);

  return (
    <div className="mb-4">
      {/* Bagian Info Host (Avatar + Teks) */}
      <div className="flex space-x-3">
        <img src={host.avatar} alt={host.name} className="h-10 w-10 rounded-full" />
        <div>
          <span className="font-semibold text-gray-900 text-sm block">{host.name}</span>
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
            <span>
                {host.location} · {host.timestamp}&nbsp;·&nbsp;
            </span>
            <Globe className="h-3.5 w-3.5" />
            </div>
        </div>
      </div>
      
      {/* Bagian Deskripsi dengan "more..." / "less..." */}
      <p className="text-gray-800 text-sm mt-3 whitespace-pre-line">
        {displayText}
      </p>

      {/* Tombol More/Less */}
      {isLongText && !isExpanded && (
        <button 
          onClick={() => setIsExpanded(true)}
          className="text-sm font-medium text-gray-600 hover:underline mt-1"
        >
          more...
        </button>
      )}
      {isLongText && isExpanded && (
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-sm font-medium text-gray-600 hover:underline mt-1"
        >
          less
        </button>
      )}
    </div>
  );
};

export default EventHostInfo;