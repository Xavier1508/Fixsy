// backend/controllers/postController.js
import Post from '../models/Post.js';

// @desc    Membuat postingan baru
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  // 1. Ambil data teks dari req.body
  const { content, postType, location, tags } = req.body;
  
  // 2. Validasi baru: Postingan harus punya teks ATAU gambar
  if (!content && !req.file) {
    return res.status(400).json({ message: 'Postingan tidak boleh kosong' });
  }

  try {
    // 3. Siapkan array media
    const mediaPaths = [];
    if (req.file) {
      // Kita simpan path yang bisa diakses web, bukan path sistem file
      // Contoh: /uploads/media-12345.png
      mediaPaths.push(`/${req.file.path.replace(/\\/g, '/')}`);
    }
    
    // 4. Siapkan array tags (asumsi frontend kirim ID terpisah koma)
    const tagsArray = tags ? tags.split(',').map(tagId => tagId.trim()) : [];

    const post = new Post({
      user: req.user._id,
      content: content || '', // Beri string kosong jika tidak ada konten
      postType: postType || 'text',
      media: mediaPaths,
      location: location || '',
      tags: tagsArray,
    });

    const createdPost = await post.save();
    
    // 5. Populate data user (TETAP SAMA)
    const populatedPost = await Post.findById(createdPost._id).populate(
      'user',
      'firstName lastName'
    );
    
    // 6. Emit via Socket.io (TETAP SAMA)
    req.io.emit("new_post", populatedPost);
    
    res.status(201).json(populatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mendapatkan semua postingan (untuk MainFeed)
// @route   GET /api/posts
// @access  Private
const getPosts = async (req, res) => {
  // Fungsi ini tidak perlu diubah, sudah sempurna.
  try {
    const posts = await Post.find({})
      .populate('user', 'firstName lastName') 
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createPost, getPosts };