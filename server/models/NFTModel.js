const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  tokenID_1: { type: String, required: true },
  likesCount: { type: Number, default: 0 },
  likedBy: { type: Array, default: [] },
});

const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;
