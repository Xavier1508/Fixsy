import React, { useState } from 'react';

function DashboardPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div>
        
      <div className="flex justify-center gap-x-6">
      </div>

      <div className={`fixed bottom-0 right-24 bg-white border rounded-t-lg shadow-lg w-80 ${isChatOpen ? 'h-96' : 'h-12'} transition-all duration-300`}>
        
        <div 
          className="flex justify-between items-center p-3 cursor-pointer"
          onClick={() => setIsChatOpen(!isChatOpen)} // Toggle state saat diklik
        >
          <h3 className="font-bold">Chats</h3>
          <span>{isChatOpen ? '▼' : '▲'}</span> 
        </div>

        {isChatOpen && (
          <div className="p-4 text-center">
            <p>Your inbox is empty</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DashboardPage;