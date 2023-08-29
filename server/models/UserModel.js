const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  nickname: { type: String },
  bio: { type: String },
  bannerImage: { type: Buffer }, // Store image data here
  bannerImageType: { type: String }, // Store image mime type here
  profileImage: { type: Buffer },
  profileImageType: { type: String },
  followers: [{ type: String }], // Array of wallet addresses of followers
  followersCount: { type: Number, default: 0 }, // Number of followers
});

const User = mongoose.model('User', userSchema);

module.exports = User;
