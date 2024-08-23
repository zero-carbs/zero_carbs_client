import { ListingWithItems } from "@/types";
import ListingSubCells from "./ListingSubCells";
import PurchaseSubCells from "./PurchaseSubCells";
import { DbItemSelect } from "@server/db/schema";

export default function SubCells({
  item,
  listingData,
  table,
}: {
  item: DbItemSelect;
  table: "purchases" | "listings";
  listingData: ListingWithItems;
}) {
  return table === "purchases" ? (
    <PurchaseSubCells item={item} table={table} />
  ) : (
    <ListingSubCells item={item} allData={listingData} table={table} />
  );
}
