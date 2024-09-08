// middleware/hashPasswordMiddleware.js
const bcrypt = require('bcryptjs');

const hashPasswordMiddleware = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (password) {
      // Hash the password
      const saltRounds = 10;
      req.body.password = await bcrypt.hash(password, saltRounds);
    }

    next();
  } catch (error) {
    console.error('Hashing error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = hashPasswordMiddleware;
