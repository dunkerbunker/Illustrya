export const getCreators = (nfts) => {
  if (nfts) {
    const creators = nfts.reduce((creatorObject, nft) => {
      // eslint-disable-next-line no-param-reassign
      (creatorObject[nft.seller] = creatorObject[nft.seller] || []).push(nft);
      return creatorObject;
    }, {});

    const creatorsSum = Object.entries(creators).map((creator) => {
      const seller = creator[0];
      const sum = creator[1].map((item) => Number(item.price)).reduce((prev, curr) => prev + curr, 0);

      return ({ seller, sum });
    });

    return creatorsSum.sort((a, b) => b.sum - a.sum);
  }
};

export const getBuyers = (nfts) => {
  if (nfts) {
    const buyers = nfts.reduce((buyerObject, nft) => {
      // For each NFT, loop over its previousOwners and previousSalePrices
      nft.previousOwners.forEach((buyer, i) => {
        // Only count the purchase if it's not the first one (i > 0)
        if (i > 0) {
          const price = Number(nft.previousSalePrices[i]);

          // Accumulate both the count and the total price for each buyer
          // eslint-disable-next-line no-param-reassign
          buyerObject[buyer] = buyerObject[buyer] || { count: 0, total: 0 };
          // eslint-disable-next-line no-param-reassign
          buyerObject[buyer].count += 1;
          // eslint-disable-next-line no-param-reassign
          buyerObject[buyer].total += price;
        }
      });
      // console.log(buyerObject);
      return buyerObject;
    }, {});

    const buyersSum = Object.entries(buyers).map(([buyerAddress, { count, total }]) => ({ buyerAddress, count, total }));

    // Sort by total spent first, and then by count
    return buyersSum.sort((a, b) => b.total - a.total || b.count - a.count);
  }
};

export const getSellersWithMostSales = (nfts) => {
  if (nfts) {
    const sellers = nfts.reduce((sellerObject, nft) => {
      // For each NFT, loop over its previousOwners and previousSalePrices
      nft.previousOwners.forEach((seller, i) => {
        // Exclude the last owner, who is the current owner and not a seller
        if (i < nft.previousOwners.length - 1) {
          const price = Number(nft.previousSalePrices[i + 1]); // Adjusted index

          // Accumulate both the count and the total price for each seller
          // eslint-disable-next-line no-param-reassign
          sellerObject[seller] = sellerObject[seller] || { salesCount: 0, salesValue: 0 };
          // eslint-disable-next-line no-param-reassign
          sellerObject[seller].salesCount += 1;
          // eslint-disable-next-line no-param-reassign
          sellerObject[seller].salesValue += price;
        }
      });
      return sellerObject;
    }, {});

    const sellersSales = Object.entries(sellers).map(([sellerAddress, { salesCount, salesValue }]) => ({ sellerAddress, salesCount, salesValue }));

    // Sort by total sales value first, and then by sales count
    return sellersSales.sort((a, b) => b.salesValue - a.salesValue || b.salesCount - a.salesCount);
  }
};

// {
//     'A': [{}]
//     'B': [{}]
//     'C': [{}]
// }

// exampme input and output

// Input

// [
//     {price:'2', seller "A"},
//     {price:'3', seller "B"},
//     {price:'3', seller "A"},
//     {price:'4', seller "C"},
// ]

// Output

// [
//     {price:'5', seller "A"},
//     {price:'4', seller "C"},
//     {price:'3', seller "B"},
// ]
