// backend/controllers/businessController.js
import Business from '../models/Business.js';

// @desc    Membuat Halaman Bisnis baru
// @route   POST /api/business
// @access  Private
const createBusinessPage = async (req, res) => {
  const { name, category, address, phone, contactEmail } = req.body;

  try {
    // Cek apakah user sudah punya halaman bisnis
    const existingBusiness = await Business.findOne({ owner: req.user._id });

    if (existingBusiness) {
      return res.status(400).json({ message: 'Anda sudah memiliki halaman bisnis' });
    }

    const business = new Business({
      owner: req.user._id,
      name,
      category,
      address,
      phone,
      contactEmail: contactEmail || req.user.email,
    });

    const createdBusiness = await business.save();
    res.status(201).json(createdBusiness);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mendapatkan halaman bisnis milik user yang login
// @route   GET /api/business/mybusiness
// @access  Private
const getMyBusinessPage = async (req, res) => {
  try {
    const business = await Business.findOne({ owner: req.user._id });

    if (business) {
      res.json(business);
    } else {
      res.status(404).json({ message: 'Halaman bisnis tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createBusinessPage, getMyBusinessPage };