import React, { useState } from 'react';
import AttendeesModal from './AttendeesModal.jsx'; // Impor modal

const EventAttendeesLink = ({ interested, going }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* mt-3 memberi jarak dari deskripsi di atasnya */}
      <div className="mt-3">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="text-sm text-gray-600 hover:underline"
        >
          {interested} interested · {going} going
        </button>
      </div>
      
      {/* Render Modal */}
      {isModalOpen && <AttendeesModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default EventAttendeesLink;