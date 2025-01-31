require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const axios = require('axios');

const app = express();

// Middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // List of allowed origins
      const allowedOrigins = [
        'http://localhost:3000', // Local development
        'https://jiraffle.jconnolly.tech', // Production frontend
      ];

      // Check if the origin is allowed
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies and credentials
  })
);
app.use(express.json());

// Create checkout endpoint
app.post('/create-checkout', async (req, res) => {
  try {
    const response = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      {
        ...req.body,
        merchant_code: process.env.SUMUP_MERCHANT_CODE,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SUMUP_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Checkout error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'Payment initialization failed',
      details: error.response?.data || error.message,
    });
  }
});

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Basic routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', version: '1.0.0' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});