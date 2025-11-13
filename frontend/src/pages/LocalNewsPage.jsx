import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// HAPUS 'useHeader'
import NewsPostCard from '../components/localnewsComp/NewsPostCard.jsx';
import { ChevronLeft } from 'lucide-react';
import RightSidebar from '../components/dashboardComp/RightSidebar.jsx'; // 1. Impor Sidebar

// Data Dummy
const dummyNews = [
  {
    id: 1,
    publisher: { name: 'The Berkshire Eagle', avatar: 'https://placehold.co/40x40/f43f5e/ffffff?text=BE' },
    timestamp: '3 days ago',
    content: 'Hinsdale Pizza House offered free meals amid SNAP uncertainty. Then, residents started donating to cover them without being asked',
    imageUrl: 'https://img.nextdoor.com/image/upload/c_fill,f_auto,h_360,q_auto,w_600/flnblm6ctcfqhmg2ma1y',
    comments: 29,
    likes: 5,
  },
];

const LocalNewsPage = () => {
  const navigate = useNavigate();
  // HAPUS 'setHeaderContent' dan 'useEffect'

  return (
    // 2. Gunakan struktur layout yang KONSISTEN
    <div className="flex justify-center w-full max-w-5xl mx-auto">
      <main className="flex-1 max-w-2xl">
        
        {/* 3. Header/Judul sekarang ada DI DALAM 'main' */}
        <div className="flex items-center space-x-2 pt-6 mb-5">
          <button 
            onClick={() => navigate(-1)} // Tombol kembali
            className="p-2 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-bold text-gray-900">Local News</h1>
        </div>

        {/* 4. Konten feed */}
        <div className="space-y-6">
          {dummyNews.map(post => (
            <NewsPostCard key={post.id} post={post} />
          ))}
        </div>
      </main>

      {/* 5. Render Sidebar KOSONG (tanpa prop 'content') */}
      <RightSidebar />
    </div>
  );
};

export default LocalNewsPage;