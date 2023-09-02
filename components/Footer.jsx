/* eslint-disable import/no-cycle */
import Image from 'next/image';
import { useTheme } from 'next-themes';

import Link from 'next/link';
import images from '../assets';
import { Button } from '.';

// Component to render sections in footer
const FooterLinks = ({ heading, items }) => (
  <div className="flex-1 justify-start items-start">
    <h3 className="font-poppins dark:text-white text-nft-black-1 font-semibold text-xl mb-10">{heading}</h3>
    {/* loop through all items passed in to display under heading */}
    {items.map((item, i) => (
      <Link
        href={item === 'Explore' ? ('/') : (item.toLowerCase().replace(' ', '-'))}
        key={i}
      >
        <p key={i} className="font-poppins dark:text-white text-nft-black-1 font-normal test-base cursor-pointer dark:hover:text-nft-gray-1 hover:text-nft-black-1 my-3">{item}</p>
      </Link>
    ))}
  </div>
);

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className="flexCenter flex-col border-t dark:border-nft-black-1 border-nft-gray-1 sm:py-8 py-16"> {/* note: might have to remove sm:py-8 since content goes behind top nav */}
      <div className="w-full minmd:w-4/5 flex flex-row md:flex-col sm:px-4 px-16">
        <div className="flexStart flex-1 flex-col">
          <div className="flexCenter cursor-pointer">
            <Image
              src={images.logo02}
              objectFit="contain"
              width={32}
              height={32}
              alt="logo"
            />
            <p className="dark:text-white text-nft-black-1 font-semibold text-lg ml-1">
              Illustrya
            </p>
          </div>
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base mt-6">
            Get the latest Updates
          </p>
          <div className="flexBetween md:w-full minlg:w-557 w-357 mt-6 dark:bg-nft-black-2 bg-white border dark:border-nft-black-2 border-ft-gray-2 rounded-md">
            <input
              type="email"
              placeholder="Your email"
              className="h-full flex-1 w-full dark:bg-nft-black-2 bg-white px-4 rounded-md dark:text-white text-nft-black-1 font-normal text-xs minlg:text-lg outline-none"
            />
            <div className="flex-initial">
              {/* use of button component */}
              <Button btnName="Email me" classStyles="rounded-md" />
            </div>
          </div>
        </div>

        <div className="flex-1 flexBetweenStart flex-wrap ml-10 md:ml-0 md:mt-8">
          {/* use of footerLinks component made in the same file */}
          <FooterLinks heading="Illustrya" items={['Explore', 'White Paper', 'Contact Us']} />
          <FooterLinks heading="Support" items={['Help center', 'Legal', 'Privacy policy']} />
        </div>
      </div>

      <div className="flexCenter w-full mt-5 border-t dark:border-nft-black-1 border-nft-gray-1 sm:px-4 px-16">
        <div className="flexBetween flex-row w-full minmd:w-4/5 sm:flex-col mt-7">
          <p className="font-poppins dark:text-white text-nft-black-1 font-semibold text-base"> Art, Inc. All Rights Reserved</p>
          <div className="flex flex-row sm:mt-4">
            {[images.instagram, images.twitter, images.telegram, images.discord].map((image, i) => (
              // display all social media icons at bottom of footer
              <div className="mx-2 cursor-pointer" key={i}>
                <Image
                  src={image}
                  objectFit="contain"
                  width={24}
                  height={24}
                  alt="social media"
                  className={theme === 'light' ? 'filter invert' : ''}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
