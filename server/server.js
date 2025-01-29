// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const SUMUP_CLIENT_ID = process.env.SUMUP_CLIENT_ID;
const SUMUP_CLIENT_SECRET = process.env.SUMUP_CLIENT_SECRET;
const SUMUP_ACCESS_TOKEN = process.env.SUMUP_ACCESS_TOKEN;

app.post('/create-checkout', async (req, res) => {
  try {
    const { amount, currency, pay_to_email, description, reference_id } = req.body;
    
    // Create checkout on SumUp
    const response = await axios.post(
      'https://api.sumup.com/v0.1/checkouts',
      {
        amount,
        currency,
        pay_to_email,
        description,
        reference_id,
        return_url: 'https://jiraffle.jconnolly.tech/confirmation', 
      },
      {
        headers: {
          Authorization: `Bearer ${SUMUP_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Error creating checkout:', error);
    res.status(500).json({ error: 'Failed to create checkout' });
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