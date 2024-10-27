import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
 import errorHandler from './utils/errorHandler.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/products', productRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
