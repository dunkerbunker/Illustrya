const sharp = require('sharp');
const User = require('../models/UserModel');

// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { walletAddress, nickname, bio } = req.body;

    // Check if a user with the given wallet address already exists
    const existingUser = await User.findOne({ walletAddress });
    if (existingUser) {
      return res.status(400).json({ error: 'User with this wallet address already exists' });
    }

    const user = new User({ walletAddress, nickname, bio });

    if (req.files) {
      const { bannerImage, profileImage } = req.files;
      if (bannerImage) {
        user.bannerImage = bannerImage.data;
        user.bannerImageType = bannerImage.mimetype;
      }
      if (profileImage) {
        user.profileImage = profileImage.data;
        user.profileImageType = profileImage.mimetype;
      }
    }

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

    // Return image data as Base64 in the JSON response
    res.json({
      _id: user._id,
      walletAddress: user.walletAddress,
      nickname: user.nickname,
      bio: user.bio,
      bannerImage: user.bannerImage ? user.bannerImage.toString('base64') : null,
      profileImage: user.profileImage ? user.profileImage.toString('base64') : null,
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to modify a user's information
exports.modifyUser = async (req, res) => {
  const { walletAddress } = req.params;
  const { nickname, bio } = req.body;
  try {
    const user = await User.findOne({ walletAddress });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    user.nickname = nickname;
    user.bio = bio;

    // console.log(req);

    if (req.body.profileImage === 'delete') {
      user.profileImage = null;
      user.profileImageType = null;
    }

    if (req.body.bannerImage === 'delete') {
      user.bannerImage = null;
      user.bannerImageType = null;
    }

    if (req.files) {
      const { bannerImage, profileImage } = req.files;
      if (bannerImage) {
        // Compress and process the banner image
        const compressedBannerImage = await sharp(bannerImage.data)
          .resize(800, 400) // Resize the image to the desired dimensions
          .jpeg({ quality: 70 }) // Compress and save as JPEG format
          .toBuffer();

        user.bannerImage = compressedBannerImage;
        user.bannerImageType = 'image/jpeg'; // Set the MIME type accordingly
      }
      if (profileImage) {
        // Compress and process the profile image
        const compressedProfileImage = await sharp(profileImage.data)
          .resize(200, 200) // Resize the image to the desired dimensions
          .jpeg({ quality: 40 }) // Compress and save as JPEG format
          .toBuffer();

        user.profileImage = compressedProfileImage;
        user.profileImageType = 'image/jpeg'; // Set the MIME type accordingly
      }
    }

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
