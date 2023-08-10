import React, { useContext, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const NFTCard = ({ nft }) => {
  const { nftCurrency } = useContext(NFTContext);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    console.log(nft);

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
            <span className={`font-semibold px-3 py-1 rounded-full ${nft.isAvailableForPurchase ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
              {windowWidth <= 768 ? (
                <Image
                  src={images.leftArrow}
                  width={30} // or whatever size you want
                  height={13} // or whatever size you want
                  objectFit="contain"
                  alt="arrow"
                />
              ) : nft.isAvailableForPurchase ? 'For Sale' : 'Sold'}
            </span>
          </div>

        </div>
      </div>
    </Link>
  );
};

export default NFTCard;
