import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, MapPin, Check } from 'lucide-react';

const CATEGORIES = [
  'All categories',
  'Appliances', 'Automotive', 'Baby & kids', 'Bicycles', 
  'Clothing & accessories', 'Electronics', 'Furniture', 
  'Garage sales', 'Garden', 'Home decor'
];

const DISTANCES = ['1 mi', '5 mi', '10 mi', '20 mi', '50 mi'];
const SORT_OPTIONS = ['Most Relevant', 'Newest', 'Closest', 'Price: Low to High', 'Price: High to Low'];

const ForSaleFilters = ({ filters, onFilterChange }) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const containerRef = useRef(null);
  const fixsyBlue = '#3a9bdc'; // Warna biru untuk state aktif

  // Menutup dropdown jika klik di luar komponen
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleSelect = (key, value) => {
    onFilterChange(key, value);
    setOpenDropdown(null);
  };

  // --- Komponen Tombol Filter (Disesuaikan ke rounded-lg / Kotak Tumpul) ---
  const FilterButton = ({ label, isActive, onClick, hasDropdown, value, icon: Icon }) => (
    <div className="relative inline-block">
      <button
        onClick={onClick}
        className={`flex items-center space-x-1.5 py-1.5 px-3 rounded-lg border text-sm font-medium transition-colors ${
          isActive 
            ? `bg-blue-50 border-[${fixsyBlue}] text-[${fixsyBlue}]` // Style saat Aktif (tetap kotak)
            : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-100' // Style Default (Persis Asli)
        }`}
      >
        {/* Jika ada Icon (misal MapPin), render di kiri */}
        {Icon && <Icon className={`h-4 w-4 ${isActive ? `text-[${fixsyBlue}]` : 'text-gray-500'}`} />}
        
        {/* Text Label */}
        <span>{label}</span>
        
        {/* Value (jika bukan boolean toggle) */}
        {value && <span className={isActive ? `text-[${fixsyBlue}]` : 'text-gray-700'}>{value === 'All' ? ': All' : `: ${value}`}</span>}
        
        {/* Icon ChevronDown */}
        {hasDropdown && (
          <ChevronDown className={`h-4 w-4 ml-0.5 transition-transform ${openDropdown === label ? 'rotate-180' : ''} ${isActive ? `text-[${fixsyBlue}]` : 'text-gray-600'}`} />
        )}
      </button>
    </div>
  );

  return (
    // Container utama menggunakan mt-4 dan gap-2 persis seperti kode asli
    <div className="flex flex-wrap items-center gap-2 mt-4" ref={containerRef}>
      
      {/* 1. CATEGORIES DROPDOWN */}
      <div className="relative">
        <FilterButton 
          label="Categories" // Label disesuaikan agar terlihat "Categories: All"
          value={filters.category === 'All' ? 'All' : filters.category}
          hasDropdown 
          isActive={openDropdown === 'Categories' || filters.category !== 'All'}
          onClick={() => toggleDropdown('Categories')}
        />
        {openDropdown === 'Categories' && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto py-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => handleSelect('category', cat === 'All categories' ? 'All' : cat)}
                className="flex items-center justify-between w-full px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-gray-50"
              >
                <span>{cat}</span>
                {(filters.category === cat || (filters.category === 'All' && cat === 'All categories')) && (
                  <Check className={`h-4 w-4 text-[${fixsyBlue}]`} />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 2. FREE TOGGLE */}
      <FilterButton 
        label="Free" 
        isActive={filters.isFree}
        onClick={() => onFilterChange('isFree', !filters.isFree)}
      />

      {/* 3. DISTANCE DROPDOWN (Ada MapPin) */}
      <div className="relative">
        <FilterButton
          label="Distance"
          value={filters.distance}
          icon={MapPin} // Mengirim komponen ikon MapPin
          hasDropdown
          isActive={openDropdown === 'Distance'}
          onClick={() => toggleDropdown('Distance')}
        />
        
        {openDropdown === 'Distance' && (
          <div className="absolute top-full left-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
            {DISTANCES.map((dist) => (
              <button
                key={dist}
                onClick={() => handleSelect('distance', dist)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
              >
                <span>{dist}</span>
                {filters.distance === dist && <Check className={`h-4 w-4 text-[${fixsyBlue}]`} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 4. SORT BY DROPDOWN */}
      <div className="relative">
        <FilterButton 
          label="Sort By" 
          value={filters.sortBy}
          hasDropdown 
          isActive={openDropdown === 'Sort By'}
          onClick={() => toggleDropdown('Sort By')}
        />
        {openDropdown === 'Sort By' && (
          <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 py-1">
            {SORT_OPTIONS.map((option) => (
              <button
                key={option}
                onClick={() => handleSelect('sortBy', option)}
                className="flex items-center justify-between w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-50"
              >
                <span>{option}</span>
                {filters.sortBy === option && <Check className={`h-4 w-4 text-[${fixsyBlue}]`} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* 5. DISCOUNTED TOGGLE */}
      <FilterButton 
        label="Discounted" 
        isActive={filters.isDiscounted}
        onClick={() => onFilterChange('isDiscounted', !filters.isDiscounted)}
      />

    </div>
  );
};

export default ForSaleFilters;