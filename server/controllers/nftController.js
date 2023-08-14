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
  console.log('Received GET request to /nfts');
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
  const { tokenID } = req.body;
  try {
    const nft = await NFT.findOne({ tokenID_1: tokenID });
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }
    console.log('Found NFT:', nft);

    // Update the likesCount and save the document
    nft.likesCount = (nft.likesCount || 0) + 1;
    await nft.save();

    res.json({ likesCount: nft.likesCount });
  } catch (error) {
    console.error('Error liking NFT:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.unlikeNFT = async (req, res) => {
  console.log('Received POST request to /nfts/removelike');
  const { tokenID } = req.body;
  try {
    const nft = await NFT.findOne({ tokenID_1: tokenID }); // Use the correct field name
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }
    // eslint-disable-next-line no-plusplus
    nft.likesCount--;
    await nft.save();
    res.json({ likesCount: nft.likesCount });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Function to initialize an NFT with a given tokenID
exports.initializeNFT = async (req, res) => {
  console.log('Received POST request to /nfts/initialize');
  const { tokenID } = req.body; // Extract tokenID from form-data
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
