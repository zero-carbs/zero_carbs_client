import {
  DbPurchaseSelect,
  DbItemSelect,
  DbListingSelect,
} from "@server/db/schema";

export const getHighestSoldItem = ({
  dbListingData,
  dbAllItems,
  dbPurchaseData,
}: {
  dbListingData: DbListingSelect[];
  dbAllItems: DbItemSelect[];
  dbPurchaseData: DbPurchaseSelect[];
}) => {
  const hasSoldItem = dbListingData.filter(
    (listing: DbListingSelect) => listing.listingSold === true,
  );

  if (dbListingData.length === 0 || hasSoldItem.length < 1) {
    return false;
  }

  const highestSoldListing = dbListingData
    .map((listing) => {
      return {
        name: listing.listingName,
        listedDate: listing.listingDate,
        soldDate: listing.listingSoldDate,
        listingId: listing.id,
        totalAmount:
          listing.listingSoldPrice -
          (listing.listingSoldShipping - listing.listingSoldFees),
      };
    })
    .filter((item) => Object.keys(item).length > 0);

  const sortedByPrice = highestSoldListing.sort((a, b) => {
    return b.totalAmount - a.totalAmount;
  });

  const highestSoldListingData = sortedByPrice[0];

  const highestSoldItem = dbAllItems.find(
    (item) => item.listingId === highestSoldListingData.listingId,
  );

  const highestItemPurchase = dbPurchaseData.filter(
    (purchase) => purchase.id === highestSoldItem?.purchaseId,
  )[0];

  const finalHighestItemData = {
    item: highestSoldItem,
    purchase: highestItemPurchase,
    listing: highestSoldListingData,
  };

  return finalHighestItemData;
};
