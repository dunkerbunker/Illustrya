const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true },
  nickname: { type: String },
  bio: { type: String },
  bannerImage: { type: String }, // Store image URLs here
  profileImage: { type: String },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
