const express = require('express');
const taskController = require('../controllers/taskController');
const userAuthenticate = require('../middleware/userAuthenticate.Middleware');

const router = express.Router();

router.post('/', userAuthenticate, taskController.createTask);
router.put('/:taskId', userAuthenticate, taskController.updateTask);
router.put('/complete/:taskId', userAuthenticate, taskController.completeTask);

router.delete('/:taskId', userAuthenticate, taskController.deleteTask);
router.get('/user', userAuthenticate, taskController.getTasksByUserId);


module.exports = router;
