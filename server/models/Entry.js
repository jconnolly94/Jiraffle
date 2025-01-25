const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  tableId: String,
  numbers: [Number],
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Entry', entrySchema);