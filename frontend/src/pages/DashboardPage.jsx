import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import LeftSidebar from '../components/dashboardComp/LeftSidebar.jsx';
import DashboardHeader from '../components/dashboardComp/DashboardHeader.jsx';
import ChatPopup from '../components/dashboardComp/ChatPopup.jsx';
import CreatePostModal from '../components/dashboardComp/CreatePostModal.jsx';
import { HeaderProvider } from '../context/HeaderProvider.jsx';
import { EventRsvpProvider } from '../context/EventRsvpContext.jsx';
import { SocketProvider } from '../context/SocketProvider.jsx';

// 1. Impor modal 'For Sale' yang baru
import CreateForSaleModal from '../components/forSaleComp/CreateForSaleModal.jsx';

const DashboardPage = () => {
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  // 2. State baru untuk modal 'For Sale'
  const [isCreateForSaleOpen, setIsCreateForSaleOpen] = useState(false);

  const handleOpenPostModal = () => setIsCreatePostOpen(true);

  // 3. Fungsi baru untuk membuka modal 'For Sale'
  const handleOpenForSaleModal = () => {
    setIsCreatePostOpen(false); // Tutup modal postingan
    setIsCreateForSaleOpen(true); // Buka modal for sale
  };

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
          <CreatePostModal 
            onClose={() => setIsCreatePostOpen(false)} 
            // 4. Kirim fungsi trigger baru sebagai prop
            onOpenForSaleModal={handleOpenForSaleModal} 
          />
        )}

        {/* 5. Render modal 'For Sale' secara kondisional */}
        {isCreateForSaleOpen && (
          <CreateForSaleModal 
            onClose={() => setIsCreateForSaleOpen(false)} 
            onListingCreated={() => {
              // (Opsional: kita bisa tambahkan refresh data di sini jika perlu)
            }}
          />
        )}
      </div>
    </SocketProvider>
  );
};

export default DashboardPage;