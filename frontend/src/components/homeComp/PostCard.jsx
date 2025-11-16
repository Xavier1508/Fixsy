// frontend/src/components/homeComp/PostCard.jsx
import React from 'react';
import { ThumbsUp, MessageSquare, Send, MoreHorizontal, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

// 1. Definisikan URL backend Anda di satu tempat
// Ini adalah tempat server Anda menyajikan folder 'uploads'
const BACKEND_URL = 'http://localhost:5000';

const PostCard = ({ post }) => {
  const user = post.user || { firstName: 'User', lastName: 'Name' };
  const userName = `${user.firstName} ${user.lastName}`;
  const userInitial = user.firstName ? user.firstName.charAt(0) : '?';
  
  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : 'just now';

  return (
    <div className="bg-white rounded-lg shadow border">
      {/* Header Postingan */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
            {userInitial}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{userName}</h4>
            <div className="flex items-center space-x-1.5 text-sm text-gray-500">
              {/* 2. Tampilkan Waktu */}
              <span>{timeAgo}</span>
              {/* 3. TAMPILKAN LOKASI JIKA ADA */}
              {post.location && (
                <>
                  <span>·</span>
                  <span className="flex items-center">
                    <MapPin className="h-3 w-3 mr-0.5" /> {post.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      {/* Konten Postingan (Teks dan Gambar) */}
      <div className="p-4">
        {/* Tampilkan teks konten jika ada */}
        {post.content && (
          <p className="text-gray-700 mb-4">{post.content}</p>
        )}
        
        {/* 4. TAMPILKAN GAMBAR JIKA ADA */}
        {post.media && post.media.length > 0 && (
          <div className="mt-2">
            <img 
              src={`${BACKEND_URL}${post.media[0]}`} 
              alt="Post media" 
              className="w-full max-h-[500px] object-contain rounded-2xl" 
            />
          </div>
        )}
      </div>

      {/* Tombol Aksi (Like, Comment) */}
      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc]">
            <ThumbsUp className="h-5 w-5" />
            <span className="font-medium text-sm">
              {post.likes.length > 0 ? post.likes.length : 'Like'}
            </span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc]">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium text-sm">
              {post.comments.length > 0 ? post.comments.length : 'Comment'}
            </span>
          </button>
        </div>
        <button className="text-gray-600 hover:text-[#3a9bdc]">
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default PostCard;