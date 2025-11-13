import React from 'react';
import { Link } from 'react-router-dom';
import EventRsvpButton from './EventRsvpButton.jsx'; // Impor tombol baru

/**
 * Komponen Event Card
 * @param {object} event - Objek event
 * @param {string} rsvpStatus - Status RSVP saat ini ('going', 'interested', 'not_interested', or null)
 * @param {function} onRsvpChange - Fungsi untuk mengubah status RSVP
 */
const EventCard = ({ event, rsvpStatus, onRsvpChange }) => {

  // Fungsi ini SANGAT PENTING
  // Mencegah <Link> ter-klik saat kita mengklik tombol RSVP
  const handleRsvpClick = (e) => {
    e.preventDefault(); // Mencegah navigasi
    e.stopPropagation(); // Menghentikan event "bubble up" ke Link
    
    // Logika ini hanya untuk simulasi klik pertama di card
    // Anda akan meneruskan 'onRsvpChange' yang sebenarnya
    if (rsvpStatus === null || rsvpStatus === 'not_interested') {
      onRsvpChange('interested');
    }
  };

  return (
    // <Link> sekarang membungkus semuanya
    <Link to={`/dashboard/events/${event.id}`} className="block group">
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-full">
        <div className="w-full h-36 bg-gray-200">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Konten */}
        <div className="p-3 flex flex-col flex-1">
          <div className="flex mb-2">
            <div className="flex-shrink-0 mr-3">
              <div className="flex flex-col items-center justify-center h-12 w-12 rounded-lg bg-gray-100 border border-gray-200">
                <span className="text-xs font-semibold text-red-600 uppercase">{event.date.month}</span>
                <span className="text-xl font-bold text-gray-800">{event.date.day}</span>
              </div>
            </div>
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-800 text-sm truncate group-hover:underline" title={event.title}>
                {event.title}
              </h3>
              <p className="text-xs text-gray-500 truncate">{event.details}</p>
            </div>
          </div>
          
          {/* Tombol RSVP (di bagian bawah) */}
          {/* 'mt-auto' mendorong tombol ini ke bawah card */}
          <div 
            className="mt-auto" 
            onClick={handleRsvpClick} // Terapkan stopPropagation di sini
          >
            <EventRsvpButton 
              variant="card"
              status={rsvpStatus}
              onStatusChange={onRsvpChange} // Teruskan fungsi handler
            />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;