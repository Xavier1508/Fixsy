import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ForSaleItemCard from '../components/forSaleComp/ForSaleItemCard.jsx';
import CreateForSaleModal from '../components/forSaleComp/CreateForSaleModal.jsx';
import ForSaleFilters from '../components/forSaleComp/ForSaleFilters.jsx'; // Pastikan path ini benar
import { useHeader } from '../hooks/useHeader.jsx';

const BACKEND_URL = 'http://localhost:5000';

const ForSalePage = () => {
  const { setHeaderContent } = useHeader();
  const [activeTab, setActiveTab] = useState('All listings');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fixsyBlue = '#3a9bdc'; 

  // --- 1. STATE FILTER (Ditambahkan) ---
  const [filters, setFilters] = useState({
    category: 'All',
    isFree: false,
    distance: '10 mi',
    sortBy: 'Most Relevant',
    isDiscounted: false,
  });

  // --- 2. HANDLER FILTER (Ditambahkan) ---
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // --- 3. API FETCH (Update dependency) ---
  const fetchItems = useCallback(async (tab, currentFilters) => {
    setLoading(true);
    setError(null);
    const token = JSON.parse(localStorage.getItem('userInfo'))?.token;
    let url = `${BACKEND_URL}/api/forsale`;
    
    // Di sini nanti Anda bisa masukkan params ke axios berdasarkan 'currentFilters'
    // Contoh: const params = { category: currentFilters.category, ... }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(url, config);
      setItems(data);
    } catch (err) {
      setError('Gagal memuat item.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch ulang jika Tab berubah atau Filter berubah
  useEffect(() => {
    fetchItems(activeTab, filters);
  }, [activeTab, filters, fetchItems]);

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

  // --- 4. HEADER EFFECT (Sekarang menggunakan ForSaleFilters) ---
  useEffect(() => {
    const filterUI = (
      <div className="pt-2 pb-4"> 
        <div className="flex justify-between items-center">
          <div className="flex space-x-6 border-b border-gray-200">
            {['All listings', 'Your listings', 'Saved listings'].map(renderTab)}
          </div>
        </div>
        
        {/* Komponen Filter disisipkan di sini */}
        {/* Tampilannya diatur di dalam ForSaleFilters agar sama persis (rounded-lg, dll) */}
        <ForSaleFilters 
          filters={filters} 
          onFilterChange={handleFilterChange} 
        />
      </div>
    );

    setHeaderContent({
      filters: filterUI,
      searchPlaceholder: 'Search all listings'
    });

    return () => setHeaderContent(null);
  }, [activeTab, filters]);


  // --- 5. RENDER KONTEN (Tidak Berubah) ---
  const renderContent = () => {
    if (loading) return <p className="text-center p-10">Loading listings...</p>;
    if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
    
    if (items.length === 0) {
      return (
        <div className="text-center p-20">
          <h3 className="text-2xl font-semibold text-gray-800">Nothing listed here yet</h3>
          <p className="text-gray-500 mt-2">Get something to sell or give away? Post it here!</p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mt-6 px-6 py-2 bg-gray-800 text-white rounded-full font-semibold hover:bg-gray-700"
          >
            Create a listing
          </button>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {items.map(item => (
          <ForSaleItemCard key={item._id} item={item} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="w-full max-w-7xl mx-auto">
        {renderContent()}
      </div>

      {isModalOpen && (
        <CreateForSaleModal 
          onClose={() => setIsModalOpen(false)} 
          onListingCreated={() => {
            fetchItems(activeTab, filters);
          }}
        />
      )}
    </>
  );
};

export default ForSalePage;