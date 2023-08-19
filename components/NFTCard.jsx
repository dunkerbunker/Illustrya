import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const NFTCard = ({ nft }, isProfile) => {
  const { nftCurrency, currentAccount } = useContext(NFTContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isLiked, setIsLiked] = useState(false);
  const [nickname, setNickname] = useState('');

  const baseURL = 'http://localhost:3000';
  const walletAddress = currentAccount;

  const initializeNFT = async () => {
    try {
      const token = nft.tokenid;
      const response = await axios.get(`${baseURL}/nfts/?`, { params: { token } });
      // Check if currentAccount is in the likedBy list
      if (response.data[0].likedBy.includes(currentAccount)) {
        setIsLiked(true);
      } else {
        setIsLiked(false);
      }
    } catch (error) {
      console.error('Error initializing NFT:', error);
    }
  };

  const handleLike = async (e, tokenID) => {
    e.preventDefault();

    try {
      if (!isLiked) {
        // Increment the likes count
        setIsLiked(true);

        // Make a POST request to your server to like the NFT
        try {
          const response = await axios.post(`${baseURL}/nfts/like`, { tokenID, walletAddress });
          console.log(response.data); // Log the response data
        } catch (error) {
          console.error('Error liking NFT:', error);
          // If liking the NFT returns an error, attempt to initialize it and then retry liking
          try {
            const initResponse = await axios.post(`${baseURL}/nfts/initialize`, { tokenID });
            console.log('Initialized NFT:', initResponse.data); // Log the initialized NFT
            // Retry the like action after initialization
            const retryLikeResponse = await axios.post(`${baseURL}/nfts/like`, { tokenID, walletAddress });
            console.log(retryLikeResponse.data); // Log the response data after retrying like
          } catch (initError) {
            console.error('Error initializing NFT:', initError);
          }
        }
      } else {
        setIsLiked(false);

        // Make a DELETE request to your server to unlike the NFT
        try {
          const response = await axios.delete(`${baseURL}/nfts/like`, { data: { tokenID, walletAddress } });
          console.log(response.data); // Likes count from the server
        } catch (error) {
          console.error('Error unliking NFT:', error);
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${nft.previousOwners[nft.previousOwners.length - 1]}`);
      const userData = response.data;

      // Update name if it exists
      if (userData.nickname) {
        setNickname(userData.nickname);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    // Initialize the NFT
    initializeNFT();

    // Fetch user data
    fetchUserData();

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Link href={{ pathname: '/nft-details', query: nft }}>
      <div className={`flex flex-row items-stretch bg-white dark:bg-nft-black-3 rounded-3xl m-4 shadow-md mx-auto h-100 lg:ml-1 ${isProfile ? 'w-full' : 'max-w-4xl'}`}>

        {/* <div className="flex flex-row items-stretch bg-white dark:bg-nft-black-3 rounded-3xl m-4 shadow-md mx-auto max-w-4xl h-100 ml-6 lg:ml-1"> */}

        {/* Image section */}
        <div style={{ width: '25vh', height: '30vh' }} className="relative rounded-l-3xl overflow-hidden nftCardResponsive">  {/* <-- Set a fixed width and height using inline styles */}
          <img
            src={nft.image || images[`nft${nft.i}`]}
            objectFit="cover" // This ensures the image covers the container
            alt={`nft-${nft.name}`}
            className="w-full h-full rounded-l-3xl"
          />
        </div>

        {/* Details section */}
        <div className="flex-1 flex flex-col justify-between pl-4 mt-3 mr-3 mb-6">
          <div>
            {/* Title */}
            <p className="font-poppins dark:text-white text-nft-black-1 font-bold text-2xl mb-2 capitalize">
              {nft.name}
            </p>

            <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mb-5">
              By: {nickname || shortenAddress(nft.previousOwners[nft.previousOwners.length - 1])}
            </p>

            <hr className="dark:border-gray-700 mb-3 border-t-2" />

            {/* Description with line clamp */}
            <p className="font-poppins dark:text-white text-nft-black-1 line-clamp-3 mb-2 sm:text-xs">
              {nft.description}
            </p>
          </div>

          {/* Owner and Sale Info */}
          <div className="flex justify-between items-center">
            <span className="font-poppins dark:text-white text-nft-black-1 sm:text-xs">
              <span className="font-poppins dark:text-white text-nft-black-1 font-semibold">
                {`${nftCurrency}    `}
              </span>
              {nft.price}
            </span>
            <div className="flex items-center">
              <span className="cursor-pointer ml-2 mr-3" onClick={(e) => handleLike(e, nft.tokenid)}>
                {/* {likes} */}
                {/* Render the appropriate heart icon based on the like count */}
                {isLiked ? (
                  <Image
                    src={images.redHeart}
                    width={38}
                    height={38}
                    objectFit="contain"
                    alt="Red Heart"
                  />
                ) : (
                  <>
                    <div className="block dark:hidden">
                      <Image
                        src={images.whiteHeart}
                        width={38}
                        height={38}
                        objectFit="contain"
                        alt="White Heart"
                      />
                    </div>
                    <div className="hidden dark:block">
                      <Image
                        src={images.whiteHeartDark}
                        width={38}
                        height={38}
                        objectFit="contain"
                        alt="White Heart"
                      />
                    </div>
                  </>
                )}
              </span>
              <span className={`font-semibold px-3 py-1 rounded-full ${nft.isAvailableForPurchase ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                {windowWidth <= 768 ? (
                  <Image
                    src={images.leftArrow}
                    width={30}
                    height={25}
                    objectFit="contain"
                    alt="arrow"
                  />
                ) : nft.isAvailableForPurchase ? 'For Sale' : 'Sold'}
              </span>
            </div>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
