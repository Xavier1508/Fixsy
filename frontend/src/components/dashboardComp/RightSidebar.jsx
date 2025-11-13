import React from 'react';

// Terima prop 'content'
const RightSidebar = ({ content }) => {
  return (
    // 'sticky' dan 'top-16' (bukan 14) untuk sinkronisasi dengan header sticky H-16
    <aside className="ml-6 hidden lg:block w-80 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-4 pt-6"> 
        {/* Render 'content' jika ada, jika tidak, area ini akan kosong */}
        {content}
      </div>
    </aside>
  );
};

export default RightSidebar;