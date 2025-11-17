// backend/models/Event.js
import mongoose from 'mongoose';

// Kita definisikan skema komentar di sini agar bisa digunakan kembali
const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const eventSchema = mongoose.Schema(
  {
    host: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Pembuat event
    },
    title: {
      type: String,
      required: [true, 'Nama event tidak boleh kosong'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverPhoto: {
      type: String, // Path ke gambar sampul
      required: [true, 'Foto sampul tidak boleh kosong'],
    },
    startDate: {
      type: Date,
      required: [true, 'Tanggal & waktu mulai tidak boleh kosong'],
    },
    endDate: {
      type: Date, // Opsional, sesuai UI [cite: image_44a0a9.png]
    },
    location: {
      type: String,
      required: [true, 'Lokasi tidak boleh kosong'],
      trim: true,
    },
    videoCallLink: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      default: 'General',
      enum: [
        'General',
        'Holiday',
        'Workshop',
        'Community',
        'Music',
        'Food & Drink',
        'Other',
      ],
    },
    visibility: {
      type: String,
      default: 'Public',
      enum: ['Public', 'Neighbors', 'Invite Only'],
    },
    // --- Sistem RSVP ---
    going: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    interested: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // --- Akhir Sistem RSVP ---
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

export default Event;