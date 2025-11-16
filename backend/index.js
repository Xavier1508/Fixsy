// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import chatRoutes from './routes/chatRoutes.js';
import http from 'http';
import { Server } from 'socket.io';

// --- TAMBAHAN BARU (Untuk __dirname di ES Modules) ---
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// --- AKHIR TAMBAHAN ---

dotenv.config();
connectDB();

const app = express();
const corsOptions = { /* ... (tetap sama) ... */ };

app.use(cors(corsOptions));
app.use(express.json());

// --- TAMBAHAN BARU (Untuk menangani form data) ---
app.use(express.urlencoded({ extended: true }));

// --- TAMBAHAN BARU (Menyajikan folder 'uploads' secara statis) ---
// Ini membuat file di 'backend/uploads' bisa diakses
// dari URL 'http://localhost:5000/uploads/namafile.png'
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// --- Setup Socket.io (TETAP SAMA) ---
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: corsOptions });
app.use((req, res, next) => {
  req.io = io;
  next();
});
io.on('connection', (socket) => {
  console.log(`Socket terhubung: ${socket.id}`);
  socket.on('disconnect', () => { /* ... */ });
});
// --- Akhir Setup Socket.io ---

// --- Routes (TETAP SAMA) ---
app.get('/', (req, res) => {
  res.send('API Fixsy sedang berjalan...');
});
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/chat', chatRoutes);

// --- Error Handler (TETAP SAMA) ---
app.use((err, req, res, next) => { /* ... */ });

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`Server berjalan di mode ${process.env.NODE_ENV} pada port ${PORT}`)
);