// frontend/src/components/homeComp/MainFeed.jsx
import React, { useState, useEffect } from 'react';
import PostCard from './PostCard.jsx';
import { Image, MapPin, AtSign } from 'lucide-react';
import { useSocket } from '../../hooks/useSocket.jsx'; 

const MainFeed = ({ onOpenCreatePost }) => { 
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const socket = useSocket();
  useEffect(() => {
    const fetchPosts = async () => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const token = userInfo ? userInfo.token : null;

      if (!token) {
        setError('Anda harus login untuk melihat postingan.');
        setIsLoading(false);
        return;
      }
      
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Gagal mengambil data postingan.');
        }

        const data = await response.json();
        setPosts(data); // Simpan data dari API ke state
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []); // Hanya jalankan sekali saat mount

  // 4. Efek untuk mendengarkan event 'new_post' dari socket
  useEffect(() => {
    if (!socket) return; // Tunggu sampai socket terhubung

    // Fungsi untuk menangani postingan baru
    const handleNewPost = (newPost) => {
      // Tambahkan postingan baru ke atas daftar
      setPosts(currentPosts => [newPost, ...currentPosts]);
    };

    // Mulai mendengarkan
    socket.on('new_post', handleNewPost);
    return () => {
      socket.off('new_post', handleNewPost);
    };
  }, [socket]); // Jalankan ulang efek ini jika 'socket' berubah

  const createPostBox = (
      <div className="bg-white rounded-lg shadow border p-4 mb-5">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-gray-300 flex-shrink-0"></div>
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

const tabs = (
    <div className="flex space-x-4 mb-4">
      <button className="font-medium text-sm text-[#3a9bdc] border-b-2 border-[#3a9bdc] pb-2">
        For you
      </button>
      <button className="font-medium text-sm text-gray-500 hover:text-gray-800 pb-2">
        Recent
      </button>
      <button className="font-medium text-sm text-gray-500 hover:text-gray-800 pb-2">
        Nearby
      </button>
      <button className="font-medium text-sm text-gray-500 hover:text-gray-800 pb-2">
        Trending
      </button>
    </div>
  );

  let content;
  if (isLoading) {
    content = <p className="text-gray-500 text-center">Loading posts...</p>;
  } else if (error) {
    content = <p className="text-red-500 text-center">{error}</p>;
  } else if (posts.length === 0) {
    content = <p className="text-gray-500 text-center">No posts yet. Be the first!</p>;
  } else {
    content = posts.map(post => (
      // Gunakan '_id' dari MongoDB sebagai key
      <PostCard key={post._id} post={post} />
    ));
  }

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