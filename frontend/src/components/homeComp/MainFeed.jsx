import React, { useState, useEffect } from 'react';
import PostCard from './PostCard.jsx';
import { Image, MapPin, AtSign } from 'lucide-react';

const MainFeed = ({ onOpenCreatePost }) => { 
  const [posts, setPosts] = useState([]);
  
  useEffect(() => {
    setPosts([
      { id: 1, user: { name: 'Thomas P.', location: 'Dalton' }, timestamp: '1h ago', content: 'Any reliable HVAC people still taking new customers? I need my direct vent gas boiler serviced and a small plumbing repair.', comments: 2, likes: 0 },
      { id: 2, user: { name: 'MaryAnn H.', location: 'Woodcrest' }, timestamp: '3h ago', content: 'Looking for a reliable, reasonably priced arborist for tree work. Any recommendations?', comments: 10, likes: 2 },
    ]);
  }, []);

  return (
    <div>
      <div className="bg-white rounded-lg shadow border p-4 mb-5">
        <div className="flex items-center space-x-3">
          <div className="h-9 w-9 rounded-full bg-gray-300 flex-shrink-0"></div>
          <button 
            onClick={onOpenCreatePost}
            className="w-full text-left bg-gray-100 rounded-full py-2 px-4 text-gray-600 hover:bg-gray-200 text-sm">
            What's on your mind, neighbor?
          </button>
        </div>
        <div className="flex justify-around items-center mt-3 pt-3 border-t">
          <button onClick={onOpenCreatePost} className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc] text-sm font-medium">
            <Image className="h-5 w-5" /> <span>Photo</span>
          </button>
          <button onClick={onOpenCreatePost} className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc] text-sm font-medium">
            <MapPin className="h-5 w-5" /> <span>Location</span>
          </button>
          <button onClick={onOpenCreatePost} className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc] text-sm font-medium">
            <AtSign className="h-5 w-5" /> <span>Tag</span>
          </button>
        </div>
      </div>
      
      <div className="flex space-x-4 mb-4">
        <button className="font-medium text-sm text-[#3a9bdc] border-b-2 border-[#3a9bdc] pb-2">For you</button>
        <button className="font-medium text-sm text-gray-500 hover:text-gray-800 pb-2">Recent</button>
        <button className="font-medium text-sm text-gray-500 hover:text-gray-800 pb-2">Nearby</button>
        <button className="font-medium text-sm text-gray-500 hover:text-gray-800 pb-2">Trending</button>
      </div>

      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500 text-center">No posts yet. Be the first!</p>
        )}
      </div>
    </div>
  );
};

export default MainFeed;