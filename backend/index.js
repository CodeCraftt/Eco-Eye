const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors=require('cors');


dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes.js');
const requestRoutes = require('./routes/requestRoutes.js');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
