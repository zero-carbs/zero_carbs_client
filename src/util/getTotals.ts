import { DbPurchaseSelect, DbListingSelect } from "@server/db/schema";

export const getTotalPurchases = (purchaseData: DbPurchaseSelect[]) => {
  return purchaseData.reduce((acc, cur) => {
    return (
      acc + (cur.priceTotal + cur.priceTax + cur.priceShipping + cur.priceFees)
    );
  }, 0);
};

export const getTotalListings = (listingData: DbListingSelect[]) =>
  listingData.reduce((acc, cur) => {
    return (
      acc +
      cur.listingSoldPrice -
      (cur.listingSoldShipping + cur.listingSoldFees)
    );
  }, 0);

export const getTotalEarned = (listingData: DbListingSelect[]) =>
  listingData.reduce((acc: any, cur: any) => {
    return (
      acc +
      cur.listingSoldPrice -
      (cur.listingSoldShipping + cur.listingSoldFees)
    );
  }, 0);
