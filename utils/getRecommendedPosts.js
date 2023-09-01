import axios from 'axios';
import { useContext } from 'react';

import { NFTContext } from '../context/NFTContext';

export const fetchNFTsByRecommendation = async (nfts) => {
  const { currentAccount } = useContext(NFTContext);
  try {
    // Get the followers of CurrentAccount
    console.log('CurrentAccount', currentAccount);

    const response = await axios.get(`http://localhost:3000/users/${currentAccount}`);

    console.log('data', response);

    // Check if the 'followers' property exists in the response data
    if (!response.data || !response.data.followers) {
      console.error('Followers data not found in the response.');
      return [];
    }

    const { followers } = response.data;

    // Filter NFTs created or being sold by followed users
    const filteredNFTs = nfts.filter((nft) => {
      // Check if the seller is in the list of followers
      const sellerIsFollowed = followers.includes(nft.seller.toLowerCase());

      // Check if the last previous owner is in the list of followers
      const lastOwnerIsFollowed = nft.previousOwners.length > 0 && followers.includes(nft.previousOwners[nft.previousOwners.length - 1].toLowerCase());

      // Keep the NFT if either the seller or last owner is followed
      return sellerIsFollowed || lastOwnerIsFollowed;
    });

    console.log('hi');

    return filteredNFTs;
  } catch (error) {
    console.error('Error fetching NFTs:', error);
    // return an empty array if there's an error
    return [];
  }
};
