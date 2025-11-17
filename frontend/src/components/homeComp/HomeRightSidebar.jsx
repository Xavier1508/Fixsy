// frontend/src/components/homeComp/HomeSidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

import BannerBusinessImage from '../../assets/images/banner-image/image_11.jpg';

const HomeRightSidebar = () => (
  <>
    {/* Kartu Peringatan */}
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-1">See all alerts</h3>
      <p className="text-sm text-gray-600">You have no new alerts.</p>
    </div>

    {/* Kartu "Own a local business?" */}
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="w-full h-50 bg-gray-200 flex items-center justify-center">
        <img src={BannerBusinessImage} alt="Business Banner"className="w-full h-full object-cover"/>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2">Own a local business?</h3>
        <p className="text-sm text-gray-600 mb-3">
          Create a business page to connect with neighbors, post updates in the feed, and gain new customers.
        </p>
        <Link 
          to="/business/create" 
          className="flex items-center justify-between font-semibold text-sm text-[#3a9bdc] hover:underline"
        >
          Create page
          <ChevronRight className="h-5 w-5" />
        </Link>
      </div>
    </div>
  </>
);

export default HomeRightSidebar;