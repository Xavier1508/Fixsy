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
import forSaleRoutes from './routes/forSaleRoutes.js'; // Dari langkah sebelumnya
import eventRoutes from './routes/eventRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ... (Konfigurasi 'uploads' statis Anda tetap sama) ...
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// ... (Konfigurasi Socket.io Anda tetap sama) ...
const httpServer = http.createServer(app);
const io = new Server(httpServer, { cors: corsOptions });
app.use((req, res, next) => {
  req.io = io;
  next();
});
io.on('connection', (socket) => {
  /* ... */
});

// --- Routes ---
app.get('/', (req, res) => {
  res.send('API Fixsy sedang berjalan...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/forsale', forSaleRoutes);
app.use('/api/events', eventRoutes);

// ... (Error Handler dan httpServer.listen Anda tetap sama) ...
app.use((err, req, res, next) => {
  /* ... */
});
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`Server berjalan di mode ${process.env.NODE_ENV} pada port ${PORT}`)
);