// src/components/context/AuthContext.jsx

import { createContext } from 'react';

// 1. Buat Context Object (Constant)
export const AuthContext = createContext();

// 2. Buat Reducer Function (Constant/Function)
export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      // Menyimpan data user ke localStorage saat login
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      return { user: action.payload };
    case 'LOGOUT':
      // Menghapus data user dari localStorage saat logout
      localStorage.removeItem('userInfo');
      return { user: null };
    default:
      return state;
  }
};