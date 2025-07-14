const mongoose = require('mongoose');
const { log } = require('../middlewares/logger');

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/urlshortener';
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    log('INFO', 'MongoDB connected', { uri });
  } catch (err) {
    log('ERROR', 'MongoDB connection error', { message: err.message });
    process.exit(1);
  }
};

module.exports = connectDB;
