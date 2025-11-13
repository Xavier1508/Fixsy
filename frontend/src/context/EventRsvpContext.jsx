import React, { createContext, useState } from 'react';

// 1. Buat Context (Hook 'useEventRsvp' dihapus dari sini)
const EventRsvpContext = createContext();

// Export context-nya agar bisa dipakai di file hook
export default EventRsvpContext;

// 2. Buat "Provider" yang akan memegang state
export const EventRsvpProvider = ({ children }) => {
  const [rsvpStates, setRsvpStates] = useState({});

  const handleRsvpChange = (eventId, newStatus) => {
    const finalStatus = newStatus === 'not_interested' ? null : newStatus;
    
    setRsvpStates(prevStates => ({
      ...prevStates,
      [eventId]: finalStatus,
    }));

    console.log(`[Context] Event ${eventId} status changed to ${finalStatus}`);
  };

  return (
    <EventRsvpContext.Provider value={{ rsvpStates, handleRsvpChange }}>
      {children}
    </EventRsvpContext.Provider>
  );
};