// routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const hashPasswordMiddleware = require('../middleware/hashPasswordMiddleware'); // Import the middleware
const userAuthenticate = require('../middleware/userAuthenticate.Middleware');

const router = express.Router();

router.post('/signup', hashPasswordMiddleware, userController.signUp); // Use the middleware
router.post('/login', userController.login);
router.delete('/', userAuthenticate, userController.deleteUser);

module.exports = router;
