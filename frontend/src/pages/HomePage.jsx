import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import MainFeed from '../components/dashboardComp/MainFeed.jsx';
import RightSidebar from '../components/dashboardComp/RightSidebar.jsx';
import { useHeader } from '../hooks/useHeader.jsx'; // JANGAN HAPUS: Ini penting untuk 'ForSalePage'
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

// 1. Definisikan konten sidebar di sini
const DefaultSidebarContent = () => (
  <>
    {/* Kartu Peringatan */}
    <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
      <h3 className="font-semibold text-gray-800 mb-1">See all alerts</h3>
      <p className="text-sm text-gray-600">You have no new alerts.</p>
    </div>

    {/* Kartu "Own a local business?" */}
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="w-full h-28 bg-gray-200 flex items-center justify-center">
        <span className="text-gray-500 text-sm">(Business Image Placeholder)</span>
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

const HomePage = () => {
  const { onOpenCreatePost } = useOutletContext();
  const { setHeaderContent } = useHeader();

  // Ini tetap diperlukan untuk 'membersihkan' header saat 
  // kembali dari ForSalePage
  useEffect(() => {
    setHeaderContent(null);
    return () => setHeaderContent(null);
  }, [setHeaderContent]);

  return (
    // 2. Gunakan struktur layout yang konsisten
    <div className="flex justify-center w-full max-w-5xl mx-auto">
      <main className="flex-1 max-w-2xl">
        <MainFeed onOpenCreatePost={onOpenCreatePost} />
      </main>
      
      {/* 3. Kirim konten ke RightSidebar via props */}
      <RightSidebar content={<DefaultSidebarContent />} />
    </div>
  );
};

export default HomePage;