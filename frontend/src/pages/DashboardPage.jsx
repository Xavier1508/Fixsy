import React, { useState } from 'react';
import LeftSidebar from '../components/dashboardComp/LeftSidebar.jsx';
import MainFeed from '../components/dashboardComp/MainFeed.jsx';
import RightSidebar from '../components/dashboardComp/RightSidebar.jsx';
import DashboardHeader from '../components/dashboardComp/DashboardHeader.jsx';
import ChatPopup from '../components/dashboardComp/ChatPopup.jsx';
import CreatePost from '../components/dashboardComp/CreatePostModal.jsx';

const DashboardPage = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100">
      
      <LeftSidebar onOpenCreatePost={() => setIsCreatePostOpen(true)} />

      <div className="flex-1 flex flex-col overflow-hidden">
        
        <DashboardHeader />

        <div className="flex-1 overflow-y-auto">
          <div className="flex justify-center w-full max-w-5xl mx-auto p-6">
            
            <main className="flex-1 max-w-2xl">
              <MainFeed onOpenCreatePost={() => setIsCreatePostOpen(true)} />
            </main>

            <aside className="ml-6 hidden lg:block w-80">
              <RightSidebar />
            </aside>

          </div>
        </div>
      </div>

      <ChatPopup />

      {isCreatePostOpen && (
        <CreatePost onClose={() => setIsCreatePostOpen(false)} />
      )}
    </div>
  );
};

export default DashboardPage;