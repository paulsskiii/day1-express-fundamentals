const express = require('express');
const router = express.Router();
const { param } = require('express-validator');
const {
  getAllTasks, getTaskById, createTask, updateTask, deleteTask, forceDeleteTask,
} = require('../controllers/taskController');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');

const idParamValidation = [param('id').isMongoId().withMessage('Invalid id format')];

router.use(authenticate);

router.get('/', getAllTasks);
router.get('/:id', idParamValidation, validate, getTaskById);
router.post('/', createTask);
router.put('/:id', idParamValidation, validate, updateTask);
router.delete('/:id', idParamValidation, validate, deleteTask);
router.delete('/:id/force', authorize('admin'), forceDeleteTask);

module.exports = router;
