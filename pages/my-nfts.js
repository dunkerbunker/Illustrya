import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import axios from 'axios';

import { useDropzone } from 'react-dropzone';
import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Banner, SearchBar, Modal, Button } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const MyNFTs = () => {
  const { fetchMyNFTsOrListedNFTs, currentAccount } = useContext(NFTContext);
  const [nfts, setNfts] = useState([]);
  const [nftsCopy, setNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSelect, setActiveSelect] = useState('Recently Added');

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const [bannerImageBase64, setBannerImageBase64] = useState(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);

  const { theme } = useTheme();

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

  const handleBannerOpenModal = () => {
    setIsBannerModalOpen(true);
  };

  const handleBannerCloseModal = () => {
    setIsBannerModalOpen(false);
  };

  const handleBannerSubmit = async () => {
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('bannerImage', selectedFile);

    try {
      const response = await axios.put(`http://localhost:3000/users/${currentAccount}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file upload
        },
      });

      if (response.status === 200) {
        console.log('Banner image updated successfully.');
        // Close the modal and perform any other necessary actions
        setIsBannerModalOpen(false);
        setSelectedFile(null);
      } else {
        console.log('Error updating banner image.');
      }
    } catch (error) {
      console.log('Error updating banner image:', error);
    }

    // refresh the page
    window.location.reload();
  };

  const handleProfileOpenModal = () => {
    setIsProfileModalOpen(true);
  };

  const handleProfileCloseModal = () => {
    setIsProfileModalOpen(false);
  };

  const handleProfileSubmit = async () => {
    if (!selectedFile) {
      console.log('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('profileImage', selectedFile);

    try {
      const response = await axios.put(`http://localhost:3000/users/${currentAccount}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file upload
        },
      });

      if (response.status === 200) {
        console.log('Profile image updated successfully.');
        // Close the modal and perform any other necessary actions
        setIsBannerModalOpen(false);
        setSelectedFile(null);
      } else {
        console.log('Error updating banner image.');
      }
    } catch (error) {
      console.log('Error updating banner image:', error);
    }

    // refresh the page
    window.location.reload();
  };

  const onDrop = (acceptedFiles) => {
    // Handle the dropped file (you can use the acceptedFiles array)
    setSelectedFile(acceptedFiles[0]);
  };

  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxSize: 10000000, // Increased the maxSize to 10MB
  });

  const fileStyle = `dark:bg-nft-black-1 bg-white border dark:border-white border-nft-gray-2 flex flex-col items-center p-5 rounded-sm border-dashed
    ${isDragActive ? 'border-file-active ' : ''} 
    ${isDragAccept ? 'border-file-accept ' : ''} 
    ${isDragReject ? 'border-file-reject ' : ''}`;

  useEffect(() => {
    // fetch the nfts from the context
    fetchMyNFTsOrListedNFTs()
      .then((items) => {
        // get nfts from conext and stop loading animation
        setNfts(items);
        // set a copy of the nfts for search
        setNftsCopy(items);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    initiateWalletIfConnected();

    // Fetch user data by wallet address
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/users/${currentAccount}`);
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
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [currentAccount]);

  // useEffect(() => {
  //   console.log('Banner image base64:', bannerImageBase64);
  // }, [bannerImageBase64]);

  useEffect(() => {
    const sortedNfts = [...nfts];

    switch (activeSelect) {
      case 'Price (low to high)':
        setNfts(sortedNfts.sort((a, b) => a.price - b.price));
        break;
      case 'Price (high to low)':
        setNfts(sortedNfts.sort((a, b) => b.price - a.price));
        break;
      case 'Recently added':
        setNfts(sortedNfts.sort((a, b) => b.tokenId - a.tokenId));
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
        <div className="absolute top-10 right-2 p-2 pt-10 z-1">
          <button
            className="w-10 h-10 bg-nft-black-1 rounded-full flex items-center justify-center"
            type="button"
            onClick={handleBannerOpenModal}
          >
            {/* Edit icon for light mode */}
            <Image
              src={images.editLight}
              width={28}
              height={28}
              objectFit="contain"
              alt="Edit Icon"
            />
          </button>
        </div>
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
                <div className="absolute bottom-0 right-0 mr-2">
                  <button
                    className="w-10 h-10 bg-nft-black-1 rounded-full flex items-center justify-center"
                    type="button"
                    onClick={handleProfileOpenModal}
                  >
                    {/* Edit icon for light mode */}
                    <Image
                      src={images.editLight}
                      width={28}
                      height={28}
                      objectFit="contain"
                      alt="Edit Icon"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-2xl mt-6">
            {/* get shortened address of the current account */}
            {shortenAddress(currentAccount)}
          </p>
        </div>
      </div>

      {!isLoading && !nfts.length && !nftsCopy.length ? (
        // if there are no nfts, show a message
        <div className="flexCenter sm:p-4 p-16">
          <h1 className="font-poppins dark:text-white text-nft-black-1 font-extrabold text-3xl">
            No NFTs Owned
          </h1>
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
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} onProfilePage />)}
          </div>
        </div>
      )}

      {isBannerModalOpen && (
        <Modal
          header="Update your banner!"
          body={(
            <div>
              <div {...getRootProps()} className={fileStyle}>
                <input {...getInputProps()} />
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    width={100}
                    height={100}
                    alt="selected-file"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                ) : (
                  <div className="flexCenter flex-col text-center">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg">
                      PNG, GIF, SVG, WEBM. Max 5MB.
                    </p>
                    <div className="my-12 w-full flex justify-center">
                      <Image
                        src={images.upload}
                        width={100}
                        height={100}
                        objectFit="contain"
                        alt="file-upload"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                      Drag and Drop File
                    </p>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                      or Browser media on your device
                    </p>
                  </div>
                )}
              </div>
              {/* Display the selected file */}
              {selectedFile && (
              <div className="p-4">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg">
                  Selected File:  &nbsp;
                  <span className="font-poppins dark:text-white text-nft-black-1 text-lg font-normal mt-2">
                    {selectedFile.name}
                  </span>
                </p>
              </div>
              )}
            </div>
          )}
          footer={selectedFile && (
            <Button
              btnName="Submit"
              classStyles="mx-2 rounded-xl"
              handleClick={handleBannerSubmit}
            />
          )}
          handleClose={handleBannerCloseModal}
        />
      )}

      {isProfileModalOpen && (
        <Modal
          header="Update your profile!"
          body={(
            <div>
              <div {...getRootProps()} className={fileStyle}>
                <input {...getInputProps()} />
                {selectedFile ? (
                  <img
                    src={URL.createObjectURL(selectedFile)}
                    width={100}
                    height={100}
                    alt="selected-file"
                    className={theme === 'light' ? 'filter invert' : ''}
                  />
                ) : (
                  <div className="flexCenter flex-col text-center">
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg">
                      PNG, GIF, SVG, WEBM. Max 5MB.
                    </p>
                    <div className="my-12 w-full flex justify-center">
                      <Image
                        src={images.upload}
                        width={100}
                        height={100}
                        objectFit="contain"
                        alt="file-upload"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm">
                      Drag and Drop File
                    </p>
                    <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-sm mt-2">
                      or Browser media on your device
                    </p>
                  </div>
                )}
              </div>
              {/* Display the selected file */}
              {selectedFile && (
              <div className="p-4">
                <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg">
                  Selected File:  &nbsp;
                  <span className="font-poppins dark:text-white text-nft-black-1 text-lg font-normal mt-2">
                    {selectedFile.name}
                  </span>
                </p>
              </div>
              )}
            </div>
          )}
          footer={selectedFile && (
            <Button
              btnName="Submit"
              classStyles="mx-2 rounded-xl"
              handleClick={handleProfileSubmit}
            />
          )}
          handleClose={handleProfileCloseModal}
        />
      )}
    </div>
  );
};

export default MyNFTs;
