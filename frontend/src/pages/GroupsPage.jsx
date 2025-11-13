import React, { useState } from 'react';
import EventGrid from '../components/eventsComp/EventGrid.jsx';
import YourEvents from '../components/eventsComp/YourEvents.jsx';

const EventsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  
  // --- PERUBAHAN DI SINI ---
  // 1. Menambahkan state untuk mengelola status RSVP dari semua event di grid
  //    Contoh: { 1: 'interested', 2: 'going' }
  const [rsvpStates, setRsvpStates] = useState({});

  // 2. Menambahkan handler untuk memperbarui state
  const handleRsvpChange = (eventId, newStatus) => {
    // Jika status "Not interested", kita reset jadi null agar tombol kembali ke awal
    const finalStatus = newStatus === 'not_interested' ? null : newStatus;
    
    setRsvpStates(prevStates => ({
      ...prevStates,
      [eventId]: finalStatus,
    }));
    // Di sini Anda akan memanggil API backend untuk menyimpan perubahan
    console.log(`Event ${eventId} status changed to ${finalStatus}`);
  };
  // --- AKHIR PERUBAHAN ---

  if (viewMode === 'list') {
    return (
      <YourEvents onBack={() => setViewMode('grid')} />
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto py-6">
      
      <div className="flex items-center min-h-10 mb-4">
        <h1 className="text-xl font-bold text-gray-900">Events near you</h1>
      </div>

      <div className="border-b border-gray-200 mb-8">
        <div className="flex items-center space-x-2">
          <button 
            className="py-2 px-3 text-sm font-medium text-blue-600 border-b-2 border-blue-600"
          >
            All Events
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className="py-2 px-3 text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Your events
          </button>
        </div>
      </div>

      {/* Tampilkan grid acara */}
      {/* 3. Kirim state dan handler ke EventGrid sebagai props */}
      <EventGrid 
        rsvpStates={rsvpStates}
        onRsvpChange={handleRsvpChange}
      />
      
    </div>
  );
};

export default EventsPage;