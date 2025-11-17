// backend/middleware/eventUploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  // Tentukan folder tujuan BARU
  destination: function (req, file, cb) {
    cb(null, 'uploads/events/'); // Menyimpan di subfolder 'events'
  },
  // Buat nama file yang unik
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter file (sama seperti sebelumnya)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Hanya file gambar yang diperbolehkan!'), false);
  }
}

// Inisialisasi multer
const uploadEvent = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // Batas 5MB
  },
});

// Ekspor middleware untuk menangani satu file
// 'coverPhoto' adalah nama field yang akan kita gunakan di frontend
export const uploadCoverPhoto = uploadEvent.single('coverPhoto');