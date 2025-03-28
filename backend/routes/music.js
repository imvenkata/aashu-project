const express = require('express');
const {
  getAllMusic,
  getMusic,
  createMusic,
  updateMusic,
  deleteMusic,
  getMusicByCategory
} = require('../controllers/music');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

router.route('/')
  .get(getAllMusic)
  .post(createMusic);

router.route('/:id')
  .get(getMusic)
  .put(updateMusic)
  .delete(deleteMusic);

router.route('/category/:category')
  .get(getMusicByCategory);

module.exports = router;
