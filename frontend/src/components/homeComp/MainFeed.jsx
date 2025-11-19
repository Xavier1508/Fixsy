import React, { useState, useEffect } from 'react';
import PostCard from './PostCard.jsx';
import { Image, MapPin, AtSign } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket.jsx'; 

const BACKEND_URL = 'http://localhost:5000';

const MainFeed = ({ onOpenCreatePost }) => { 
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const token = userInfo ? userInfo.token : null;

  // 3. PERBAIKAN: Ambil 'profilePicture' dan 'firstName' langsung dari 'userInfo'
  const userAvatar = userInfo?.profilePicture 
    ? `${BACKEND_URL}${userInfo.profilePicture}` 
    : null;
  const userInitial = userInfo?.firstName 
    ? userInfo.firstName.charAt(0).toUpperCase() 
    : "?";

  const socket = useSocket();

  // Fetch posts dari API (Logika ini tetap sama)
  useEffect(() => {
    const fetchPosts = async () => {
      if (!token) {
        setError('Anda harus login untuk melihat postingan.');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch(`${BACKEND_URL}/api/posts`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) throw new Error('Gagal mengambil data postingan.');

        const data = await response.json();
        setPosts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [token]); // Tambahkan token sebagai dependensi

  // Socket listener (Logika ini tetap sama)
  useEffect(() => {
    if (!socket) return;
    const handleNewPost = (newPost) => {
      setPosts(current => [newPost, ...current]);
    };
    socket.on('new_post', handleNewPost);
    return () => socket.off('new_post', handleNewPost);
  }, [socket]);

  const createPostBox = (
    <div className="bg-white rounded-lg shadow border p-4 mb-5">
      <div className="flex items-center space-x-3">
        
        {userAvatar ? (
          <div className="h-10 w-10 rounded-full overflow-hidden flex-shrink-0">
            <img
              src={userAvatar}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
            {userInitial}
          </div>
        )}

        <button
          onClick={onOpenCreatePost}
          className="w-full text-left bg-gray-100 rounded-full py-2 px-4 text-gray-600 hover:bg-gray-200 text-sm"
        >
          What's on your mind, neighbor?
        </button>
      </div>

      <div className="flex justify-around items-center mt-3 pt-3 border-t">
        <button
          onClick={onOpenCreatePost}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc] text-sm font-medium"
        >
          <Image className="h-5 w-5" /> <span>Photo</span>
        </button>
        <button
          onClick={onOpenCreatePost}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc] text-sm font-medium"
        >
          <MapPin className="h-5 w-5" /> <span>Location</span>
        </button>
        <button
          onClick={onOpenCreatePost}
          className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc] text-sm font-medium"
        >
          <AtSign className="h-5 w-5" /> <span>Tag</span>
        </button>
      </div>
    </div>
  );


  // TABS (Tetap sama)
  const tabs = (
    <div className="flex space-x-4 mb-4">
      <button className="font-medium text-sm text-[#3a9bdc] border-b-2 border-[#3a9bdc] pb-2">
        For you
      </button>
      {/* ... tombol tab lainnya ... */}
    </div>
  );

  // CONTENT (Tetap sama)
  let content;
  if (isLoading) content = <p className="text-gray-500 text-center">Loading posts...</p>;
  else if (error) content = <p className="text-red-500 text-center">{error}</p>;
  else if (posts.length === 0) content = <p className="text-gray-500 text-center">No posts yet. Be the first!</p>;
  else content = posts.map(post => (
    <PostCard key={post._id} post={post} />
  ));


  return (
    <div>
      {createPostBox}
      {tabs}

      <div className="space-y-6">
        {content}
      </div>
    </div>
  );
};

export default MainFeed;