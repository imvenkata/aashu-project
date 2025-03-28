const mongoose = require('mongoose');

const TimerSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  timerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Timer',
    required: true
  },
  startTime: {
    type: Date,
    required: true,
    default: Date.now
  },
  endTime: {
    type: Date
  },
  completed: {
    type: Boolean,
    default: false
  },
  notes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('TimerSession', TimerSessionSchema);
