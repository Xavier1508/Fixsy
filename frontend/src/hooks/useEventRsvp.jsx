import { useContext } from 'react';
import EventRsvpContext from '../context/EventRsvpContext.jsx'; // Impor context

// Buat hook kustom di filenya sendiri
export const useEventRsvp = () => {
  const context = useContext(EventRsvpContext);
  if (!context) {
    throw new Error('useEventRsvp must be used within an EventRsvpProvider');
  }
  return context;
};