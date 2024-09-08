const Task = require('../models/task');

async function createTask(taskData) {
  return await Task.create(taskData);
}

async function findTaskById(taskId) {
  return await Task.findById(taskId);
}

async function findTasksByUserId(userId) {
  return await Task.find({ user: userId });
}

async function findAllTasks() {
  return await Task.find().populate('user');
}

async function updateTask(taskId, updateData) {
  return await Task.findByIdAndUpdate(taskId, updateData, { new: true });
}

async function deleteTaskById(taskId) {
  return await Task.findByIdAndDelete(taskId);
}

async function findTasksByUserId(userId) {
  return await Task.find({ user: userId }).populate('user');
}


module.exports = {
  createTask,
  findTasksByUserId,
  // findAllTasks,
  updateTask,
  deleteTaskById,
};
