const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  const filter = { isDeleted: false };
  if (req.query.priority) filter.priority = req.query.priority;
  const tasks = await Task.find(filter);
  res.json({ success: true, data: tasks });
};

exports.getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task || task.isDeleted) {
    return res.status(404).json({ success: false, error: { message: 'Task not found', code: 'NOT_FOUND' } });
  }
  res.json({ success: true, data: task });
};

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ success: false, error: { message: 'Task not found', code: 'NOT_FOUND' } });
    }
    res.json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
  }
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, { isDeleted: true });
  if (!task) {
    return res.status(404).json({ success: false, error: { message: 'Task not found', code: 'NOT_FOUND' } });
  }
  res.status(204).send();
};
