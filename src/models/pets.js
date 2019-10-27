const mongoose = require('mongoose');

const Pet = mongoose.model('Pet', {
  description: {
    type: String,
    required: true,
    trim: true
  },
  latitude: {
    type: String,
    required: true,
    trim: true
  },
  longitude: {
    type: String,
    required: true,
    trim: true
  },
  time_lost: {
    type: Date,
    default: Date.now(),
    required: true,
    trim: true
  },
  time_found: {
    type: Date,
    default: Date.now(),
    required: false,
    trim: true
  },
  image_url: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = Pet;
