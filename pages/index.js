import { useState, useEffect, useRef, useContext } from 'react';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import axios from 'axios';

import { NFTContext } from '../context/NFTContext';
import { Banner, CreatorCard, Loader, NFTCard, SearchBar } from '../components';
import images from '../assets';
// function that makes a random id
import { makeId } from '../utils/makeId';
import { getCreators, getBuyers, getSellersWithMostSales } from '../utils/getTopCreators';
import { shortenAddress } from '../utils/shortenAddress';

const Home = () => {
  // state to check when to show scroll buttons
  const [hideButtons, setHideButtons] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [nfts, setNfts] = useState([]);
  const [soldNfts, setSoldNfts] = useState([]);

  const [nftsCopy, setNftsCopy] = useState([]);
  const [activeSelect, setActiveSelect] = useState('Recently added');

  // ref to identify scroll element and its parent
  const parentRefBuyers = useRef(null);
  const scrollRefBuyers = useRef(null);
  const parentRefCreators = useRef(null);
  const scrollRefCreators = useRef(null);
  const masonryRef = useRef(null);

  // theme hook to get the current theme
  const { theme } = useTheme();
  // context to get the data from the context
  const { fetchNFTs, fetchSoldNFTs, currentAccount } = useContext(NFTContext);

  useEffect(() => {
    // fetch the nfts from the context
    fetchNFTs()
      .then((items) => {
        setNfts(items);
        setNftsCopy(items);
        setIsLoading(false);
      });
    // console.log(nfts);

    // fetch the sold nfts from the context
    fetchSoldNFTs()
      .then((items) => {
        setSoldNfts(items);
      });
    // console.log(soldNfts);
  }, []);

  const initiateWalletIfConnected = async () => {
    if (currentAccount) {
      try {
        // Call the "Get User by Wallet Address" API
        console.log(currentAccount);
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
    }
  };

  useEffect(() => {
    initiateWalletIfConnected();
  }, [currentAccount]);
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

  useEffect(() => {
    const masonryContainer = masonryRef.current;
    if (masonryContainer) {
      const children = [...masonryContainer.children];
      children.sort((a, b) => a.offsetWidth - b.offsetWidth);
      children.forEach((child) => masonryContainer.appendChild(child));
    }
  }, [nfts]);

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

  // function to check which direction to scroll when clicked
  const handleScroll = (direction, scrollReference) => {
    const { current } = scrollReference;

    const scrollAmount = window.innerWidth > 1800 ? 270 : 210;

    if (direction === 'left') {
      current.scrollLeft -= scrollAmount;
    } else {
      current.scrollLeft += scrollAmount;
    }
  };

  // check if the scrollable width of the section is greater than the width of its parent.
  const isScrollable = (scrollElementRef, parentElementRef, setFunction) => {
    const { current: scrollElement } = scrollElementRef;
    const { current: parentElement } = parentElementRef;

    if (scrollElement?.scrollWidth > parentElement?.offsetWidth) {
      setFunction(false);
    } else {
      setFunction(true);
    }
  };

  useEffect(() => {
    // Check scrollability for both Top Creators and Top Buyers
    isScrollable(scrollRefCreators, parentRefCreators, setHideButtons);
    isScrollable(scrollRefBuyers, parentRefBuyers, setHideButtons);

    const handleResize = () => {
      isScrollable(scrollRefCreators, parentRefCreators, setHideButtons);
      isScrollable(scrollRefBuyers, parentRefBuyers, setHideButtons);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const topCreators = getSellersWithMostSales(soldNfts);
  // console.log('top creators', topCreators);
  // console.log('nfts', soldNfts);
  const topBuyers = getBuyers(soldNfts);
  // console.log('top buyers', topBuyers);

  return (
    <div>
      <div className="flex justify-center sm:px-4 p-12">
        <div className="w-full minmd:w-4/5">
          <Banner
            parentStyles="justify-start mb-6 h-72 sm:h-60 p-12 xs:p-2 xs:h-44 rounded-3xl"
            childStyles="md:text-4xl sm:text-2xl xs:text-xl text-left"
            name={<>Discover, collect and sell <br /> extraordinary Art </>}
          />

          <div className="flex flex-row md:flex-col w-full space-x-4 md:space-x-0 space-b justify-between">
            {/* BRRRRRRRRR */}
            <div className="w-1/2 md:w-full overflow-x-auto border-2 rounded-3xl border-purple-500 p-4 mt-4 mb-4 mr-4">
              <h1 className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                {topCreators && topCreators.length > 0 ? 'Top Creators' : 'Become a top creator by listing your art!'}
              </h1>
              <div
                className="relative flex-1 max-w-full overflow-x-auto flex mt-3"
                ref={parentRefCreators}
              >
                <div
                  className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                  ref={scrollRefCreators}
                >
                  {topCreators && topCreators.slice(0, 6).map((creator, i) => (
                    <CreatorCard
                      key={`creator-${i}`}
                      rank={i + 1}
                      creatorImage={images[`creator${i + 1}`]}
                      creatorName={shortenAddress(creator.sellerAddress)}
                      creatorEths={creator.salesValue}
                    />
                  ))}

                  {!hideButtons && (
                  <>
                    <div
                      onClick={() => handleScroll('left', scrollRefCreators)}
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                    >
                      <Image
                        src={images.left}
                        layout="fill"
                        objectFit="contain"
                        alt="left_arrow"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>
                    <div
                      onClick={() => handleScroll('right', scrollRefCreators)}
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                    >
                      <Image
                        src={images.right}
                        layout="fill"
                        objectFit="contain"
                        alt="right_arrow"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>
                  </>
                  )}
                </div>
              </div>

            </div>
            {/* end of top creators section */}
            {/* BRRRRRRRRR */}
            <div className="w-1/2 md:w-full overflow-x-auto rounded-3xl nft-gradient p-4 mt-4 mb-4 ml-4">
              <h1 className="font-poppins text-white text-nft-white-1 text-2xl minlg:text-4xl font-semibold ml-4 xs:ml-0">
                {topBuyers && topBuyers.length > 0 ? 'Top Buyers' : 'Become a top buyer by purchasing your favourite art!'}
              </h1>
              <div
                className="relative flex-1 max-w-full flex mt-3"
                ref={parentRefBuyers}
              >
                <div
                  className="flex flex-row w-max overflow-x-scroll no-scrollbar select-none"
                  ref={scrollRefBuyers}
                >
                  {topBuyers && topBuyers.slice(0, 6).map((creator, i) => (
                    <CreatorCard
                      key={`creator-${i}`}
                      rank={i + 1}
                      creatorImage={images[`creator${10 - i}`]}
                      creatorName={shortenAddress(creator.buyerAddress)}
                      creatorEths={creator.total}
                      darkMode
                    />
                  ))}

                  {!hideButtons && (
                  <>
                    <div
                      onClick={() => handleScroll('left', scrollRefBuyers)}
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer left-0"
                    >
                      <Image
                        src={images.left}
                        layout="fill"
                        objectFit="contain"
                        alt="left_arrow"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>
                    <div
                      onClick={() => handleScroll('right', scrollRefBuyers)}
                      className="absolute w-8 h-8 minlg:w-12 minlg:h-12 top-45 cursor-pointer right-0"
                    >
                      <Image
                        src={images.right}
                        layout="fill"
                        objectFit="contain"
                        alt="right_arrow"
                        className={theme === 'light' ? 'filter invert' : ''}
                      />
                    </div>
                  </>
                  )}
                </div>
              </div>

            </div>
          </div>

          {/* !isLoading && !nfts.length */}
          {!isLoading && !nfts.length ? (
            <h1 className="mt-10 font-poppins dark:text-white text-nft-black-1 text-2xl minlf:text-4xl font-semibold ml-4 xs:ml-0">
              That&pos;s weird... No Artworks found. Please try again later.
            </h1>
          ) : isLoading ? (
            <Loader />
          ) : (
            <div className="mt-10">
              <div className="flexBetween mx-4 xs:mx-0 minlg:mx-8 sm:flex-col sm:items-start">
                <h1 className="flex-1 before:first:font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-4xl font-semibold sm:mb-4">
                  Trending Art
                </h1>
                <div className="flex-2 sm:w-full flex flex-row sm:flex-col">
                  <SearchBar
                    activeSelect={activeSelect}
                    setActiveSelect={setActiveSelect}
                    handleSearch={onHandleSearch}
                    clearSearch={onClearSearch}
                  />
                </div>
              </div>
              <div className="mt-9 w-full grid grid-cols-2 lg:grid-cols-1 gap-4">
                {nfts?.map((nft) => (
                  <div key={nft.tokenId}>
                    <NFTCard nft={nft} />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Home;
