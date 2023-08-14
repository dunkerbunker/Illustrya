/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['nftartmarketplace.infura-ipfs.io', 'ipfs.infura.io', 'localhost'],
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
};

module.exports = nextConfig;
