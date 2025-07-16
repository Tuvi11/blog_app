const User = require('../models/User');

exports.registerUser = async (req, res) => {
  const { name, email } = req.body;

  try {
    const user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: 'User data saved', user });
  } catch (err) {
    res.status(500).json({ error: 'Error saving user data', details: err });
  }
};
