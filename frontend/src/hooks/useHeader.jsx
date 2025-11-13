import { useContext } from 'react';
import { HeaderContext } from '../context/HeaderContext.jsx'; 

export const useHeader = () => {
  const context = useContext(HeaderContext);
  
  if (context === undefined) {
    throw new Error('useHeader must be used within a HeaderProvider');
  }
  
  // Kita hanya perlu 'setHeaderContent' dari provider
  return { setHeaderContent: context.setHeaderContent };
};