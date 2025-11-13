import React from 'react';
import { Send } from 'lucide-react';

// Komponen placeholder untuk komentar
const EventComments = () => {
  const dummyComment = {
    id: 1,
    user: { name: 'Amy Leat', avatar: 'https://placehold.co/32x32/fecdd3/b91c1c?text=A' },
    timestamp: '2d',
    content: 'Very excited to attend!'
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <h4 className="font-semibold text-sm text-gray-800 mb-3">1 comment</h4>
      
      {/* Daftar Komentar */}
      <div className="flex space-x-3 mb-4">
        <img src={dummyComment.user.avatar} alt={dummyComment.user.name} className="h-8 w-8 rounded-full" />
        <div className="flex-1">
          <div className="bg-gray-100 rounded-lg p-3">
            <span className="font-semibold text-gray-900 text-sm">{dummyComment.user.name}</span>
            <p className="text-sm text-gray-800">{dummyComment.content}</p>
          </div>
          <div className="flex space-x-3 text-xs text-gray-500 mt-1">
            <span>{dummyComment.timestamp}</span>
            <button className="font-medium hover:underline">Reply</button>
            <button className="font-medium hover:underline">Share</button>
          </div>
        </div>
      </div>

      {/* Input Komentar Baru */}
      <div className="flex space-x-3 items-center">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex-shrink-0"></div>
        <div className="flex-1 relative">
          <input 
            type="text"
            placeholder="Write a comment..."
            className="w-full text-sm bg-gray-100 rounded-full py-2 px-4 pr-10 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full text-gray-500 hover:text-blue-600">
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventComments;