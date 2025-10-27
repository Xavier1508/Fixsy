import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const RightSidebar = () => {
  return (
    <aside className="hidden lg:block w-80 bg-gray-100 pt-6 px-4 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="space-y-4">
        
        {/* Kartu Peringatan (Contoh) */}
        <div className="bg-white p-4 rounded-lg shadow border">
          <h3 className="font-semibold text-gray-800 mb-1">See all alerts</h3> {/* UBAH: font-bold text-lg -> font-semibold */}
          <p className="text-sm text-gray-600">You have no new alerts.</p>
        </div>

        {/* Kartu "Own a local business?" */}
        <div className="bg-white rounded-lg shadow border overflow-hidden">
          <div className="w-full h-28 bg-gray-200 flex items-center justify-center"> {/* UBAH: h-32 -> h-28 */}
            <span className="text-gray-500 text-sm">(Business Image Placeholder)</span>
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-800 mb-2">Own a local business?</h3> {/* UBAH: font-bold text-lg -> font-semibold */}
            <p className="text-sm text-gray-600 mb-3"> {/* UBAH: mb-4 -> mb-3 */}
              Create a business page to connect with neighbors, post updates in the feed, and gain new customers.
            </p>
            <Link 
              to="/business/create" 
              className="flex items-center justify-between font-semibold text-sm text-[#3a9bdc] hover:underline" // UBAH: tambahkan text-sm
            >
              Create page
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

      </div>
    </aside>
  );
};

export default RightSidebar;