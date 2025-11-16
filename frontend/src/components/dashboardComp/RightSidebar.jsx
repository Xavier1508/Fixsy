import React from 'react';

// Terima prop 'content'
const RightSidebar = ({ content }) => {
  return (
    <aside className="ml-6 hidden lg:block w-80 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
      <div className="space-y-4 pt-6"> 
        {content}
      </div>
    </aside>
  );
};

export default RightSidebar;