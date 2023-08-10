import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { NFTContext } from '../context/NFTContext';
import images from '../assets';
import { Button, Loader } from '../components';

const ResellNFT = () => {
  const { createSale, isLoadingNFT, nftCurrency } = useContext(NFTContext);
  const router = useRouter();
  const { tokenId, tokenURI } = router.query;
  const [price, setPrice] = useState('');

  const [nft, setNFT] = useState(null);

  const fetchNFT = async () => {
    if (!tokenURI) return;

    const { data } = await axios.get(tokenURI);

    // Modify nft data before passing to NFTCard
    data.owner = 'You';

    setNFT(data);
    // setPrice(data.price);
  };

  useEffect(() => {
    if (tokenURI) fetchNFT();
  }, [tokenURI]);

  const resell = async () => {
    console.log(price, tokenURI, tokenId);
    await createSale(tokenURI, price, true, tokenId);
    router.push('/');
  };

  // load until the nfts are fetched
  if (isLoadingNFT || !nft) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center sm:px-4 p-12">
      <h1 className="font-poppins dark:text-white text-nft-black font-semibold text-3xl mb-6 text-center">
        Resell NFT
      </h1>

      {/* Center the NFT card */}
      <div className="flex justify-center mb-4 max-w-4xl w-full">
        <div className="flex flex-row items-stretch bg-white dark:bg-nft-black-3 rounded-3xl m-4 shadow-md mx-auto h-100"> {/* Remove width from here */}

          {/* Image section */}
          <div style={{ width: '25vh', height: '30vh' }} className="relative rounded-l-3xl overflow-hidden nftCardResponsive">
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
                by: You
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
                Choose your price!
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* Price input and Re-sell NFT button */}
      <div className="w-full flex items-center justify-center max-w-4xl"> {/* Use the same max-width as the card */}
        <div className="dark:bg-nft-black-1 bg-white border dark:border-nft-black-1 border-nft-gray-2 rounded-lg w-full outline-none font-poppins dark:text-white text-nft-gray-2 text-base mt-4 px-4 py-3 flexBetween flex-row">
          <input
            type="number"
            className="flex w-full dark:bg-nft-black-1 bg-white outline-none"
            placeholder="Enter price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl pl-3">{nftCurrency}</p>
        </div>
        <Button
          btnName="Re-Sell NFT"
          classStyles="rounded-xl ml-4 mt-4 sm:mt-0"
          handleClick={resell}
        />
      </div>

    </div>
  );
};

export default ResellNFT;
