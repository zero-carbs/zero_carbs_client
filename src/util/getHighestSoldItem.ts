/**
 * Retrieves the highest sold item from the given database data.
 *
 * @param {Object} params - The parameters for the function.
 * @param {DbListingSelect[]} params.dbListingData - The listing data from the database.
 * @param {DbItemSelect[]} params.dbAllItems - The item data from the database.
 * @param {DbPurchaseSelect[]} params.dbPurchaseData - The purchase data from the database.
 * @return {Object | null} - The highest sold item data, including the item, purchase, and listing. Returns null if any of the required database data is missing.
 */

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
  if (!dbListingData || !dbPurchaseData || !dbAllItems) {
    return null;
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
