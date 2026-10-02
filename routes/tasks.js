const express = require('express');
const router = express.Router();
const {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask, forceDeleteTask,
} = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

router.use(authenticate);

router.get('/', getAllTasks);
router.get('/:id', getTaskById);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.delete('/:id/force', authorize('admin'), forceDeleteTask);

module.exports = router;
