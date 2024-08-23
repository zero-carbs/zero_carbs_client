import { ListingWithItems, PurchaseWithItems } from "@/types";
import { DbItemSelect } from "@server/db/schema";

export const getPurchaseCardData = (
  dbPurchaseData: PurchaseWithItems[],
  dbListingData: ListingWithItems[],
  dbAllItems: DbItemSelect[],
) => {
  const res = [
    { label: "Purchases:", value: dbPurchaseData.length },
    { label: "Listings:", value: dbListingData.length },
    { label: "Items:", value: dbAllItems.length },
  ];

  return res;
};
