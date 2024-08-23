import { ListingWithItems, PurchaseWithItems } from "@/types";
import MobileListingSubCells from "./MobileListingSubCells";
import MobilePurchaseSubCells from "./MobilePurchaseSubCells";
import { DbItemSelect } from "@server/db/schema";

export default function MobileSubCells({
  item,
  table,
  allData,
}: {
  item: DbItemSelect;
  table: "purchases" | "listings";
  allData: PurchaseWithItems | ListingWithItems | null;
}) {
  return table === "purchases" ? (
    <MobilePurchaseSubCells item={item} />
  ) : (
    <MobileListingSubCells item={item} allData={allData} />
  );
}
