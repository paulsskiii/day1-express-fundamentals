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
    const task = await Task.create({ ...req.body, owner: req.user.id });
    res.status(201).json({ success: true, data: task });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, error: { message: 'Task not found', code: 'NOT_FOUND' } });
    }
    if (task.owner.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, error: { message: 'Not the owner of this task' } });
    }
    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(400).json({ success: false, error: { message: err.message, code: 'VALIDATION_ERROR' } });
  }
};

exports.deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, error: { message: 'Task not found', code: 'NOT_FOUND' } });
  }
  if (task.owner.toString() !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ success: false, error: { message: 'Not the owner of this task' } });
  }
  await Task.findByIdAndUpdate(req.params.id, { isDeleted: true });
  res.status(204).send();
};

exports.forceDeleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  if (!task) {
    return res.status(404).json({ success: false, error: { message: 'Task not found' } });
  }
  res.status(204).send();
};
