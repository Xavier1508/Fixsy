// backend/controllers/postController.js
import Post from '../models/Post.js';

// @desc    Membuat postingan baru
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  const { content, postType, media } = req.body;

  if (!content) {
    return res.status(400).json({ message: 'Konten tidak boleh kosong' });
  }

  try {
    const post = new Post({
      user: req.user._id, // Didapat dari middleware 'protect'
      content,
      postType: postType || 'text',
      media: media || [],
    });

    const createdPost = await post.save();
    // Kita populate data user agar bisa langsung ditampilkan di frontend
    const populatedPost = await Post.findById(createdPost._id).populate(
      'user',
      'firstName lastName'
    );
    
    res.status(201).json(populatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mendapatkan semua postingan (untuk MainFeed)
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
      .populate('user', 'firstName lastName') // Ambil data user yang posting
      .sort({ createdAt: -1 }); // Urutkan dari yang terbaru

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getPosts };