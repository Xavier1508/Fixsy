import React from 'react';
import EventCard from './EventCard.jsx';
import { useEventRsvp } from '../../hooks/useEventRsvp.jsx';
const dummyEvents = [
  {
    id: 1,
    title: 'Cafe Palestina - An In-Person Talk...',
    date: { day: '16', month: 'Nov' },
    details: '1:30 AM - 175 Wendell Avenue, Pittsfiel...',
    image: 'https://img.nextdoor.com/image/upload/c_fill,f_auto,h_180,q_auto,w_320/ctph3q2qgxxopgjyf76u',
  },
  { id: 2, title: 'Local Farmers Market', date: { day: '18', month: 'Nov' }, details: '9:00 AM - 1:00 PM - Town Square', image: 'https://placehold.co/320x180/a7f3d0/052e16?text=Market' },
  { id: 3, title: 'Community Park Cleanup', date: { day: '20', month: 'Nov' }, details: '10:00 AM - West Park', image: 'https://placehold.co/320x180/e0e7ff/3730a3?text=Cleanup' },
  { id: 4, title: 'Yoga in the Park', date: { day: '22', month: 'Nov' }, details: '6:00 PM - Central Park', image: 'https://placehold.co/320x180/fef3c7/7p4a09?text=Yoga' },
];

// 2. Hapus props (rsvpStates, onRsvpChange)
const EventGrid = () => {
  // 3. Ambil state dan handler langsung dari Context
  const { rsvpStates, handleRsvpChange } = useEventRsvp();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {dummyEvents.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          // 4. Gunakan state dan handler dari Context
          rsvpStatus={rsvpStates[event.id] || null} 
          onRsvpChange={(newStatus) => handleRsvpChange(event.id, newStatus)}
        />
      ))}
    </div>
  );
};

export default EventGrid;