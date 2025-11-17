// backend/middleware/forSaleUploadMiddleware.js
import multer from 'multer';
import path from 'path';

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  // Tentukan folder tujuan BARU
  destination: function (req, file, cb) {
    cb(null, 'uploads/forsale/'); // Menyimpan di subfolder 'forsale'
  },
  // Buat nama file yang unik (logika ini tetap sama)
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Filter file (logika ini tetap sama)
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Hanya file gambar (jpeg, jpg, png, gif, webp) yang diperbolehkan!'), false);
  }
}

// Inisialisasi multer
const uploadForSale = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // Batas 5MB per file
  },
});

// Ekspor middleware untuk menangani array foto
// 'images' adalah nama field yang akan kita gunakan di frontend
// 10 adalah batas maksimal foto sesuai UI Nextdoor [cite: image_3aa002.jpg]
export const uploadMultipleImages = uploadForSale.array('images', 10);