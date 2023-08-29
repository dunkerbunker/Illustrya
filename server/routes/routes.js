const express = require('express');

const router = express.Router();
const nftController = require('../controllers/nftController');
const userController = require('../controllers/userController');

// NFT routes
router.get('/nfts', nftController.getAllNFTs);
router.post('/nfts/like', nftController.likeNFT);
router.delete('/nfts/like', nftController.unlikeNFT);
router.post('/nfts/initialize', nftController.initializeNFT);
router.get('/nfts/:tokenID', nftController.getNFT);

// User routes
router.get('/users', userController.getAllUsers);
router.get('/users/:walletAddress', userController.getUser);
router.post('/users', userController.createUser);
router.put('/users/:walletAddress', userController.modifyUser);
router.delete('/users/:walletAddress', userController.deleteUser);
router.post('/users/:walletAddress/follow', userController.followUser);
router.post('/users/:walletAddress/unfollow', userController.unfollowUser);

module.exports = router;
