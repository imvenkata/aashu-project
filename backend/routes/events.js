const express = require('express');
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  getEventsByDateRange
} = require('../controllers/events');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

router.route('/')
  .get(getEvents)
  .post(createEvent);

router.route('/:id')
  .get(getEvent)
  .put(updateEvent)
  .delete(deleteEvent);

router.route('/range/:startDate/:endDate')
  .get(getEventsByDateRange);

module.exports = router;
