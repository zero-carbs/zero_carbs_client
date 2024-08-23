import CellEditButton from "@/components/CellEditButton";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileSubCells from "./Mobile";
import Notes from "@/components/TableCells/Notes";
import { DbItemSelect } from "@server/db/schema";

export default function PurchaseSubCells({
  item,
  table,
}: {
  item: DbItemSelect;
  table: "purchases" | "listings";
}) {
  const isMobile = useMediaQuery("mobile");

  return isMobile ? (
    <MobileSubCells item={item} table={table} allData={null} />
  ) : (
    <>
      <div>{item.itemName}</div>
      <div className="">{item.listedSource ? item.listedSource : "---"}</div>
      <div className="">{item.soldDate ? item.soldDate : "---"}</div>
      <div>
        <Notes data={item.itemNotes} />
      </div>
      <div className="cursor-pointer">
        <CellEditButton data={item} type="items" />
      </div>
    </>
  );
}
