import MobilePurchaseSubHeaders from "./Mobile/MobilePurchaseSubHeaders";
import MobileListingSubHeaders from "./Mobile/MobileListingSubHeaders";
import { ListingWithItems, PurchaseWithItems } from "@/types";

interface PType {
  data: PurchaseWithItems;
  table: "purchases";
}

interface LType {
  data: ListingWithItems;
  table: "listings";
}

type FFF = LType | PType;

export default function SubHeader({ data, table }: FFF) {
  if (table === "purchases") {
    return <MobilePurchaseSubHeaders data={data} />;
  }

  return <MobileListingSubHeaders data={data} />;
}
