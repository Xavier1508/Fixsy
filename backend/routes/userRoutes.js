// backend/routes/userRoutes.js
import express from 'express';
const router = express.Router();
import {
  getUserProfile,
  updateUserProfile,
  updateUserSettings,
  updateUserPassword,
  uploadProfilePicture,
  uploadCoverPhoto,
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
// Impor middleware upload profil yang baru
import uploadProfile from '../middleware/profileUploadMiddleware.js';

// Rute ini tetap sama (Edit Profile Publik)
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// --- RUTE BARU UNTUK PENGATURAN & UPLOAD ---

// Rute untuk 'Settings' privat
router.route('/profile/settings')
  .put(protect, updateUserSettings);

// Rute untuk ganti password
router.route('/profile/password')
  .put(protect, updateUserPassword);

// Rute untuk upload foto profil (avatar)
// 'profilePicture' adalah nama field yang harus dikirim dari frontend
router.route('/profile/upload-avatar')
  .post(protect, uploadProfile.single('profilePicture'), uploadProfilePicture);

// Rute untuk upload foto sampul (banner)
// 'coverPhoto' adalah nama field yang harus dikirim dari frontend
router.route('/profile/upload-cover')
  .post(protect, uploadProfile.single('coverPhoto'), uploadCoverPhoto);


export default router;