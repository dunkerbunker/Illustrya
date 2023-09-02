const NFT = require('../models/NFTModel');

// Function to create a new NFT
exports.createNFT = async (tokenID) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const nft = new NFT({ tokenID_1: tokenID });
    await nft.save();
    return nft;
  } catch (error) {
    throw error;
  }
};

// Function to get all NFTs
exports.getAllNFTs = async (req, res) => {
  try {
    const nfts = await NFT.find();
    res.json(nfts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to like an NFT
exports.likeNFT = async (req, res) => {
  console.log('Received POST request to /nfts/like');
  const { tokenID, walletAddress } = req.body; // Extract wallet address from the request

  try {
    const nft = await NFT.findOne({ tokenID_1: tokenID });
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }
    console.log('Found NFT:', nft);

    // Check if the wallet address has already liked this NFT
    if (nft.likedBy.includes(walletAddress)) {
      return res.status(400).json({ error: 'NFT already liked by this wallet address' });
    }

    // Update the likesCount, add the wallet address to likedBy, and save the document
    nft.likesCount = (nft.likesCount || 0) + 1;
    nft.likedBy.push(walletAddress);
    await nft.save();

    res.json({ likesCount: nft.likesCount, likedBy: nft.likedBy });
  } catch (error) {
    console.error('Error liking NFT:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to unlike an NFT
exports.unlikeNFT = async (req, res) => {
  console.log('Received POST request to /nfts/removelike');
  const { tokenID, walletAddress } = req.body; // Extract wallet address from the request

  try {
    const nft = await NFT.findOne({ tokenID_1: tokenID });
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    // Check if the wallet address has liked this NFT
    if (!nft.likedBy.includes(walletAddress)) {
      return res.status(400).json({ error: 'NFT not liked by this wallet address' });
    }

    // Update the likesCount, remove the wallet address from likedBy, and save the document
    nft.likesCount = Math.max((nft.likesCount || 0) - 1, 0); // Ensure likesCount doesn't go below 0
    nft.likedBy = nft.likedBy.filter((address) => address !== walletAddress);
    await nft.save();

    res.json({ likesCount: nft.likesCount, likedBy: nft.likedBy });
  } catch (error) {
    console.error('Error unliking NFT:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to initialize an NFT with a given tokenID
exports.initializeNFT = async (req, res) => {
  console.log('Received POST request to /nfts/initialize');
  const { tokenID } = req.body; // Extract tokenID from form-data
  console.log('tokenID:', tokenID);
  try {
    if (!tokenID) {
      return res.status(400).json({ error: 'Token ID is missing in the request' });
    }

    let nft = await NFT.findOne({ tokenID_1: tokenID });

    if (!nft) {
      // If the NFT does not exist, create a new one with the given tokenID
      nft = new NFT({ tokenID_1: tokenID, likesCount: 0 });
      await nft.save();
      console.log('Created new NFT:', nft);
    } else {
      // If the NFT exists, update it (in this case, we're not changing likesCount)
      // The update is not strictly necessary in this scenario, but you can add it if needed
      // For this example, we're just returning the existing NFT as is
    }

    res.json(nft);
  } catch (error) {
    console.error('Error initializing NFT:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getNFT = async (req, res) => {
  const { tokenID } = req.params; // Extract tokenID from the request parameters
  console.log('Received GET request to /nfts/:tokenID', tokenID);

  try {
    // Find the NFT with the given tokenID
    const nft = await NFT.findOne({ tokenID_1: tokenID });

    if (!nft) {
      console.log('NFT not found:', tokenID);
      return res.status(404).json({ error: 'NFT not found' });
    }

    console.log('Found NFT:', nft);

    // Debug logs for additional information
    console.log('NFT from database:', nft);
    console.log('Token ID in database:', nft.tokenID_1);

    res.json(nft);
  } catch (error) {
    console.error('Error getting NFT:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
