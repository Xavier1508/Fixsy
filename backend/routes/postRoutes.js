// backend/routes/postRoutes.js
import express from 'express';
const router = express.Router();
import { createPost, getPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

// Gunakan 'protect' untuk semua rute di sini
router.route('/').post(protect, createPost).get(protect, getPosts);

export default router;