import React, { useState } from 'react';
import { HeaderContext } from './HeaderContext.jsx';

export const HeaderProvider = ({ children }) => {
  const [headerContent, setHeaderContent] = useState(null);

  return (
    <HeaderContext.Provider value={{ setHeaderContent }}>
      {children(headerContent)}
    </HeaderContext.Provider>
  );
};