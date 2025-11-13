import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RightSidebar from '../components/dashboardComp/RightSidebar.jsx';
import { useEventRsvp } from '../hooks/useEventRsvp.jsx';

// Impor semua komponen detail
import EventDetailHeader from '../components/eventsComp/EventDetailHeader.jsx';
import EventHostInfo from '../components/eventsComp/EventHostInfo.jsx';
import EventRsvpButton from '../components/eventsComp/EventRsvpButton.jsx';
import EventAttendeesLink from '../components/eventsComp/EventAttendeesLink.jsx';
import EventActions from '../components/eventsComp/EventActions.jsx';
import EventComments from '../components/eventsComp/EventComments.jsx';

// Data dummy
const dummyEventDetail = {
  id: 1,
  title: 'Cafe Palestina - An In-Person Talk and Conversation with Faisel Saleh',
  date: 'Sun, Nov 16, 1:30AM - 3AM',
  location: '175 Wendell Avenue, Pittsfield, MA',
  image: 'https://img.nextdoor.com/image/upload/c_fill,f_auto,h_180,q_auto,w_320/ctph3q2qgxxopgjyf76u',
  host: {
    name: 'Ivan Kruh',
    avatar: 'https://placehold.co/40x40/dbeafe/2563eb?text=I',
    location: 'Great Barrington, MA',
    timestamp: '2 days ago'
  },
  description: 'We will be holding our fourth Cafe Palestina event next Saturday, 11/15/25, from 1:30 to 3:00 pm. This will be a very special gathering in which we will have the opportunity to hear an in-person talk from and engage in dialogue with Mr. Faisal Saleh. Mr. Saleh is the founder of the first Palestinian Museum in the Americas. This event is open to all and we encourage you to bring your friends and neighbors. Light refreshments will be served. Please RSVP so we can get a headcount.',
  stats: {
    interested: 2,
    going: 1
  }
};


const EventDetailPage = () => {
  const { id } = useParams();
  const eventId = parseInt(id); // Pastikan ID adalah angka
  const navigate = useNavigate();
  const event = dummyEventDetail; 

  // Mengambil state dan handler dari Context
  const { rsvpStates, handleRsvpChange } = useEventRsvp();

  // Tentukan status untuk event INI
  const currentRsvpStatus = rsvpStates[eventId] || null;

  return (
    <div className="flex justify-center w-full max-w-5xl mx-auto">
      <main className="flex-1 max-w-2xl">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden my-8">
          
          <EventDetailHeader 
            image={event.image}
            title={event.title}
            date={event.date}
            location={event.location}
          />

          <div className="p-4">
            <EventHostInfo 
              host={event.host}
              description={event.description}
            />
            
            <div className="mt-3">
              <EventAttendeesLink 
                interested={event.stats.interested}
                going={event.stats.going}
              />
            </div>

            {/* Gunakan state dan handler dari Context */}
            <div className="mt-4 mb-2 flex justify-center">
              <EventRsvpButton 
                status={currentRsvpStatus}
                onStatusChange={(newStatus) => handleRsvpChange(eventId, newStatus)}
                variant="detail" 
              />
            </div>
          </div>
          
          <EventActions />
          
          <EventComments />
        </div>
      </main>

      <RightSidebar />
    </div>
  );
};

export default EventDetailPage;