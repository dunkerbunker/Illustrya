// pages/profile/[seller].js

import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import axios from 'axios';

import { NFTContext } from '../../context/NFTContext';
import { NFTCard, Loader, Banner, SearchBar } from '../../components';
import images from '../../assets';
import { shortenAddress } from '../../utils/shortenAddress';

const Profile = () => {
  const router = useRouter();
  const { user } = router.query;
  const { fetchNFTsOwned, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [listedNfts, setListedNfts] = useState([]);
  const [ownedNfts, setOwnedNfts] = useState([]);
  // const [listedNfts, setListedNfts] = useState([]);
  // const [listedNftsCopy, setListedNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSelect, setActiveSelect] = useState('Recently Added');

  const [isListedActive, setListedActive] = useState(true);
  const [isOwnedActive, setOwnedActive] = useState(true);

  const [bannerImageBase64, setBannerImageBase64] = useState(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  const handleListedButtonClick = () => {
    setListedActive(!isListedActive); // Toggle the Listed button state
    if (!isOwnedActive) {
      setOwnedActive(true); // Ensure at least one button is active
    }
  };

  const handleOwnedButtonClick = () => {
    setOwnedActive(!isOwnedActive); // Toggle the Owned button state
    if (!isListedActive) {
      setListedActive(true); // Ensure at least one button is active
    }
  };

  const initiateWalletIfConnected = async () => {
    if (currentAccount) {
      try {
        // Call the "Get User by Wallet Address" API
        // console.log(currentAccount);
        await axios.get(`http://localhost:3000/users/${currentAccount}`);
      } catch (error) {
        // console.log('Error getting user:', error);
        try {
          await axios.post('http://localhost:3000/users', {
            walletAddress: currentAccount,
          });
          // console.log('User created successfully.');
        } catch (error2) {
          // console.log('Error creating user:', error);
        }
      }
    }
  };

  useEffect(() => {
    // Fetch both sets of NFTs
    Promise.all([
      // fetchMyNFTsOrListedNFTs(),
      // fetchMyNFTsOrListedNFTs('fetchItemsListed'),
      fetchNFTsOwned(user, 'owned'),
      fetchNFTsOwned(user, 'listed'),
    ])
      .then(([ownedNFTs, listedNFTs]) => {
        setNfts([...ownedNFTs, ...listedNFTs]);
        setNftsCopy([...ownedNFTs, ...listedNFTs]);
        setListedNfts(listedNFTs);
        setOwnedNfts(ownedNFTs);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (isListedActive && isOwnedActive) {
      setNfts(nftsCopy); // Show all NFTs
    } else if (isListedActive) {
      setNfts(listedNfts); // Only show listed NFTs
    } else if (isOwnedActive) {
      setNfts(ownedNfts); // Only show owned NFTs
    }
    // console.log('nfts', nfts);
  }, [isListedActive, isOwnedActive]);

  useEffect(() => {
    initiateWalletIfConnected();

    // Fetch user data by wallet address
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${user}`);
        const userData = response.data;

        // Update banner image if it exists
        if (userData.bannerImage) {
          const { bannerImageType } = userData; // Correctly extract the MIME type
          // const bannerImg = btoa(new Uint8Array(userData.bannerImage).reduce((data, byte) => data + String.fromCharCode(byte), ''));

          setBannerImageBase64(`data:${bannerImageType};base64,${userData.bannerImage}`);
        }

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

        // Update description if it exists
        if (userData.bio) {
          setDescription(userData.bio);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user]);

  useEffect(() => {
    const sortedNfts = [...nfts];
    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        // console.log('sortedNfts', sortedNfts);
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        // console.log('sortedNfts', sortedNfts);
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
        // console.log('sortedNfts', sortedNfts);
        break;
      default:
        setNfts(nfts);
        break;
    }
  }, [activeSelect]);

  // load until the nfts are fetched
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  const onHandleSearch = (value) => {
    // name object is immediatly destructured from the nft object
    // and used for filtering. does not matter if lowercase or uppercase
    // thus all is made into lower for search
    const filteredNfts = nfts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));

    if (filteredNfts.length) {
      setNfts(filteredNfts);
    } else {
      setNfts(nftsCopy);
    }
  };

  const onClearSearch = () => {
    if (nfts.length && nftsCopy.length) {
      setNfts(nftsCopy);
    }
  };

  return (
    <div className="w-full flex justify-start items-center flex-col min-h-screen">
      <div className="w-full flexCenter flex-col">
        {bannerImageBase64 ? (
          <Banner
            imageSrc={bannerImageBase64}
          />
        ) : (
          <Banner
            name="Your Arty Art"
            childStyles="text-center mb-4 relative"
            parentStyles="h-80 justify-center relative"
          />
        )}
        <div className="flexCenter flex-col -mt-20 z-0">
          <div className="relative">
            <div className="flex justify-center items-end">
              <div className="flexCenter w-40 h-40 sm:w-36 sm:h-36 p-1 bg-nft-black-2 rounded-full relative">
                {profileImageBase64 ? (
                  <img
                    src={profileImageBase64}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src={images.creator1}
                    className="rounded-full object-cover"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>
          </div>

          <p className="font-poppins dark:text-white text-nft-black-1 font-bold text-3xl mt-5">
            {/* get shortened address of the current account */}
            {nickname || shortenAddress(user)}
          </p>

          <p className="font-poppins dark:text-white text-nft-black-1 font-light text-xl mt-6 text-center w-full">
            <span className="text-center" style={{ textAlign: 'center', display: 'block', margin: '0 auto' }}>
              {description && description.length > 128 ? `${description.slice(0, 128)}...` : description || 'No description provided'}
            </span>
          </p>

          <div className="flex mt-10">
            <button
              type="button"
              className={`${isListedActive ? 'nft-gradient' : 'nft-bg-black-2'} text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white mx-2 rounded-xl`}
              onClick={handleListedButtonClick}
            >
              Listed Artworks
            </button>
            <button
              type="button"
              className={`${isOwnedActive ? 'nft-gradient' : 'nft-bg-black-2'} text-sm minlg:text-lg py-2 px-6 minlg:px-8 font-poppins font-semibold text-white mx-2 rounded-xl`}
              onClick={handleOwnedButtonClick}
            >
              Owned Artworks
            </button>
          </div>

        </div>
      </div>

      {!isLoading && !nfts.length && !nftsCopy.length ? (
        // if there are no nfts, show a message
        <div className="flexCenter sm:p-4 p-16">
          {user ? (
            <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
              No NFTs Owned
            </h1>
          ) : (
            <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
              Connect Wallet to view your profile
            </h1>
          )}
        </div>
      ) : (
        // if there are nfts, show this
        <div className="sm:px-4 p-12 w-full minmd:w-4/5 flexCenter flex-col">
          <div className="flex-1 w-full flex flex-row sm:flex-col px-4 xs:px-0 minlg:px-8">
            <SearchBar
              activeSelect={activeSelect}
              setActiveSelect={setActiveSelect}
              handleSearch={onHandleSearch}
              clearSearch={onClearSearch}
            />
          </div>
          <div className="mt-3 w-full flex flex-wrap">
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} isProfile />)}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
