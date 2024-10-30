const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Signup request data:', req.body);

  try {
    // Check if the username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      console.error('Signup error: Username or email already exists'); // Log the error to the console
      return res.status(409).json({ message: 'Username or email already exists' }); // Conflict status
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during signup:', error); // Log the error details to the console
    res.status(500).json({ message: 'Error creating user', error }); // Respond with a server error
  }
};



exports.login = async (req, res) => {
  console.log('Login request data:', req.body); // Log the request data
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    console.log('Found user:', user); // Log the user found

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.status(200).json({ token });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Forgot Password Functionality
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false }); // User not found
    }
    return res.json({ success: true }); // User found
  } catch (error) {
    console.error('Error finding user:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};

// Reset Password Functionality
exports.resetPassword = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword; // Save the hashed password
    await user.save();

    return res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return res.status(500).json({ message: 'Server error' });
  }
};