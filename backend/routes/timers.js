const express = require('express');
const {
  getTimers,
  getTimer,
  createTimer,
  updateTimer,
  deleteTimer,
  startTimerSession,
  completeTimerSession,
  getTimerSessions,
  getTimerSessionsByDateRange
} = require('../controllers/timers');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

router.route('/')
  .get(getTimers)
  .post(createTimer);

router.route('/:id')
  .get(getTimer)
  .put(updateTimer)
  .delete(deleteTimer);

router.route('/:id/start')
  .post(startTimerSession);

router.route('/sessions')
  .get(getTimerSessions);

router.route('/sessions/:id/complete')
  .put(completeTimerSession);

router.route('/sessions/range/:startDate/:endDate')
  .get(getTimerSessionsByDateRange);

module.exports = router;
