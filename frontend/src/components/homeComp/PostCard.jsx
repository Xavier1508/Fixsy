import React from 'react';
import { ThumbsUp, MessageSquare, Send, MoreHorizontal } from 'lucide-react';

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-lg shadow border">
      {/* Header Postingan */}
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600">
            {post.user.name.charAt(0)}
          </div>
          <div>
            <h4 className="font-semibold text-gray-800">{post.user.name}</h4>
            <p className="text-sm text-gray-500">{post.user.location} · {post.timestamp}</p>
          </div>
        </div>
        <button className="p-2 rounded-full text-gray-500 hover:bg-gray-100">
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="p-4">
        <p className="text-gray-700">{post.content}</p>
      </div>

      <div className="flex justify-between items-center p-4 border-t">
        <div className="flex space-x-6">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc]">
            <ThumbsUp className="h-5 w-5" />
            <span className="font-medium text-sm">
              {post.likes > 0 ? post.likes : 'Like'}
            </span>
          </button>
          <button className="flex items-center space-x-2 text-gray-600 hover:text-[#3a9bdc]">
            <MessageSquare className="h-5 w-5" />
            <span className="font-medium text-sm">
              {post.comments > 0 ? post.comments : 'Comment'}
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