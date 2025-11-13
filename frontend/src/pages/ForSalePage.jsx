import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin } from 'lucide-react';
import ForSaleItemCard from '../components/forSaleComp/ForSaleItemCard.jsx';
// 1. IMPO HOOK-NYA
import { useHeader } from '../hooks/useHeader.jsx'; 

const dummyItems = [
  // ... (Data dummy Anda, saya tambahkan agar jadi 12)
  { id: 1, title: 'Black Dresser FREE', price: 'FREE', location: '3.5 mi - Pittsfield', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 2, title: 'New Diamondback Cobra...', price: '$200', location: '9.7 mi - Lance', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 3, title: 'Honda Power Equipment', price: 'Choose', location: '3.5 mi - Pittsfield', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 4, title: 'Lightly Used Royal Alpha...', price: '$180', location: '9.7 mi - Lance', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 5, title: 'Set of 5 Decorative Mugs', price: '$35', location: '1.9 day - 3.5 mi', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 6, title: 'Brown Leather swivel chair', price: '$40', location: '1 day ago - 3.5 mi', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 7, title: 'Round Velvet Ottoman', price: '$180', location: '1 day ago - 3.5 mi', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 8, title: 'Cute Metal Patio Bench', price: '$150', location: '1 day ago - 3.5 mi', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 9, title: 'Black Dresser FREE 2', price: 'FREE', location: '3.5 mi - Pittsfield', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 10, title: 'New Diamondback Cobra 2', price: '$200', location: '9.7 mi - Lance', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 11, title: 'Honda Power Equipment 2', price: 'Choose', location: '3.5 mi - Pittsfield', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
  { id: 12, title: 'Lightly Used Royal Alpha 2', price: '$180', location: '9.7 mi - Lance', image: 'https://placehold.co/300x200/e2e8f0/64748b?text=Fixsy' },
];

const ForSalePage = () => {
  // 2. PANGGIL HOOK-NYA
  const { setHeaderContent } = useHeader();
  const [activeTab, setActiveTab] = useState('All listings');
  const fixsyBlue = '#3a9bdc'; 

  const renderTab = (label) => {
    const isActive = activeTab === label;
    return (
      <button
        key={label}
        onClick={() => setActiveTab(label)}
        className={`pb-3 font-medium text-sm ${
          isActive
            ? `text-[${fixsyBlue}] border-b-2 border-[${fixsyBlue}]`
            : 'text-gray-500 hover:text-gray-800'
        }`}
      >
        {label}
      </button>
    );
  };

  // 3. KIRIM UI FILTER KE HEADER
  useEffect(() => {
    const filterUI = (
      // Clean UI (tanpa border box jelek)
      <div className="pt-2 pb-4"> 
        <div className="flex space-x-6 border-b border-gray-200">
          {['All listings', 'Your listings', 'Saved listings'].map(renderTab)}
        </div>
        
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <button className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100">
            <span className="text-sm font-medium text-gray-700">Categories: All</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>
          <button className="py-1.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium text-gray-700">
            Free
          </button>
          <button className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Distance: 10 mi</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>
          <button className="flex items-center space-x-1.5 py-1.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100">
            <span className="text-sm font-medium text-gray-700">Sort By: Most Relevant</span>
            <ChevronDown className="h-4 w-4 text-gray-600" />
          </button>
          <button className="py-1.5 px-3 rounded-lg border border-gray-300 bg-white hover:bg-gray-100 text-sm font-medium text-gray-700">
            Discounted
          </button>
        </div>
      </div>
    );

    setHeaderContent(filterUI);

    return () => setHeaderContent(null);
  }, [activeTab, setHeaderContent]);


  return (
    // 4. KONTEN HALAMAN SEKARANG HANYA GRID
    <div className="w-full max-w-7xl mx-auto">
      {/* KOTAK FILTER YANG JELEK SUDAH HILANG DARI SINI */}
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {dummyItems.map(item => (
          <ForSaleItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default ForSalePage;