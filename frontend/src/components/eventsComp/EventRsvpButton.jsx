import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

/**
 * Komponen Tombol RSVP Stateful yang Terkendali.
 * @param {string} status - Status saat ini ('going', 'interested', 'not_interested', or null)
 * @param {function} onStatusChange - Fungsi yang dipanggil saat status berubah
 * @param {string} variant - 'card' (lebar penuh) atau 'detail' (lebar auto)
 */
const EventRsvpButton = ({ status, onStatusChange, variant = 'detail' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { label: 'Going', value: 'going' },
    { label: 'Interested', value: 'interested' },
    { label: 'Not interested', value: 'not_interested' },
  ];

  // Menutup dropdown jika klik di luar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Tentukan apakah ini status awal (atau reset)
  const isInitialState = status === null || status === 'not_interested';

  // Fungsi untuk menangani klik tombol utama
  const handleMainClick = () => {
    if (isInitialState) {
      // LOGIKA KLIK PERTAMA: Langsung set ke 'interested'
      onStatusChange('interested');
    } else {
      // Jika sudah punya status, tombol ini berfungsi sebagai pembuka dropdown
      setIsOpen(!isOpen);
    }
  };

  // Fungsi untuk memilih dari dropdown
  const selectStatus = (newStatus) => {
    onStatusChange(newStatus);
    setIsOpen(false);
  };

  // Tentukan style berdasarkan variant dan status
  let buttonStyle = 'flex items-center justify-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ';
  
  if (isInitialState) {
    // Style Awal/Reset (Dark/Primary)
    buttonStyle += 'bg-gray-800 text-white hover:bg-gray-900';
  } else {
    // Style Sudah Ada Status (Abu-abu)
    buttonStyle += 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200';
  }

  if (variant === 'card') {
    buttonStyle += ' w-full'; // Lebar penuh untuk di card
  } else {
    buttonStyle += ' min-w-[150px]'; // Lebar minimum untuk di detail
  }

  // Tentukan label untuk tombol
  const getButtonLabel = () => {
    if (isInitialState) return "Interested?";
    if (status === 'going') return "Going";
    if (status === 'interested') return "Interested";
    return "Interested?"; // Fallback
  };
  
  const currentLabel = getButtonLabel();

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={handleMainClick}
        className={buttonStyle}
      >
        <span>{currentLabel}</span>
        
        {/* Hanya tampilkan Chevron jika BUKAN status awal */}
        {!isInitialState && (
          <ChevronDown className={`h-5 w-5 ml-2 ${isOpen ? 'transform rotate-180' : ''}`} />
        )}
      </button>

      {/* Dropdown (Hanya render jika status BUKAN awal DAN isOpen) */}
      {!isInitialState && isOpen && (
        <div className="absolute bottom-full left-0 right-0 mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 z-10 overflow-hidden">
          {options.map(option => (
            <button
              key={option.value}
              onClick={() => selectStatus(option.value)}
              className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
            >
              <span>{option.label}</span>
              {status === option.value && <Check className="h-5 w-5 text-blue-600" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventRsvpButton;