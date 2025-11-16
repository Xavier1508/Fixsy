// backend/middleware/uploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  // Tentukan folder tujuan
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  // Buat nama file yang unik untuk menghindari konflik
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter untuk hanya menerima file gambar
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Hanya gambar yang diperbolehkan!'), false);
  }
}

// Inisialisasi multer dengan konfigurasi di atas
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

export default upload;