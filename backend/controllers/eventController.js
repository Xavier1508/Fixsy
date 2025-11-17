// backend/controllers/eventController.js
import Event from '../models/Event.js';
import User from '../models/User.js';

// @desc    Membuat event baru
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  try {
    const { title, description, startDate, endDate, location, videoCallLink, category } = req.body;

    // 1. Validasi file sampul
    if (!req.file) {
      return res.status(400).json({ message: 'Foto sampul harus diunggah' });
    }
    const coverPhotoPath = `/${req.file.path.replace(/\\/g, '/')}`;

    // 2. Buat event baru
    const event = new Event({
      host: req.user._id,
      title,
      description,
      startDate,
      endDate: endDate || null, // Izinkan 'endDate' kosong
      location,
      videoCallLink,
      category,
      coverPhoto: coverPhotoPath,
    });

    const createdEvent = await event.save();

    // 3. Populate data host (pembuat)
    const populatedEvent = await Event.findById(createdEvent._id).populate(
      'host',
      'firstName lastName profilePicture'
    );

    // 4. Emit via socket (opsional, tapi bagus)
    req.io.emit('new_event', populatedEvent);

    res.status(201).json(populatedEvent);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Gagal membuat event', error: error.message });
  }
};

// @desc    Mengambil semua event YANG AKAN DATANG (Upcoming)
// @route   GET /api/events
// @access  Private
const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set ke awal hari ini

    // Logika filter:
    // Ambil event yang 'startDate'-nya lebih besar atau sama dengan hari ini
    const events = await Event.find({ startDate: { $gte: today } })
      .populate('host', 'firstName lastName profilePicture')
      .populate('going', 'firstName') // Ambil data siapa yang 'going'
      .populate('interested', 'firstName') // Ambil data siapa yang 'interested'
      .sort({ startDate: 1 }); // Urutkan dari yang paling dekat

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mengambil semua event YANG SUDAH LEWAT (Past)
// @route   GET /api/events/past
// @access  Private
const getPastEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({ startDate: { $lt: today } })
      .populate('host', 'firstName lastName profilePicture')
      .sort({ startDate: -1 }); // Urutkan dari yang terbaru (di masa lalu)

    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Mengambil detail satu event
// @route   GET /api/events/:id
// @access  Private
const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('host', 'firstName lastName profilePicture bio location')
      .populate('going', 'firstName lastName profilePicture')
      .populate('interested', 'firstName lastName profilePicture');
      
    if (event) {
      res.json(event);
    } else {
      res.status(404).json({ message: 'Event tidak ditemukan' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    RSVP ke sebuah event (Going / Interested / None)
// @route   PUT /api/events/:id/rsvp
// @access  Private
const rsvpToEvent = async (req, res) => {
  try {
    const { status } = req.body; // 'going', 'interested', atau 'none'
    const userId = req.user._id;

    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event tidak ditemukan' });
    }

    // 1. Hapus user dari KEDUA daftar (reset status)
    event.going = event.going.filter((id) => id.toString() !== userId.toString());
    event.interested = event.interested.filter((id) => id.toString() !== userId.toString());

    // 2. Tambahkan ke daftar yang sesuai
    if (status === 'going') {
      event.going.push(userId);
    } else if (status === 'interested') {
      event.interested.push(userId);
    }
    // Jika status === 'none', kita tidak melakukan apa-apa (sudah di-reset)

    await event.save();
    
    // Kirim balik data RSVP yang sudah di-update
    res.json({ 
      going: event.going,
      interested: event.interested
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ... (Nanti kita bisa tambahkan updateEvent dan deleteEvent di sini) ...

export {
  createEvent,
  getUpcomingEvents,
  getPastEvents,
  getEventById,
  rsvpToEvent,
};