const mongoose = require('mongoose');

const TimerSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true
  },
  duration: {
    type: Number, // in minutes
    required: [true, 'Please add a duration'],
    min: 1
  },
  type: {
    type: String,
    enum: ['focus', 'break', 'custom'],
    default: 'focus'
  },
  color: {
    type: String,
    default: '#6750A4'
  },
  icon: {
    type: String,
    default: '🧠'
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
TimerSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Timer', TimerSchema);
