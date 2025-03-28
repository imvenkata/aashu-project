const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Task = require('../models/Task');

// @desc    Get all tasks for a user
// @route   GET /api/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({ userId: req.user.id });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the task
  if (task.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to access this task`, 401)
    );
  }

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.userId = req.user.id;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task
  });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the task
  if (task.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to update this task`, 401)
    );
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: task
  });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user owns the task
  if (task.userId.toString() !== req.user.id) {
    return next(
      new ErrorResponse(`User not authorized to delete this task`, 401)
    );
  }

  await task.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get tasks by date
// @route   GET /api/tasks/date/:date
// @access  Private
exports.getTasksByDate = asyncHandler(async (req, res, next) => {
  const date = new Date(req.params.date);
  const nextDay = new Date(date);
  nextDay.setDate(date.getDate() + 1);

  const tasks = await Task.find({
    userId: req.user.id,
    $or: [
      {
        dueDate: {
          $gte: date,
          $lt: nextDay
        }
      },
      {
        startTime: {
          $gte: date,
          $lt: nextDay
        }
      }
    ]
  });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});

// @desc    Get tasks by status
// @route   GET /api/tasks/status/:status
// @access  Private
exports.getTasksByStatus = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({
    userId: req.user.id,
    status: req.params.status
  });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
});
