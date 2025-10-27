// backend/models/Business.js
import mongoose from 'mongoose';

const businessSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
      unique: true, // Satu user hanya boleh punya 1 halaman bisnis
    },
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phone: {
      type: String,
    },
    contactEmail: {
      type: String,
    },
    // Nanti kita tambahkan foto profil & cover bisnis
  },
  {
    timestamps: true,
  }
);

const Business = mongoose.model('Business', businessSchema);

export default Business;