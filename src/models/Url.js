const mongoose = require('mongoose');

const clickSchema = new mongoose.Schema(
  {
    timestamp: { type: Date, default: Date.now },
    referrer: String,
    ip: String,
    location: String,
  },
  { _id: false },
);

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortcode: { type: String, required: true, unique: true, index: true },
  expiry: { type: Date, required: true, index: { expireAfterSeconds: 0 } },
  createdAt: { type: Date, default: Date.now },
  clickCount: { type: Number, default: 0 },
  clicks: [clickSchema],
});

module.exports = mongoose.model('Url', urlSchema);
