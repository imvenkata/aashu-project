const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Music = require('../models/Music');

// @desc    Get all music tracks
// @route   GET /api/music
// @access  Private
exports.getAllMusic = asyncHandler(async (req, res, next) => {
  const music = await Music.find();

  res.status(200).json({
    success: true,
    count: music.length,
    data: music
  });
});

// @desc    Get single music track
// @route   GET /api/music/:id
// @access  Private
exports.getMusic = asyncHandler(async (req, res, next) => {
  const music = await Music.findById(req.params.id);

  if (!music) {
    return next(
      new ErrorResponse(`Music track not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: music
  });
});

// @desc    Create new music track
// @route   POST /api/music
// @access  Private (Admin only)
exports.createMusic = asyncHandler(async (req, res, next) => {
  const music = await Music.create(req.body);

  res.status(201).json({
    success: true,
    data: music
  });
});

// @desc    Update music track
// @route   PUT /api/music/:id
// @access  Private (Admin only)
exports.updateMusic = asyncHandler(async (req, res, next) => {
  let music = await Music.findById(req.params.id);

  if (!music) {
    return next(
      new ErrorResponse(`Music track not found with id of ${req.params.id}`, 404)
    );
  }

  music = await Music.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: music
  });
});

// @desc    Delete music track
// @route   DELETE /api/music/:id
// @access  Private (Admin only)
exports.deleteMusic = asyncHandler(async (req, res, next) => {
  const music = await Music.findById(req.params.id);

  if (!music) {
    return next(
      new ErrorResponse(`Music track not found with id of ${req.params.id}`, 404)
    );
  }

  await music.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});

// @desc    Get music by category
// @route   GET /api/music/category/:category
// @access  Private
exports.getMusicByCategory = asyncHandler(async (req, res, next) => {
  const music = await Music.find({ category: req.params.category });

  res.status(200).json({
    success: true,
    count: music.length,
    data: music
  });
});
