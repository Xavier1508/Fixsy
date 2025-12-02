// backend/routes/postRoutes.js
import express from 'express';
const router = express.Router();
import { createPost, getPosts, toggleLike, addComment , searchPosts} from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

router.put('/:id/like', protect, toggleLike);
router.post('/:id/comment', protect, addComment);
router.get("/search", protect, searchPosts);


// 1. Impor middleware upload
import upload from '../middleware/uploadMiddleware.js';

// 2. Terapkan 'upload.single('media')' HANYA ke rute createPost
// 'media' adalah nama field yang harus dikirim dari frontend
router
  .route('/')
  .post(protect, upload.single('media'), createPost) // Diubah
  .get(protect, getPosts); // Tetap sama

export default router;