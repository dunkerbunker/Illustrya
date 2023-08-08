export const shortenAddress = (address) => {
  try {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  } catch (e) {
    console.error('An error occurred when trying to shorten the address: ', e);
    return 'Invalid address';
  }
};
