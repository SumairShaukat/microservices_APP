const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const orderRoutes = require('./routes/orderRoute')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api', orderRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Order Processing Service running on port ${PORT}`);
});