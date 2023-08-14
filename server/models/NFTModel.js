const mongoose = require('mongoose');

const nftSchema = new mongoose.Schema({
  tokenID_1: { type: String, required: true, unique: true },
  likesCount: { type: Number, default: 0 },
});

const NFT = mongoose.model('NFT', nftSchema);

module.exports = NFT;
