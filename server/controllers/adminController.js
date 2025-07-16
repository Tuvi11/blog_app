const Admin = require('../models/Admin');

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    res.status(200).json({ message: 'Admin login successful', admin });
  } catch (err) {
    res.status(500).json({ error: 'Server error during admin login', details: err });
  }
};
