//WR\backend\app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import dotenv from 'dotenv'; // for .env MongoDB URI
import noteRoutes from './routes/noteRoutes.js'; // Add .js extension for ES modules

dotenv.config(); // Load environment variables

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// ✅ MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/wheresrupee';
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once('open', () => console.log('✅ Connected to MongoDB'));
mongoose.connection.on('error', (err) => console.error('❌ MongoDB Error:', err));

// ✅ Routes
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));