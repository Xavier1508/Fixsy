// backend/models/ForSaleItem.js
import mongoose from 'mongoose';

const forSaleItemSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    title: {
      type: String,
      required: [true, 'Judul tidak boleh kosong'],
      trim: true,
      maxLength: [100, 'Judul tidak boleh lebih dari 100 karakter'],
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Harga tidak boleh kosong (isi 0 jika gratis)'],
      min: [0, 'Harga tidak boleh negatif'],
      default: 0,
    },
    isFree: {
      type: Boolean,
      default: false, // Ditentukan oleh frontend jika toggle 'Free' aktif
    },
    category: {
      type: String,
      required: [true, 'Kategori tidak boleh kosong'],
      enum: [
        'Free',
        'Furniture',
        'Electronics',
        'Garden & Tools',
        'Clothing & Accessories',
        'Appliances',
        'Baby & Kids',
        'Vehicles',
        'Toys & Games',
        'Sports & Outdoors',
        'Other',
      ],
    },
    condition: {
      type: String,
      required: true,
      enum: ['New', 'Used - Like New', 'Used - Good', 'Used - Fair'],
      default: 'Used - Good',
    },
    images: [
      {
        type: String, // Array path gambar, misal: /uploads/forsale/image-123.png
      },
    ],
    location: {
      type: String,
      required: [true, 'Lokasi tidak boleh kosong'],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['Available', 'Sold', 'Expired'],
      default: 'Available',
    },
    // Untuk fitur "Saved listings" [cite: image_3aa38a.jpg]
    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // Untuk fitur chat terpisah (nanti) [cite: image_3aa787.jpg]
    chatLinks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Validasi bahwa setidaknya ada 1 gambar
forSaleItemSchema.path('images').validate(function (images) {
  return images.length > 0;
}, 'Minimal 1 gambar harus diunggah');

// Validasi maksimal 10 gambar
forSaleItemSchema.path('images').validate(function (images) {
  return images.length <= 10;
}, 'Maksimal 10 gambar yang bisa diunggah');

const ForSaleItem = mongoose.model('ForSaleItem', forSaleItemSchema);

export default ForSaleItem;