import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const NFTCard = ({ nft }) => {
  const { nftCurrency } = useContext(NFTContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [likes, setLikes] = useState(0); // Track the number of likes
  const [isLiked, setIsLiked] = useState(false);

  // const handleLike = () => {
  //   if (!isLiked) {
  //     setLikes(likes + 1);
  //   } else {
  //     setLikes(likes - 1);
  //   }
  //   setIsLiked(!isLiked);
  // };

  const handleLike = async (e, tokenID) => {
    e.preventDefault();
    const baseURL = 'http://localhost:3000'; // Update the base URL to your server's URL

    try {
      if (!isLiked) {
        // Increment the likes count
        setLikes(likes + 1);
        setIsLiked(true);

        // Make a POST request to your server to like the NFT
        try {
          const response = await axios.post(`${baseURL}/nfts/like`, { tokenID });
          console.log(response.data); // Log the response data
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // If the NFT does not exist, initialize it and then proceed with the like action
            try {
              const initResponse = await axios.post(`${baseURL}/nfts/initialize`, { tokenID });
              console.log('Initialized NFT:', initResponse.data); // Log the initialized NFT
              // Now, perform the like action again after initialization
              const likeResponse = await axios.post(`${baseURL}/nfts/like`, { tokenID });
              console.log(likeResponse.data); // Log the response data after like
            } catch (initError) {
              console.error('Error initializing NFT:', initError);
            }
          } else {
            console.error('Error liking NFT:', error);
          }
        }
      } else {
        // Decrement the likes count
        setLikes(likes - 1);
        setIsLiked(false);

        // Make a DELETE request to your server to unlike the NFT
        try {
          const response = await axios.delete(`${baseURL}/nfts/like`, { data: { tokenID } });
          console.log(response.data); // Likes count from the server
        } catch (error) {
          console.error('Error unliking NFT:', error);
        }
      }
    } catch (error) {
      console.error('Error handling like:', error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // console.log(nft);

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Link href={{ pathname: '/nft-details', query: nft }}>
      <div className="flex flex-row items-stretch bg-white dark:bg-nft-black-3 rounded-3xl m-4 shadow-md mx-auto max-w-4xl h-100 ml-6 lg:ml-1">

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
              by: {shortenAddress(nft.owner)}
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
                {likes > 0 ? (
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
                    height={13}
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
