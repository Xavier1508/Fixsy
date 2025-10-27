// backend/routes/businessRoutes.js
import express from 'express';
const router = express.Router();
import {
  createBusinessPage,
  getMyBusinessPage,
} from '../controllers/businessController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').post(protect, createBusinessPage);
router.route('/mybusiness').get(protect, getMyBusinessPage);

export default router;