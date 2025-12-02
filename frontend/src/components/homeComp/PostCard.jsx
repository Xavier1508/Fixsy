import React from 'react';
import { ThumbsUp, MessageSquare, Send, MoreHorizontal, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import axios from "axios";

const BACKEND_URL = 'http://localhost:5000';

const PostCard = ({ post, onLike }) => {
  const [showMenu, setShowMenu] = React.useState(false);
  const user = post.user || { firstName: 'User', lastName: 'Name', profilePicture: null };
  const userName = `${user.firstName} ${user.lastName}`;
  
  const userInitial = user.firstName ? user.firstName.charAt(0) : '?';
  const userAvatar = user.profilePicture ? `${BACKEND_URL}${user.profilePicture}` : null;
  
  const timeAgo = post.createdAt
    ? formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })
    : 'just now';

  const handleLike = async () => {
  try {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    const res = await axios.put(`${BACKEND_URL}/api/posts/${post._id}/like`,
      {},
      { headers: { Authorization: `Bearer ${userInfo.token}` } }
    );

    // 🚀 Update like tanpa refresh!
    onLike(post._id, res.data.likes);

  } catch (error) {
    console.error(error);
  }
};

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const userId = userInfo ? userInfo._id : null;
// cek apakah user sudah like
const isLiked = post.likes.includes(userId);


const handleDelete = async () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!userInfo) return;

  try {
    await axios.delete(`${BACKEND_URL}/api/posts/${post._id}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` }
    });

    onDelete(post._id);  // ➜ kasih tahu parent untuk hapus post dari list

  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="bg-white rounded-lg shadow border">
      {/* Header Postingan */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          {/* --- AVATAR DINAMIS POSTER --- */}
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="h-10 w-10 rounded-full object-cover" />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
              {userInitial}
            </div>
          )}
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
        <div className="relative">
  <button
    className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
    onClick={() => setShowMenu(!showMenu)}
  >
    <MoreHorizontal className="h-5 w-5" />
  </button>

  {showMenu && (
    <div className="absolute right-0 mt-2 bg-white shadow-md rounded-lg border w-32">
      {post.user._id === currentUserId && (
        <button
          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          onClick={handleDelete}
        >
          Delete
        </button>
      )}
    </div>
  )}
</div>
      </div>

      {/* Konten Postingan (Teks dan Gambar) */}
      <div className="p-4">
        {/* Tampilkan teks konten jika ada */}
        {post.content && (
          <p className="text-gray-700 mb-4">{post.content}</p>
        )}
        
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
          <button onClick={onLike} className={`flex items-center space-x-2 ${isLiked ? "text-[#3a9bdc]" : "text-gray-600"}  text-gray-600 hover:text-[#3a9bdc]`}>
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