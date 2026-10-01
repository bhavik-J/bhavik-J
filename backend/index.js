import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import productRoutes from './routes/product.routes.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/products', productRoutes);
app.get('/health', (_req, res) => res.json({ success: true }));

const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  console.error('MONGODB_URI is required. Copy .env.example to .env and configure it.');
  process.exit(1);
}

mongoose.connect(mongoUri).then(() => app.listen(port, () => console.log(`API listening on ${port}`))).catch((error) => {
  console.error('MongoDB connection failed:', error.message);
  process.exit(1);
});

export default app;
