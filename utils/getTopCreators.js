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

export const getSellersWithMostSales = (nfts) => {
  if (nfts) {
    const sellers = nfts.reduce((sellerObject, nft) => {
      // increment count or set it to 1 if seller does not exist in object yet
      // eslint-disable-next-line no-param-reassign
      sellerObject[nft.seller] = (sellerObject[nft.seller] || 0) + 1;
      return sellerObject;
    }, {});

    const sellersSales = Object.entries(sellers).map((seller) => {
      const sellerAddress = seller[0];
      const salesCount = seller[1];

      return ({ seller: sellerAddress, salesCount });
    });

    return sellersSales.sort((a, b) => b.salesCount - a.salesCount);
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
