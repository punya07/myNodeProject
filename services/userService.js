const User = require('../models/user');
const Task = require('../models/task');

async function createUser(userData) {
  return await User.create(userData);
}

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function findUserByPhone(phone) {
  return await User.findOne({ phone });
}

async function findUserById(userId) {
  return await User.findById(userId);
}

async function deleteUserById(userId) {
  // First, delete the tasks associated with the user
  await Task.deleteMany({ user: userId });
  
  // Then, delete the user
  return await User.findByIdAndDelete(userId);
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserByPhone,
  findUserById,
  deleteUserById,
};
