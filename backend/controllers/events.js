const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Event = require('../models/Event');

// @desc    Get all events for a user
// @route   GET /api/events
// @access  Private
exports.getEvents = asyncHandler(async (req, res, next) => {
  const events = await Event.find({ userId: req.user.id });

  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Private
exports.getEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the event
  if (event.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this event`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Create new event
// @route   POST /api/events
// @access  Private
exports.createEvent = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.userId = req.user.id;

  const event = await Event.create(req.body);

  res.status(201).json({
    success: true,
    data: event
  });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Private
exports.updateEvent = asyncHandler(async (req, res, next) => {
  let event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the event
  if (event.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this event`, 401)
    );
  }

  event = await Event.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: event
  });
});

// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Private
exports.deleteEvent = asyncHandler(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(
      new ErrorResponse(`Event not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the event
  if (event.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this event`, 401)
    );
  }

  await event.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get events by date range
// @route   GET /api/events/range/:startDate/:endDate
// @access  Private
exports.getEventsByDateRange = asyncHandler(async (req, res, next) => {
  const startDate = new Date(req.params.startDate);
  const endDate = new Date(req.params.endDate);

  const events = await Event.find({
    userId: req.user.id,
    $or: [
      // Events that start within the range
      {
        startTime: {
          $gte: startDate,
          $lte: endDate
        }
      },
      // Events that end within the range
      {
        endTime: {
          $gte: startDate,
          $lte: endDate
        }
      },
      // Events that span the entire range
      {
        startTime: { $lte: startDate },
        endTime: { $gte: endDate }
      }
    ]
  });

  res.status(200).json({
    success: true,
    count: events.length,
    data: events
  });
});
