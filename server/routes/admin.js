const express = require('express');
const router = express.Router();
const { authenticate, isAdmin } = require('../middleware/auth');
const Entry = require('../models/Entry');

router.get('/entries', authenticate, isAdmin, async (req, res) => {
  const entries = await Entry.find().sort('-createdAt');
  res.json(entries);
});

router.post('/draw', authenticate, isAdmin, async (req, res) => {
  const winners = await Entry.aggregate([
    { $match: { paymentStatus: 'completed' } },
    { $sample: { size: 5 } } // Draw 5 winners
  ]);
  
  res.json(winners);
});

module.exports = router;