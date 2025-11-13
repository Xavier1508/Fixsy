import React from 'react';
import { ThumbsUp, MessageSquare, Share2 } from 'lucide-react';

const EventActions = () => {
  return (
    // Beri border-t untuk memisahkan dari konten di atas
    <div className="flex justify-around items-center border-t border-gray-200">
      <button className="flex-1 flex justify-center items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm font-medium py-3 rounded-lg">
        <ThumbsUp className="h-5 w-5" /> <span>Like</span>
      </button>
      <button className="flex-1 flex justify-center items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm font-medium py-3 rounded-lg">
        <MessageSquare className="h-5 w-5" /> <span>Comment</span>
      </button>
      <button className="flex-1 flex justify-center items-center space-x-2 text-gray-600 hover:text-blue-600 text-sm font-medium py-3 rounded-lg">
        <Share2 className="h-5 w-5" /> <span>Share</span>
      </button>
    </div>
  );
};

export default EventActions;