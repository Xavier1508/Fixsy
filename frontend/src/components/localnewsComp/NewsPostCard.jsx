import React from 'react';
import { ThumbsUp, MessageSquare, MoreHorizontal } from 'lucide-react';

// Buat folder baru: src/components/localnewsComp/
const NewsPostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      {/* Header Postingan */}
      <div className="p-4 flex justify-between items-start">
        <div className="flex space-x-3">
          <img 
            src={post.publisher.avatar} 
            alt={post.publisher.name} 
            className="h-10 w-10 rounded-full"
          />
          <div>
            <span className="font-semibold text-gray-900 text-sm">{post.publisher.name}</span>
            <span className="text-gray-500 text-xs block">Local publisher · {post.timestamp}</span>
          </div>
        </div>
        <button className="p-1 rounded-full text-gray-500 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Konten */}
      <div className="px-4 pb-3">
        <p className="text-gray-800">{post.content}</p>
      </div>

      {/* Gambar */}
      <div className="w-full bg-gray-200">
        <img src={post.imageUrl} alt="News post" className="w-full h-auto object-cover" />
      </div>

      {/* Tombol Aksi (Read article) */}
      <div className="p-4 border-t border-gray-200">
        <button className="text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg">
          Read article
        </button>
      </div>

      {/* Likes & Comments */}
      <div className="px-4 py-3 border-t border-gray-200 flex items-center space-x-6">
        <button className="flex items-center space-x-1.5 text-gray-600 hover:text-blue-600">
          <ThumbsUp className="h-5 w-5" />
          <span className="text-sm font-medium">{post.likes}</span>
        </button>
        <button className="flex items-center space-x-1.5 text-gray-600 hover:text-blue-600">
          <MessageSquare className="h-5 w-5" />
          <span className="text-sm font-medium">{post.comments}</span>
        </button>
      </div>
    </div>
  );
};

export default NewsPostCard;