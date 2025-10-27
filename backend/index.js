// backend/index.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import businessRoutes from './routes/businessRoutes.js';
import chatRoutes from './routes/chatRoutes.js'; // Pastikan ini juga diimport

dotenv.config();
connectDB();

// PINDAHKAN INI KE ATAS
const app = express();

// Middleware sekarang di bawahnya
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('API Fixsy sedang berjalan...');
});

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/business', businessRoutes);
app.use('/api/chat', chatRoutes); // Pastikan ini juga dipakai

// Error Handling (Middleware)
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server berjalan di mode ${process.env.NODE_ENV} pada port ${PORT}`)
);