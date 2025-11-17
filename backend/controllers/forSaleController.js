// backend/controllers/forSaleController.js
import ForSaleItem from '../models/ForSaleItem.js';
import User from '../models/User.js'; // Diperlukan untuk 'saved items'

// @desc    Membuat item For Sale baru
// @route   POST /api/forsale
// @access  Private
const createForSaleItem = async (req, res) => {
  try {
    const { title, description, price, category, condition, location } = req.body;

    // 1. Validasi file gambar
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'Minimal 1 gambar harus diunggah' });
    }

    // 2. Ubah path file menjadi URL yang bisa diakses
    const imagePaths = req.files.map((file) => `/${file.path.replace(/\\/g, '/')}`);

    // 3. Buat item baru
    const item = new ForSaleItem({
      user: req.user._id,
      title,
      description,
      price: Number(price),
      isFree: Number(price) === 0,
      category,
      condition,
      location,
      images: imagePaths,
    });

    const createdItem = await item.save();

    // 4. Populate data user untuk dikirim ke frontend
    const populatedItem = await ForSaleItem.findById(createdItem._id).populate(
      'user',
      'firstName lastName profilePicture'
    );
    
    // 5. Emit via socket (jika Anda ingin ini real-time seperti postingan)
    req.io.emit('new_forsale_item', populatedItem);

    res.status(201).json(populatedItem);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Gagal membuat item', error: error.message });
  }
};

// @desc    Mengambil semua item For Sale
// @route   GET /api/forsale
// @access  Private
const getAllForSaleItems = async (req, res) => {
  try {
    const items = await ForSaleItem.find({ status: 'Available' })
      .populate('user', 'firstName lastName profilePicture')
      .sort({ createdAt: -1 });
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mengambil detail satu item
// @route   GET /api/forsale/:id
// @access  Private
const getItemById = async (req, res) => {
  try {
    const item = await ForSaleItem.findById(req.params.id).populate(
      'user',
      'firstName lastName profilePicture bio location'
    );
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Menandai item sebagai Terjual (Sold)
// @route   PUT /api/forsale/:id/sold
// @access  Private
const markAsSold = async (req, res) => {
  try {
    const item = await ForSaleItem.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: 'Item tidak ditemukan' });
    }

    // Hanya pemilik yang bisa menandai sebagai terjual
    if (item.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Tidak terotorisasi' });
    }

    item.status = 'Sold';
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Menyimpan atau batal menyimpan item (toggle)
// @route   PUT /api/forsale/:id/save
// @access  Private
const toggleSaveItem = async (req, res) => {
  try {
    const item = await ForSaleItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item tidak ditemukan' });
    }

    const userId = req.user._id;
    const isSaved = item.savedBy.includes(userId);

    if (isSaved) {
      // Batal menyimpan
      item.savedBy = item.savedBy.filter((id) => id.toString() !== userId.toString());
    } else {
      // Menyimpan
      item.savedBy.push(userId);
    }

    await item.save();
    res.json({ message: isSaved ? 'Item dihapus dari simpanan' : 'Item disimpan' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  createForSaleItem,
  getAllForSaleItems,
  getItemById,
  markAsSold,
  toggleSaveItem,
};