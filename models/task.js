// // models/task.js
// const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');

// const taskSchema = new mongoose.Schema({
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   title: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   deadline: {
//     type: Date,
//     required: true,
//   },
//   priority: {
//     type: String,
//     enum: ['low', 'medium', 'hard'],
//     required: true,
//   },
//   status: {
//     type: String,
//     enum: ['completed', 'pending', 'delay-completed'],
//     // default: 'pending',
//   },
// });

// const Task = mongoose.model('Task', taskSchema);

// module.exports = Task;


//MVC pattern

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  deadline: { type: Date, required: true },
  priority: { type: String, required: true },
  status: { type: String, required: true },
});

module.exports = mongoose.model('Task', taskSchema);
