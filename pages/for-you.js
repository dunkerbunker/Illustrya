import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';

import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader } from '../components';
import images from '../assets';
// import { fetchNFTsByRecommendation } from '../utils/getRecommendedPosts';

const ForYou = () => {
  const { fetchNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]); // [0x123, 0x456, 0x789]
  const [isLoading, setIsLoading] = useState(true);

  const initiateWalletIfConnected = async () => {
    if (currentAccount) {
      try {
        await axios.get(`http://localhost:3000/users/${currentAccount}`);
      } catch (error) {
        // console.log('Error getting user:', error);
        try {
          await axios.post('http://localhost:3000/users', {
            walletAddress: currentAccount,
          });
          console.log('User created successfully.');
        } catch (error2) {
          console.log('Error creating user:', error);
        }
      }

      try {
        // Get the followers of CurrentAccount
        // console.log('CurrentAccount', currentAccount);

        const response = await axios.get(`http://localhost:3000/users/${currentAccount}`);

        // console.log('data', response);

        // Check if the 'followers' property exists in the response data
        if (!response.data || !response.data.following) {
          console.error('Followers data not found in the response.');
          setNfts([]);
        }

        const { following } = response.data;

        setFollowingUsers(following);

        // console.log('following', following);

        const items = await fetchNFTs();

        // console.log('items', items);

        // Filter NFTs created or being sold by followed users
        const filteredNFTs = items.filter((nft) => {
          // Check if the seller is in the list of followers
          const sellerIsFollowed = following.map((item) => item.toLowerCase()).includes(nft.seller.toLowerCase());

          // Check if the last previous owner is in the list of followers
          const lastOwnerIsFollowed = nft.previousOwners.length > 0 && following.map((item) => item.toLowerCase()).includes(nft.previousOwners[nft.previousOwners.length - 1].toLowerCase());

          // Keep the NFT if either the seller or last owner is followed
          return sellerIsFollowed || lastOwnerIsFollowed;
        });

        // console.log('hi');

        setNfts(filteredNFTs);
      } catch (error) {
        console.error('Error fetching NFTs:', error);
        // return an empty array if there's an error
        setNfts([]);
      }
    }
  };

  useEffect(() => {
    initiateWalletIfConnected();
    setIsLoading(false);
  }, [currentAccount]);

  // load until the nfts are fetched
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  // if there are no nfts, show a message
  if (!isLoading && nfts.length === 0) {
    return (
      <div className="flexCenter sm:p-4 p-16 min-h-screen">
        <h1 className="font-poppins dark:text-white text-nft-black-1 text-3xl font-extrabold">
          No Art Listed for Sale
        </h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center sm:px-4 p-12 min-h-screen">
      <div className="w-full minmd:2-4/4">
        <h2 className="font-poppins dark:text-white text-nft-black-1 text-4xl font-semibold mt-2 ml-4 sm:ml-2">
          People you follow
        </h2>
        <div className="mt-12 mb-12 flex">
          {followingUsers.map((user, index) => (
            <div
              key={index} // Make sure to use a unique key for each item in the list
              className="mr-4 flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full relative"
            >
              <Image
                src={images.creator1} // Assuming user.profileImage contains the image URL
                className="rounded-full object-cover"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
        <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
          Artworks from the people you follow!
        </h2>
        <div className="mt-3 w-full flex flex-wrap justify-start md:justify-center">
          {/* map through the nfts and render a card for each one */}
          {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
        </div>
      </div>
    </div>
  );
};

export default ForYou;
