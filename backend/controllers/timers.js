const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Timer = require('../models/Timer');
const TimerSession = require('../models/TimerSession');

// @desc    Get all timers for a user
// @route   GET /api/timers
// @access  Private
exports.getTimers = asyncHandler(async (req, res, next) => {
  const timers = await Timer.find({ userId: req.user.id });

  res.status(200).json({
    success: true,
    count: timers.length,
    data: timers
  });
});

// @desc    Get single timer
// @route   GET /api/timers/:id
// @access  Private
exports.getTimer = asyncHandler(async (req, res, next) => {
  const timer = await Timer.findById(req.params.id);

  if (!timer) {
    return next(
      new ErrorResponse(`Timer not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the timer
  if (timer.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this timer`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: timer
  });
});

// @desc    Create new timer
// @route   POST /api/timers
// @access  Private
exports.createTimer = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.userId = req.user.id;

  const timer = await Timer.create(req.body);

  res.status(201).json({
    success: true,
    data: timer
  });
});

// @desc    Update timer
// @route   PUT /api/timers/:id
// @access  Private
exports.updateTimer = asyncHandler(async (req, res, next) => {
  let timer = await Timer.findById(req.params.id);

  if (!timer) {
    return next(
      new ErrorResponse(`Timer not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the timer
  if (timer.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this timer`, 401)
    );
  }

  timer = await Timer.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: timer
  });
});

// @desc    Delete timer
// @route   DELETE /api/timers/:id
// @access  Private
exports.deleteTimer = asyncHandler(async (req, res, next) => {
  const timer = await Timer.findById(req.params.id);

  if (!timer) {
    return next(
      new ErrorResponse(`Timer not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the timer
  if (timer.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this timer`, 401)
    );
  }

  await timer.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Start a timer session
// @route   POST /api/timers/:id/start
// @access  Private
exports.startTimerSession = asyncHandler(async (req, res, next) => {
  const timer = await Timer.findById(req.params.id);

  if (!timer) {
    return next(
      new ErrorResponse(`Timer not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the timer
  if (timer.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to use this timer`, 401)
    );
  }

  const timerSession = await TimerSession.create({
    userId: req.user.id,
    timerId: timer._id,
    startTime: Date.now()
  });

  res.status(201).json({
    success: true,
    data: timerSession
  });
});

// @desc    Complete a timer session
// @route   PUT /api/timers/sessions/:id/complete
// @access  Private
exports.completeTimerSession = asyncHandler(async (req, res, next) => {
  let timerSession = await TimerSession.findById(req.params.id);

  if (!timerSession) {
    return next(
      new ErrorResponse(`Timer session not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the timer session
  if (timerSession.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this timer session`, 401)
    );
  }

  timerSession = await TimerSession.findByIdAndUpdate(
    req.params.id,
    {
      endTime: Date.now(),
      completed: true,
      notes: req.body.notes || ''
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).json({
    success: true,
    data: timerSession
  });
});

// @desc    Get timer sessions for a user
// @route   GET /api/timers/sessions
// @access  Private
exports.getTimerSessions = asyncHandler(async (req, res, next) => {
  const timerSessions = await TimerSession.find({ userId: req.user.id })
    .populate('timerId')
    .sort({ startTime: -1 });

  res.status(200).json({
    success: true,
    count: timerSessions.length,
    data: timerSessions
  });
});

// @desc    Get timer sessions by date range
// @route   GET /api/timers/sessions/range/:startDate/:endDate
// @access  Private
exports.getTimerSessionsByDateRange = asyncHandler(async (req, res, next) => {
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.endDate);

  const timerSessions = await TimerSession.find({
    userId: req.user.id,
    startTime: {
      $gte: startDate,
      $lte: endDate
    }
  }).populate('timerId');

  res.status(200).json({
    success: true,
    count: timerSessions.length,
    data: timerSessions
  });
});
