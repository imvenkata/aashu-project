const express = require('express');
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByDate,
  getTasksByStatus
} = require('../controllers/tasks');

const router = express.Router();

const { protect } = require('../middleware/auth');

// Apply protection to all routes
router.use(protect);

router.route('/')
  .get(getTasks)
  .post(createTask);

router.route('/:id')
  .get(getTask)
  .put(updateTask)
  .delete(deleteTask);

router.route('/date/:date')
  .get(getTasksByDate);

router.route('/status/:status')
  .get(getTasksByStatus);

module.exports = router;
