const taskService = require('../services/taskService');
const userService = require('../services/userService');

async function createTask(req, res) {
  try {
    const { title, description, deadline, priority, status } = req.body;
    const userId = req.userId;

    if (!userId || !title || !description || !deadline || !priority || !status) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await userService.findUserById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const newTask = await taskService.createTask({
      user: userId,
      title,
      description,
      deadline,
      priority,
      status,
    });

    res.status(201).json({ message: 'Task created successfully', task: newTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateTask(req, res) {
  try {
    const { taskId } = req.params;
    const { title, description, deadline, priority, status } = req.body;

    const task = await taskService.findTaskById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.status === 'completed') {
      return res.status(400).json({ message: 'Cannot update a completed task' });
    }

    const updatedTask = await taskService.updateTask(taskId, {
      title,
      description,
      deadline,
      priority,
      status,
    });

    res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function completeTask(req, res) {
  try {
    const { taskId } = req.params;

    const task = await taskService.findTaskById(taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.status === 'completed' || task.status === 'delay-completed') {
      return res.status(400).json({ message: 'Task is already marked as completed' });
    }

    const currentDate = new Date();
    const deadlineDate = new Date(task.deadline);
    if (currentDate > deadlineDate) {
      task.status = 'delay-completed';
    } else {
      task.status = 'completed';
    }
3
    await task.save();

    res.status(200).json({ message: 'Task marked as completed', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function getTasksByUserId(req, res) {
  try {
    const userId = req.userId;
    const tasks = await taskService.findTasksByUserId(userId);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



async function deleteTask(req, res) {
  try {
    const { taskId } = req.params;

    const task = await taskService.findTaskById(taskId).lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (task.status === 'completed') {
      return res.status(400).json({ message: 'Cannot delete a completed task' });
    }

    await taskService.deleteTaskById(taskId);

    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  createTask,
  updateTask,
  completeTask,
  deleteTask,
  getTasksByUserId,
};
