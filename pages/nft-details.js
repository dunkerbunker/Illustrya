import { useState, useEffect, useContext } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { NFTContext } from '../context/NFTContext';
import { NFTCard, Loader, Button, Modal } from '../components';
import images from '../assets';
import { shortenAddress } from '../utils/shortenAddress';

const PaymentBodyCmp = ({ nft, nftCurrency }) => (
  <div className="flex flex-col">
    <div className="flexBetween">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg minlg:text-xl">
        Item
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg minlg:text-xl">
        Subtotal
      </p>
    </div>

    <div className="flexBetweenStart my-5">
      <div className="flex-1 flexStartCenter">
        <div className="relative w-28 h-28">
          <img
            src={nft.image}
            layout="fill"
            objectFit="cover"
            className="rounded-lg h-full w-full"
          />
        </div>
      </div>

      <div className="text-right">
        <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
          {`${nft.price} `}
          <span className="font-semibold">
            {nftCurrency}
          </span>
        </p>
        <p className="mt-3 font-poppins dark:text-white text-nft-black-1 font-semibold text-sm minlg:text-xl">
          Buy from: {shortenAddress(nft.seller)}
        </p>
        <p className="mt-2 font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal">
          {nft.name}
        </p>
      </div>
    </div>

    <div className="flexBetween mt-10">
      <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-lg minlg:text-xl">
        Total
      </p>
      <p className="font-poppins dark:text-white text-nft-black-1 text-base minlg:text-xl font-normal">
        {`${nft.price} `}
        <span className="font-semibold">
          {nftCurrency}
        </span>
      </p>
    </div>
  </div>
);

const NFTDetails = () => {
  const { currentAccount, nftCurrency, buyNFT, isLoadingNFT } = useContext(NFTContext);
  const [isLoading, setIsLoading] = useState(true);
  const [nft, setNft] = useState({ image: '', tokenId: '', name: '', owner: '', price: '', seller: '' });
  const router = useRouter();
  const [paymentModal, setPaymentModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [activeTab, setActiveTab] = useState('details');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (router.isReady) {
      setNft(router.query);
      setIsLoading(false);
    }
  }, [router.isReady]);

  useEffect(() => {
    console.log('nft', nft);
  }, [nft]);

  const checkout = async () => {
    await buyNFT(nft);
    setPaymentModal(false);
    setSuccessModal(true);
  };

  // load until the nft info is fetched
  if (isLoading) {
    return (
      <div className="flexStart min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="relative flex justify-center md:flex-col min-h-screen">
      <div className="relative flex-1 flexCenter sm:px-4 p-12 border-r md:border-r-0 md:border-b dark:border-nft-black-1 border-nft-gray-1">
        <div className="relative w-557 minmd:w-2/3 minmd:h-2/3 sm:w-full sm:h-300 h-557">
          <img
            src={nft.image}
            objectFit="cover"
            className="rounded-xl shadow-lg object-cover"
            layout="fill"
          />
        </div>
      </div>

      <div className="flex-1 justify-center sm:px-4 p-12 sm:pb-4">
        <div className="flex flex-col items-center">
          <h2 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-6xl minlg:text-5xl text-center my-8">{nft.name}</h2>
          <div className="flex flex-row my-4">
            <button
              type="button"
              className={`font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-xl font-medium border-b-2 ${
                activeTab === 'details' ? 'border-primary' : 'border-transparent'
              } pb-1 focus:outline-none mr-8`}
              onClick={() => handleTabChange('details')}
            >
              Details
            </button>
            <button
              type="button"
              className={`font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-xl font-medium border-b-2 ${
                activeTab === 'history' ? 'border-primary' : 'border-transparent'
              } pb-1 focus:outline-none`}
              onClick={() => handleTabChange('history')}
            >
              History
            </button>
          </div>
          <div className="w-full mt-6 text-center">
            {activeTab === 'details' ? (
              <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal p-4 text-justify">
                {nft.description}
              </p>
            ) : (
              <div className="font-poppins dark:text-white text-nft-black-1 text-base font-normal p-4 text-justify">
                <h3 className="text-xl font-semibold mb-4">Ownership History</h3>
                <ul>
                  {nft.previousOwners.map((owner, index) => (
                    <li key={index} className="mb-2">
                      {owner}
                    </li>
                  ))}
                </ul>
                <h3 className="text-xl font-semibold mt-6 mb-4">Sale Price History</h3>
                <ul>
                  {nft.previousSalePrices.map((price, index) => (
                    <li key={index} className="mb-2">
                      {price}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 mb-10">
          <p className="font-poppins dark:text-white text-nft-black-1 text-2xl minlg:text-base font-normal ml-4">Owner</p>
          <div className="flex flex-row sm:flex-col justify-between mt-3 ml-4">
            <div className="flex items-center">
              <div className="relative w-24 h-24 minlg:w-40 minlg:h-40 mr-4">
                <Image
                  src={images.creator1}
                  objectFit="cover"
                  className="rounded-full"
                />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 text-xl minlg:text-lg font-semibold">
                {shortenAddress(nft.owner)}
              </p>
            </div>
            <div className="flex flex-row sm:flex-col w-72 h-12 md:w-full mt-6 ml-9 sm:mt-0 sm:ml-0">
              {currentAccount === nft.seller.toLowerCase() ? (
                <p className="font-poppins dark:text-white text-nft-black-1 text-base font-normal border border-gray p-2 mt-3 sm:mt-0 sm:ml-4">
                  You cannot buy your own NFT
                </p>
              ) : currentAccount === nft.owner.toLowerCase() ? (
                <Button
                  btnName="List on Marketplace"
                  classStyles="mt-3 sm:mt-0 sm:mb-5 sm:ml-4 rounded-xl"
                  handleClick={() => router.push(`/resell-nft?tokenId=${nft.tokenid}&tokenURI=${nft.tokenURI}`)}
                />
              ) : (
                <button
                  type="button"
                  className="nft-gradient minlg:text-lg py-2 px-4 minlg:px-6 font-poppins font-semibold text-white sm:mt-9 sm:mb-5 rounded-xl text-base w-full sm:w-auto"
                  onClick={() => setPaymentModal(true)}
                >
                  {`Buy for ${nft.price} ${nftCurrency}`}
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

      {paymentModal && (
        <Modal
          header="Check Out"
          body={<PaymentBodyCmp nft={nft} nftCurrency={nftCurrency} />}
          footer={(
            <div className="flex flex-row sm:flex-col">
              <Button
                btnName="Checkout"
                classStyles="mr-5 sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={checkout}
              />
              <Button
                btnName="Cancel"
                classStyles="rounded-xl"
                handleClick={() => setPaymentModal(false)}
              />
            </div>
          )}
          handleClose={() => setPaymentModal(false)}
        />
      )}

      {isLoadingNFT && (
        <Modal
          header="Buying NFT..."
          body={(
            <div className="flexCenter flex-col text-center">
              <div className="relative w-52 h-52">
                <Loader />
              </div>
            </div>
          )}
          handleClose={() => setPaymentModal(false)}
        />
      )}
      {successModal && (
        <Modal
          header="Payment Successful"
          body={(
            <div
              className="flexCenter flex-col text-center"
              onClick={() => setSuccessModal(false)}
            >
              <div className="relative w-52 h-52">
                <img
                  src={nft.image}
                  objectFit="cover"
                  layout="fill"
                  className="rounded-xl object-cover w-full h-full"
                />
              </div>
              <p className="font-poppins dark:text-white text-nft-black-1 text-sm minlg:text-xl font-normal mt-10">
                You have successfully purchased &nbsp;
                <span className="font-semibold">
                  {nft.name} &nbsp;
                </span>
                from &nbsp;
                <span className="font-semibold">
                  {shortenAddress(nft.seller)}
                </span>
              </p>
            </div>
        )}
          footer={(
            <div className="flexCenter flex-col">
              <Button
                btnName="Check it out"
                classStyles="sm:mb-5 sm:mr-0 rounded-xl"
                handleClick={() => router.push('/my-nfts')}
              />
            </div>
          )}
          handleClose={() => setPaymentModal(false)}
        />
      )}

    </div>
  );
};

export default NFTDetails;
