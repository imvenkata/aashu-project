const mongoose = require('mongoose');

const MusicSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['low-fi beats', 'celestial', 'groovy tunes', 'tiimo town', 'acoustics', 'other'],
    default: 'low-fi beats'
  },
  url: {
    type: String,
    required: [true, 'Please add a URL']
  },
  duration: {
    type: Number, // in seconds
    required: [true, 'Please add a duration']
  },
  artist: {
    type: String,
    trim: true
  },
  coverImage: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
MusicSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Music', MusicSchema);
