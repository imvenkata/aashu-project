const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  startTime: {
    type: Date,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: Date,
    required: [true, 'Please add an end time']
  },
  location: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#6750A4'
  },
  icon: {
    type: String
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: {
    type: {
      frequency: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
      },
      interval: {
        type: Number,
        default: 1
      },
      daysOfWeek: {
        type: [Number]
      },
      endDate: {
        type: Date
      },
      count: {
        type: Number
      }
    }
  },
  reminderTime: {
    type: Date
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
EventSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Event', EventSchema);
