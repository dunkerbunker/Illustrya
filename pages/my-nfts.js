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
  const [listedNfts, setListedNfts] = useState([]);
  const [ownedNfts, setOwnedNfts] = useState([]);
  // const [listedNfts, setListedNfts] = useState([]);
  // const [listedNftsCopy, setListedNftsCopy] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSelect, setActiveSelect] = useState('Recently Added');

  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [editedNameValue, setEditedNameValue] = useState('');
  const [isListedActive, setListedActive] = useState(true);
  const [isOwnedActive, setOwnedActive] = useState(true);
  // description
  const [isDescriptionEditing, setIsDescriptionEditing] = useState(false);
  const [editedDescriptionValue, setEditedDescriptionValue] = useState('');

  const [bannerImageBase64, setBannerImageBase64] = useState(null);
  const [profileImageBase64, setProfileImageBase64] = useState(null);
  const [nickname, setNickname] = useState('');
  const [description, setDescription] = useState('');

  const { theme } = useTheme();

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

  const handleBannerSubmitRemove = async () => {
    const formData = new FormData();
    formData.append('bannerImage', 'delete');
    try {
      const response = await axios.put(`http://localhost:3000/users/${currentAccount}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file upload
        },
      });

      if (response.status === 200) {
        console.log('banner image removed successfully.');
        // Close the modal and perform any other necessary actions
        setIsBannerModalOpen(false);
        setSelectedFile(null);
      } else {
        console.log('Error removing banner image.');
      }
    } catch (error) {
      console.log('Error removing banner image:', error);
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

  const handleProfileSubmitRemove = async () => {
    const formData = new FormData();
    formData.append('profileImage', 'delete');
    try {
      const response = await axios.put(`http://localhost:3000/users/${currentAccount}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file upload
        },
      });

      if (response.status === 200) {
        console.log('Profile image removed successfully.');
        // Close the modal and perform any other necessary actions
        setIsBannerModalOpen(false);
        setSelectedFile(null);
      } else {
        console.log('Error removing profile image.');
      }
    } catch (error) {
      console.log('Error removing profile image:', error);
    }

    // refresh the page
    window.location.reload();
  };

  const handleNameEditClick = () => {
    setEditedNameValue(nickname || shortenAddress(currentAccount));
    setIsNameEditing(true);
  };

  const handleNameInputChange = (e) => {
    setEditedNameValue(e.target.value);
    // Call your API here with e.target.value
  };

  const handleNameInputBlur = async () => {
    setIsNameEditing(false);
    // Call your API here with editedValue
    const formData = new FormData();
    formData.append('nickname', editedNameValue);
    console.log(editedNameValue);
    try {
      const response = await axios.put(`http://localhost:3000/users/${currentAccount}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file upload
        },
      });

      if (response.status === 200) {
        console.log('nickname successfully updated.');
        // Close the modal and perform any other necessary actions
        setIsBannerModalOpen(false);
        setSelectedFile(null);
      } else {
        console.log('Error updating nickname.');
      }
    } catch (error) {
      console.log('Error updating nickname', error);
    }

    // refresh the page
    window.location.reload();
  };

  const handleDescriptionEditClick = () => {
    setEditedDescriptionValue(description || 'No description');
    setIsDescriptionEditing(true);
  };

  const handleDescriptionInputChange = (e) => {
    setEditedDescriptionValue(e.target.value);
    // Call your API here with e.target.value
  };

  const handleDescriptionInputBlur = async () => {
    setIsDescriptionEditing(false);
    // Call your API here with editedValue
    const formData = new FormData();
    formData.append('bio', editedDescriptionValue);
    try {
      const response = await axios.put(`http://localhost:3000/users/${currentAccount}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important header for file upload
        },
      });

      if (response.status === 200) {
        console.log('description successfully updated.');
        // Close the modal and perform any other necessary actions
        setIsBannerModalOpen(false);
        setSelectedFile(null);
      } else {
        console.log('Error updating description.');
      }
    } catch (error) {
      console.log('Error updating description', error);
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
    // Fetch both sets of NFTs
    Promise.all([
      fetchMyNFTsOrListedNFTs(),
      fetchMyNFTsOrListedNFTs('fetchItemsListed'),
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
  }, [currentAccount]);

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

          {isNameEditing ? (
            <input
              type="text"
              value={editedNameValue}
              onChange={handleNameInputChange}
              onBlur={handleNameInputBlur}
              className="font-poppins dark:text-white text-nft-black-1 font-bold text-3xl mt-5 w-full p-2"
            />
          ) : (
            <p
              onClick={handleNameEditClick}
              className="font-poppins dark:text-white text-nft-black-1 font-bold text-3xl mt-5 cursor-pointer"
            >
              {/* get shortened address of the current account */}
              {nickname || shortenAddress(currentAccount)}
            </p>
          )}

          <p className="font-poppins dark:text-white text-nft-black-1 font-thin text-xl mt-6">
            {isDescriptionEditing ? (
              <input
                type="text"
                value={editedDescriptionValue}
                onChange={handleDescriptionInputChange}
                onBlur={handleDescriptionInputBlur}
                className="font-poppins dark:text-white text-nft-black-1 font-thin text-lg mt-6 w-full p-2"
                style={{ width: '100%', maxWidth: '800px' }}
              />
            ) : (
              <span onClick={handleDescriptionEditClick} className="cursor-pointer">
                {description || 'Add a description'}
              </span>
            )}
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
            {nfts.map((nft) => <NFTCard key={nft.tokenId} nft={nft} isProfile />)}
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
              {selectedFile ? (
                <div className="p-4">
                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg">
                    Selected File:  &nbsp;
                    <span className="font-poppins dark:text-white text-nft-black-1 text-lg font-normal mt-2">
                      {selectedFile.name}
                    </span>
                  </p>
                </div>
              ) : (
                <Button
                  btnName="Remove banner"
                  classStyles="mx-2 rounded-xl mt-10 w-full"
                  handleClick={handleBannerSubmitRemove}
                />
              )}
            </div>
          )}
          footer={selectedFile && (
            <Button
              btnName="Submit"
              classStyles="mx-2 rounded-xl w-full"
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
              {selectedFile ? (
                <div className="p-4">
                  <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg">
                    Selected File:  &nbsp;
                    <span className="font-poppins dark:text-white text-nft-black-1 text-lg font-normal mt-2">
                      {selectedFile.name}
                    </span>
                  </p>
                </div>
              ) : (
                <Button
                  btnName="Remove banner"
                  classStyles="mx-2 rounded-xl mt-10 w-full"
                  handleClick={handleProfileSubmitRemove}
                />
              )}
            </div>
          )}
          footer={selectedFile && (
            <Button
              btnName="Submit"
              classStyles="mx-2 rounded-xl w-full"
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
