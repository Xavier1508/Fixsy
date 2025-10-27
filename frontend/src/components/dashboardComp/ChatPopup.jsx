// frontend/src/components/dashboardComp/ChatPopup.jsx
import React, { useState } from 'react';
import { MessageSquare, ChevronDown, ChevronUp, Edit } from 'lucide-react';
import CreateChatModal from './CreateChatModal.jsx'; // Kita buat file ini selanjutnya

const chats = [
  // Dummy data
  { id: 1, name: 'Cathy Smith M.', message: 'This message was removed...', time: '1w', avatar: 'C' },
  { id: 2, name: 'John Doe', message: 'Sounds good, see you then!', time: '2d', avatar: 'J' },
  { id: 3, name: 'Fixsy Team', message: 'Welcome to Fixsy!', time: '1w', avatar: 'F' },
];

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCreatingChat, setIsCreatingChat] = useState(false);
  const [activeTab, setActiveTab] = useState('All'); // 'All', 'DMs', 'For Sale'

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-0 right-24 z-40 flex items-center justify-between w-80 px-4 py-3 bg-white border border-gray-300 rounded-t-lg shadow-lg cursor-pointer hover:bg-gray-50"
      >
        <div className="flex items-center space-x-2">
          <MessageSquare className="h-5 w-5 text-gray-700" />
          <span className="font-semibold text-gray-800">Chats</span>
        </div>
        <ChevronUp className="h-5 w-5 text-gray-600" />
      </button>
    );
  }

  return (
    <>
      <div className="fixed bottom-0 right-24 z-40 w-80 h-[450px] bg-white border border-gray-300 rounded-t-lg shadow-2xl flex flex-col">
        {/* Header Chat */}
        <div className="flex items-center justify-between p-3 border-b">
          <span className="font-semibold text-gray-800 text-lg">Chats</span>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setIsCreatingChat(true)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <Edit className="h-5 w-5" />
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full text-gray-600 hover:bg-gray-100"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex p-2 space-x-2 border-b">
          <button 
            onClick={() => setActiveTab('All')}
            className={`px-4 py-1 rounded-full text-sm font-medium ${activeTab === 'All' ? 'bg-[#e0f2fe] text-[#3a9bdc]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All
          </button>
          <button 
            onClick={() => setActiveTab('DMs')}
            className={`px-4 py-1 rounded-full text-sm font-medium ${activeTab === 'DMs' ? 'bg-[#e0f2fe] text-[#3a9bdc]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            DMs
          </button>
          <button 
            onClick={() => setActiveTab('For Sale')}
            className={`px-4 py-1 rounded-full text-sm font-medium ${activeTab === 'For Sale' ? 'bg-[#e0f2fe] text-[#3a9bdc]' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            For Sale
          </button>
        </div>

        {/* Daftar Chat */}
        <div className="flex-1 overflow-y-auto p-2">
          {chats.map(chat => (
            <div key={chat.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
              <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold text-gray-600 flex-shrink-0">
                {chat.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <h4 className="font-semibold text-sm text-gray-800 truncate">{chat.name}</h4>
                  <span className="text-xs text-gray-400">{chat.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">{chat.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Panggil Modal Create Chat */}
      {isCreatingChat && <CreateChatModal onClose={() => setIsCreatingChat(false)} />}
    </>
  );
};

export default ChatPopup;