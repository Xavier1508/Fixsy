import React, { useState } from 'react';
import EventGrid from '../components/eventsComp/EventGrid.jsx';
import YourEvents from '../components/eventsComp/YourEvents.jsx';
// Hapus useState dan handler, karena sudah pindah ke Context

const EventsPage = () => {
  const [viewMode, setViewMode] = useState('grid');
  
  // State RSVP dan handler SUDAH DIHAPUS dari sini

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
        <nav className="flex space-x-2">
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
        </nav>
      </div>

      {/* Tampilkan grid acara */}
      {/* SEKARANG TIDAK PERLU PROPS: EventGrid akan mengambil state dari Context */}
      <EventGrid />
      
    </div>
  );
};

export default EventsPage;