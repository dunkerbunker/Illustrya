const User = require('../models/UserModel');

// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { walletAddress, nickname, bio, bannerImage, profileImage } = req.body;
    const user = new User({
      walletAddress,
      nickname,
      bio,
      bannerImage,
      profileImage,
    });
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to get a specific user by wallet address
exports.getUser = async (req, res) => {
  const { walletAddress } = req.params;
  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to modify a user's information
exports.modifyUser = async (req, res) => {
  const { walletAddress } = req.params;
  const { nickname, bio, bannerImage, profileImage } = req.body;
  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.nickname = nickname;
    user.bio = bio;
    user.bannerImage = bannerImage;
    user.profileImage = profileImage;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error('Error modifying user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to delete a user
exports.deleteUser = async (req, res) => {
  const { walletAddress } = req.params;
  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    await user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
