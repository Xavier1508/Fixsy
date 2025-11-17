// backend/controllers/userController.js
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Mendapatkan profil pengguna (data lengkap untuk pengguna yang login)
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber,
      // Kirim data baru
      profilePicture: user.profilePicture,
      coverPhoto: user.coverPhoto,
      bio: user.bio,
      location: user.location,
      interests: user.interests,
    });
  } else {
    res.status(404).json({ message: 'User tidak ditemukan' });
  }
};

// @desc    Update profil publik pengguna (Edit Profile)
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Hanya update data publik
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.bio = req.body.bio || user.bio;
    user.location = req.body.location || user.location;
    user.interests = req.body.interests || user.interests; // Asumsi frontend kirim array

    const updatedUser = await user.save();

    // Kirim data lengkap yang baru (termasuk token baru)
    res.json({
      _id: updatedUser._id,
      firstName: updatedUser.firstName,
      lastName: updatedUser.lastName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      profilePicture: updatedUser.profilePicture,
      coverPhoto: updatedUser.coverPhoto,
      bio: updatedUser.bio,
      location: updatedUser.location,
      interests: updatedUser.interests,
      token: generateToken(updatedUser._id), // Token baru jika info user di-encode
    });
  } else {
    res.status(404).json({ message: 'User tidak ditemukan' });
  }
};

// --- KONTROLER BARU UNTUK 'SETTINGS' (PRIVAT) ---

// @desc    Update data privat pengguna (Settings)
// @route   PUT /api/users/profile/settings
// @access  Private
const updateUserSettings = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // Validasi email baru jika diganti
    if (req.body.email && req.body.email !== user.email) {
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email sudah digunakan' });
      }
      user.email = req.body.email;
    }
    
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    const updatedUser = await user.save();
    
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      token: generateToken(updatedUser._id),
      message: 'Pengaturan berhasil diperbarui',
    });
  } else {
    res.status(404).json({ message: 'User tidak ditemukan' });
  }
};

// @desc    Update password pengguna
// @route   PUT /api/users/profile/password
// @access  Private
const updateUserPassword = async (req, res) => {
  const user = await User.findById(req.user._id);
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return res.status(400).json({ message: 'Password lama dan baru diperlukan' });
  }

  if (user && (await user.matchPassword(oldPassword))) {
    user.password = newPassword; // Hook .pre('save') akan otomatis hash
    await user.save();
    res.json({ message: 'Password berhasil diperbarui' });
  } else {
    res.status(401).json({ message: 'Password lama salah' });
  }
};

// --- KONTROLER BARU UNTUK UNGGAH FOTO ---

// @desc    Upload foto profil
// @route   POST /api/users/profile/upload-avatar
// @access  Private
const uploadProfilePicture = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
  }

  const user = await User.findById(req.user._id);
  if (user) {
    // Simpan path yang bisa diakses web
    user.profilePicture = `/${req.file.path.replace(/\\/g, '/')}`;
    const updatedUser = await user.save();
    
    res.json({
      message: 'Foto profil berhasil diunggah',
      profilePicture: updatedUser.profilePicture,
    });
  } else {
    res.status(404).json({ message: 'User tidak ditemukan' });
  }
};

// @desc    Upload foto sampul (banner)
// @route   POST /api/users/profile/upload-cover
// @access  Private
const uploadCoverPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Tidak ada file yang diunggah' });
  }

  const user = await User.findById(req.user._id);
  if (user) {
    user.coverPhoto = `/${req.file.path.replace(/\\/g, '/')}`;
    const updatedUser = await user.save();
    
    res.json({
      message: 'Foto sampul berhasil diunggah',
      coverPhoto: updatedUser.coverPhoto,
    });
  } else {
    res.status(404).json({ message: 'User tidak ditemukan' });
  }
};


export {
  getUserProfile,
  updateUserProfile,
  updateUserSettings,
  updateUserPassword,
  uploadProfilePicture,
  uploadCoverPhoto,
};