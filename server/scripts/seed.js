require('dotenv').config();
const mongoose = require('mongoose');
const Entry = require('../models/Entry');

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const sampleEntry = new Entry({
      tableId: '1',
      numbers: [7, 14, 21],
      paymentStatus: 'completed'
    });

    await sampleEntry.save();
    console.log('Database seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  }
}

seedDatabase();