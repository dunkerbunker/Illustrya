import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Image from 'next/image';

import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';
// import { fetchNFTsByRecommendation } from '../utils/getRecommendedPosts';

const ForYou = () => {
  const { fetchNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [followingUsers, setFollowingUsers] = useState([]);
  const [followingUsersNames, setFollowingUsersNames] = useState([]); // ['user1', 'user2'
  const [followingUsersImages, setFollowingUsersImages] = useState([]); // ['user1', 'user2'
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

        console.log('following', following);

        // Create an array of promises for fetching user data
        const userPromises = following.map(async (user) => {
          const userResponse = await axios.get(`http://localhost:3000/users/${user}`);

          return userResponse.data;
        });

        // Use Promise.all to fetch user data for all following users in parallel
        const userDataArray = await Promise.all(userPromises);

        // Process the responses and populate names and profileImages arrays
        const names = [];
        const profileImages = [];

        userDataArray.forEach((userData) => {
          console.log('userData', userData);
          if (userData) {
            if (userData.nickname) {
              const { nickname } = userData;

              const userName = nickname || null;

              names.push(userName);
            }

            if (userData.profileImage) {
              const { profileImage, profileImageType } = userData;

              const userImage = profileImage ? `data:${profileImageType};base64,${profileImage}` : null;

              console.log('userImage', userImage);

              // (`data:${profileImageType};base64,${userData.profileImage}`);
              profileImages.push(userImage);
            }
          } else {
            // If user data is not found, add null values
            names.push(null);
            profileImages.push(null);
          }
        });

        console.log('names', names);
        console.log('profileImages', profileImages);

        // Set the state with the collected data
        setFollowingUsersNames(names);
        setFollowingUsersImages(profileImages);

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
          Nothing to see here!
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
        <div className="mt-12 mb-12 flex overflow-x-auto relative">
          <div className="flex">
            {followingUsers.map((user, index) => (
              <div
                key={index}
                className="mr-4 mb-10 flexCenter w-32 h-32 p-1 bg-nft-black-2 rounded-full relative"
              >
                {followingUsersImages[index] ? (
                  <img
                    src={followingUsersImages[index]}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={images.creator1}
                    className="rounded-full"
                    objectFit="cover"
                  />
                )}

                <h1 className="absolute top-28 pt-1 pb-1 left-0 right-0 text-center font-poppins text-white font-semibold text-sm bg-nft-black-2 rounded-lg">
                  {followingUsersNames[index] || shortenAddress(user)}
                </h1>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-poppins dark:text-white text-nft-black-1 text-2xl font-semibold mt-2 ml-4 sm:ml-2">
          Artworks from the people you follow!
        </h2>
        <div className="mt-9 w-full grid grid-cols-2 md:grid-cols-1 gap-7">
          {/* map through the nfts and render a card for each one */}
          {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} />)}
        </div>
      </div>
    </div>
  );
};

export default ForYou;
