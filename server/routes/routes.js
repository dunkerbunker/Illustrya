const express = require('express');

const router = express.Router();
const nftController = require('../controllers/nftController');

router.get('/', nftController.getAllNFTs);
router.post('/like', nftController.likeNFT);
router.delete('/like', nftController.unlikeNFT);
router.post('/initialize', nftController.initializeNFT);
router.get('/:tokenID', nftController.getNFT);

module.exports = router;
