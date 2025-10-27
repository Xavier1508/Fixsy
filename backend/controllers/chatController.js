// backend/controllers/chatController.js
import Chat from '../models/Chat.js'; // Menggunakan model Chat.js

// @desc    Memulai/Membuat percakapan baru
// @route   POST /api/chat
// @access  Private
// Mengganti nama fungsi createConversation -> createChat
const createChat = async (req, res) => {
  const { recipientId } = req.body; // ID user yang diajak chat

  if (!recipientId) {
    return res.status(400).json({ message: 'Recipient ID diperlukan' });
  }

  try {
    // Cek apakah percakapan antara 2 user ini sudah ada
    // Menggunakan Model Chat
    let chat = await Chat.findOne({
      participants: { $all: [req.user._id, recipientId] },
    }).populate('participants', '-password');

    if (chat) {
      // Jika sudah ada, kembalikan percakapan yang ada
      return res.status(200).json(chat);
    }

    // Jika belum ada, buat baru
    chat = new Chat({
      participants: [req.user._id, recipientId],
    });

    await chat.save();
    
    const newChat = await Chat.findById(chat._id)
      .populate('participants', '-password');

    res.status(201).json(newChat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mendapatkan semua percakapan user
// @route   GET /api/chat
// @access  Private
// Mengganti nama fungsi getConversations -> getChats
const getChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      participants: req.user._id,
    })
      .populate('participants', 'firstName lastName')
      .populate('lastMessage.sender', 'firstName')
      .sort({ updatedAt: -1 });

    res.json(chats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { createChat, getChats }; // Ekspor fungsi baru