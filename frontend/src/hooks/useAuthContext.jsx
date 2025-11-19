// src/components/hooks/useAuthContext.jsx

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext.jsx'; 

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    // Pesan error jika hook digunakan di luar provider
    throw Error('useAuthContext must be used inside an AuthContextProvider');
  }

  return context;
};