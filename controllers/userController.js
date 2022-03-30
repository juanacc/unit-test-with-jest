const User = require('../model/user');

const handleSignUp = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }
    const newUser = await User.create({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password,
    });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: newUser,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message || 'something went wrong',
    });
  }
}

module.exports = {
  handleSignUp,
}