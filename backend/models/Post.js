import mongoose from 'mongoose';

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
    name: { type: String }, // Untuk menyimpan nama user, agar tidak perlu populate
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Relasi ke model User
    },
    content: {
      type: String,
      required: true,
    },
    postType: {
      type: String,
      required: true,
      default: 'text', // Sesuai modal 'Create something'
      enum: ['text', 'sell', 'event', 'poll', 'treat'],
    },
    media: [
      {
        type: String, // Nanti kita simpan URL gambar/video di sini
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Siapa saja yang like
      },
    ],
    comments: [commentSchema], // Menggunakan sub-document
  },
  {
    timestamps: true, // Otomatis menambah createdAt dan updatedAt
  }
);

const Post = mongoose.model('Post', postSchema);

export default Post;