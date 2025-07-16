const Admin = require('../models/Admin');

exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  try {
    const admin = await Admin.findOne({ username, password });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Invalid admin credentials' });
    }

    res.status(200).json({
      success: true,
      message: 'Admin login successful',
      admin: {
        _id: admin._id,
        username: admin.username
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error during admin login', error: err });
  }
};
