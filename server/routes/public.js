const express = require('express');
const router = express.Router();
const sumup = require('../config/sumup');
const Entry = require('../models/Entry');

router.post('/checkout', async (req, res) => {
  try {
    const checkoutId = await sumup.createCheckout(
      req.body.amount,
      'Raffle Entry Purchase'
    );
    
    // Reserve numbers
    const entry = await Entry.findOneAndUpdate(
      { numbers: req.body.numbers, paymentStatus: 'pending' },
      { $set: { checkoutId, reservedUntil: new Date(Date.now() + 300000) } },
      { new: true, upsert: true }
    );

    res.json({ checkoutId, entryId: entry._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;