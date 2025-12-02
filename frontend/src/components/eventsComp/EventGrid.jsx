import React from 'react';
import EventCard from './EventCard.jsx';
import { useEventRsvp } from '../../hooks/useEventRsvp.jsx';
const dummyEvents = [
  {
    id: 1,
    title: 'Cafe Palestina - An In-Person Talk...',
    date: { day: '16', month: 'Nov' },
    details: '1:30 AM - 175 Wendell Avenue, Pittsfiel...',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdkReiQf3QdKJO6Qh04XyTZMvxsisIznDA8Q&s',
  },
  { id: 2, title: 'Local Farmers Market', date: { day: '18', month: 'Nov' }, details: '9:00 AM - 1:00 PM - Town Square', image: 'https://static.wixstatic.com/media/cd05ef_c9cec7f2263049ea8c888ef0d5833c49~mv2_d_1790_1675_s_2.jpg/v1/fill/w_1000,h_936,al_c,q_85,usm_0.66_1.00_0.01/cd05ef_c9cec7f2263049ea8c888ef0d5833c49~mv2_d_1790_1675_s_2.jpg' },
  { id: 3, title: 'Community Park Cleanup', date: { day: '20', month: 'Nov' }, details: '10:00 AM - West Park', image: 'https://honesdaleborough.com/wp-content/uploads/2024/04/park-pickup-1.jpg' },
  { id: 4, title: 'Yoga in the Park', date: { day: '22', month: 'Nov' }, details: '6:00 PM - Central Park', image: 'https://images.squarespace-cdn.com/content/v1/5945785572af65d3b8c3e2a5/1591294441125-2NIZYIYM6LZXHIDZGJXB/image-asset.jpeg' },
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