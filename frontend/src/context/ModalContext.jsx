import { createContext } from 'react';

// Nilai default untuk memudahkan autocompletion dan memastikan struktur.
const ModalContext = createContext({
  isPostModalOpen: false,
  isForSaleModalOpen: false,
  openPostModal: () => {},
  openForSaleModal: () => {},
  closeModal: () => {},
  switchToForSaleModal: () => {},
  handleOpenFromMainFeed: () => {},
  isForSalePage: false,
});

export default ModalContext;