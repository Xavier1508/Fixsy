// backend/routes/eventRoutes.js
import express from 'express';
const router = express.Router();
import {
  createEvent,
  getUpcomingEvents,
  getPastEvents,
  getEventById,
  rsvpToEvent,
} from '../controllers/eventController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadCoverPhoto } from '../middleware/eventUploadMiddleware.js';

// GET semua event (upcoming) & POST event baru
router
  .route('/')
  .get(protect, getUpcomingEvents)
  .post(protect, uploadCoverPhoto, createEvent); // Terapkan middleware upload foto

// GET event yang sudah lewat
router.route('/past').get(protect, getPastEvents);

// GET detail satu event
router.route('/:id').get(protect, getEventById);

// PUT untuk RSVP
router.route('/:id/rsvp').put(protect, rsvpToEvent);

export default router;