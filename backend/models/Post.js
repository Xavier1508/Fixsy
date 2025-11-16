// backend/models/Post.js
import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  // ... (skema komentar Anda tetap sama)
  {
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    text: { type: String, required: true },
    name: { type: String },
  },
  { timestamps: true }
);

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: false, // Diubah: Postingan bisa hanya gambar
    },
    postType: {
      type: String,
      required: true,
      default: 'text',
      enum: ['text', 'sell', 'event', 'poll', 'treat'],
    },
    media: [
      {
        type: String, // Menyimpan path ke file, misal: /uploads/media-12345.png
      },
    ],
    // --- TAMBAHAN BARU ---
    location: {
      type: String,
      trim: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Untuk @mention pengguna lain
      },
    ],
    // --- AKHIR TAMBAHAN ---
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;