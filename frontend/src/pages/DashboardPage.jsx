// frontend/src/pages/DashboardPage.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../components/dashboardComp/LeftSidebar.jsx';
import DashboardHeader from '../components/dashboardComp/DashboardHeader.jsx';
import ChatPopup from '../components/dashboardComp/ChatPopup.jsx';
import CreatePost from '../components/dashboardComp/CreatePostModal.jsx';
import { HeaderProvider } from '../context/HeaderProvider.jsx';
import { EventRsvpProvider } from '../context/EventRsvpContext.jsx';
import { SocketProvider } from '../context/SocketProvider.jsx';

const DashboardPage = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const handleOpenPostModal = () => setIsCreatePostOpen(true);

  return (
    <SocketProvider>
      <div className="flex h-screen bg-gray-100">
        <LeftSidebar onOpenCreatePost={handleOpenPostModal} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <HeaderProvider>
            {(headerContent) => (
              <>
                <DashboardHeader dynamicContent={headerContent} />
                
                <div className="flex-1 overflow-y-auto p-6">
                  <EventRsvpProvider>
                    <Outlet context={{ onOpenCreatePost: handleOpenPostModal }} />
                  </EventRsvpProvider>
                </div>
              </>
            )}
          </HeaderProvider>
        </div>

        <ChatPopup />

        {isCreatePostOpen && (
          <CreatePost onClose={() => setIsCreatePostOpen(false)} />
        )}
      </div>
    </SocketProvider>
  );
};

export default DashboardPage;