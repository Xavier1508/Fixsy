// src/components/context/AuthContextProvider.jsx

import React, { useReducer, useEffect } from 'react';
import { AuthContext, authReducer } from './AuthContext.jsx'; // Import dari file di atas

// 3. Buat Context Provider (Component)
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    user: null
  });

  // Cek local storage saat pertama kali app dimuat
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (userInfo) {
      dispatch({ type: 'LOGIN', payload: userInfo });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};