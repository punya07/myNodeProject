const bcrypt = require('bcryptjs');
const userService = require('../services/userService');
const taskService = require('../services/taskService');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const phoneNumberRegex = /^\d{10}$/;

async function signUp(req, res) {
  try {
    
    const { firstName, lastName, email, phone, password } = req.body;
    const allowedFields = ['firstName', 'lastName', 'email', 'phone', 'password'];

    // Check for extra fields
    const extraFields = Object.keys(req.body).filter(field => !allowedFields.includes(field));
    if (extraFields.length > 0) {
      return res.status(400).json({ message: `Invalid fields: ${extraFields.join(', ')}` });
    }

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Validate phone number format
    if (!phoneNumberRegex.test(phone)) {
      return res.status(400).json({ message: 'Invalid phone number format. It should be a 10-digit number.' });
    }

    // Check if email or phone already exists
    let user = await userService.findUserByEmail(email);
    if (user) return res.status(400).json({ message: 'Email already exists' });

    user = await userService.findUserByPhone(phone);
    if (user) return res.status(400).json({ message: 'Phone number already exists' });

    // Create user
    const newUser = await userService.createUser({ firstName, lastName, email, phone, password });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "myjwtsecretkey", 
      { expiresIn: '10h' }
    );

    res.status(201).json({ message: 'User registered successfully', user: newUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || 'myjwtsecretkey',
      { expiresIn: '10h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

async function deleteUser(req, res) {
  try {
    const userId = req.userId;

    const user = await userService.findUserById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    await userService.deleteUserById(userId);

    res.status(200).json({ message: 'User and associated tasks deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = { signUp, login, deleteUser };
