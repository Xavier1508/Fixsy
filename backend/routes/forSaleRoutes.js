// backend/routes/forSaleRoutes.js
import express from 'express';
const router = express.Router();
import {
  createForSaleItem,
  getAllForSaleItems,
  getItemById,
  markAsSold,
  toggleSaveItem,
} from '../controllers/forSaleController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadMultipleImages } from '../middleware/forSaleUploadMiddleware.js';

// GET semua item & POST item baru
router
  .route('/')
  .get(protect, getAllForSaleItems)
  .post(protect, uploadMultipleImages, createForSaleItem); // Terapkan middleware multi-upload

// GET detail satu item
router.route('/:id').get(protect, getItemById);

// PUT untuk menandai sebagai terjual
router.route('/:id/sold').put(protect, markAsSold);

// PUT untuk menyimpan/batal menyimpan item
router.route('/:id/save').put(protect, toggleSaveItem);

export default router;