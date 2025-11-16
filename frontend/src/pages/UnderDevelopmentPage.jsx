import React from 'react';
import { FaHardHat } from 'react-icons/fa';

const UnderDevelopmentPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center p-10 text-center">
      <FaHardHat className="mb-6 text-6xl text-gray-500" />
      <h2 className="mb-3 text-2xl font-semibold text-gray-800">
        This Feature is Under Construction!
      </h2>

      {/* Deskripsi */}
      <p className="max-w-md text-gray-500">
        Our team is working hard to bring this feature to you. Please wait and thank you for your patience!
      </p>
      
    </div>
  );
};

export default UnderDevelopmentPage;