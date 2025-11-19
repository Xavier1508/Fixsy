import React, { useState, useCallback } from 'react';
import ModalContext from './ModalContext';

// Ini adalah komponen utama yang akan membungkus aplikasi Anda.
// isForSalePage harus dikirim dari Layout/Router Anda.
export const ModalProvider = ({ children, isForSalePage }) => {
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isForSaleModalOpen, setIsForSaleModalOpen] = useState(false);

  const openPostModal = useCallback(() => {
    setIsForSaleModalOpen(false); 
    setIsPostModalOpen(true);
  }, []);

  const openForSaleModal = useCallback(() => {
    setIsPostModalOpen(false);
    setIsForSaleModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsPostModalOpen(false);
    setIsForSaleModalOpen(false);
  }, []);

  // Fungsi yang dipanggil dari dalam CreatePostModal saat user klik "Sell or give away"
  const switchToForSaleModal = useCallback(() => {
    setIsPostModalOpen(false);
    setIsForSaleModalOpen(true);
  }, []);

  // Fungsi yang dipanggil dari tombol 'What's on your mind' di Main Feed
  const handleOpenFromMainFeed = useCallback(() => {
    // Logic: Jika sedang di For Sale page, langsung buka ForSaleModal.
    if (isForSalePage) {
      openForSaleModal();
    } else {
      openPostModal();
    }
  }, [isForSalePage, openForSaleModal, openPostModal]);

  const value = {
    isPostModalOpen,
    isForSaleModalOpen,
    openPostModal,
    openForSaleModal,
    closeModal,
    switchToForSaleModal,
    handleOpenFromMainFeed,
    isForSalePage,
  };

  return (
    <ModalContext.Provider value={value}>
      {children}
    </ModalContext.Provider>
  );
};