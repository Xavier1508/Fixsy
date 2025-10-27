// backend/routes/chatRoutes.js
import express from 'express';
const router = express.Router();
import {
  createChat,
  getChats,
} from '../controllers/chatController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createChat).get(protect, getChats);

export default router;