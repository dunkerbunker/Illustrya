import React, { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';

import images from '../assets';
import { NFTContext } from '../context/NFTContext';
import { shortenAddress } from '../utils/shortenAddress';

const CreatorCard = ({ rank, creatorImage, creatorName, creatorEths, darkMode }) => {
  const { nftCurrency } = useContext(NFTContext);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [nickname, setNickname] = useState('');

  // Fetch user data by wallet address
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${creatorName}`);
      const userData = response.data;

      // Update profile image if it exists
      if (userData.profileImage) {
        const { profileImageType } = userData; // Correctly extract the MIME type
        // const profileImg = btoa(new Uint8Array(userData.profileImage).reduce((data, byte) => data + String.fromCharCode(byte), ''));

        setProfileImageBase64(`data:${profileImageType};base64,${userData.profileImage}`);
      }

      // Update name if it exists
      if (userData.nickname) {
        setNickname(userData.nickname);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Link href={`/profile/${creatorName}`}>
      <div className={`min-w-190 minlg:min-w-240 ${darkMode ? 'bg-nft-black-3' : 'dark:bg-nft-black-3 bg-white border-2 border-purple-500'}    dark:border-nft-black-3 border-nft-gray-1 rounded-3xl flex flex-col p-4 m-4`}>
        <div className="w-8 h-8 minlg:w-10 minlg:h-10 bg-nft-red-violet flexCenter rounded-full">
          <p className="font-poppins text-white font-semibold text-base minlg:text-lg">
            {rank}
          </p>
        </div>
        <div className="my-2 flex justify-center">
          {/* Image section start */}
          <div className="relative w-20 h-20 minlg:w-28 minlg:h-28">
            {profileImageBase64 ? (
              <img
                src={profileImageBase64}
                alt="Creator"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <Image
                src={creatorImage}
                layout="fill"
                objectFit="cover"
                alt="creatorName"
                className="rounded-full"
              />
            )}
            <div className="absolute w-4 h-4 minlg:w-7 minlg:h-7 bottom-2 -right-0">
              <Image
                src={images.tick}
                layout="fill"
                objectFit="contain"
                alt="tick"
              />
            </div>
          </div>
          {/* Image section end */}
        </div>
        <div className="mt-3 minlg:mt-7 text-center flexCenter flex-col">
          <p className={`font-poppins ${darkMode ? 'text-white' : 'dark:text-white'}  text-nft-black-1 font-semibold text-base`}>
            {nickname || shortenAddress(creatorName)}
          </p>
          <p className={`mt-1 font-poppins  ${darkMode ? 'text-white' : 'dark:text-white'} text-nft-black-1 font-semibold text-base`}>
            {creatorEths && creatorEths.toFixed(2)}
            <span className="font-normal"> {creatorEths ? nftCurrency : 'Not sold any yet'}</span>
          </p>
        </div>
      </div>
    </Link>

  );
};

export default CreatorCard;
