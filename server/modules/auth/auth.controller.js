// Add this to server/modules/auth/auth.controller.js

// @desc    Check if email exists
// @route   POST /api/auth/check-email
exports.checkEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    
    // Return true if user exists, false if new
    res.json({ exists: !!user }); 
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};