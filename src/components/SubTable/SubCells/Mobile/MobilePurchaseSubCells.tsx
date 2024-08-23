import CellEditButton from "@/components/CellEditButton";
import Notes from "@/components/TableCells/Notes";
import { DbItemSelect } from "@server/db/schema";

export default function MobilePurchaseSubCells({
  item,
}: {
  item: DbItemSelect;
}) {
  return (
    <div className="col-span-full w-full py-1">
      <div className="flex items-start justify-between">
        <h1 className="font-bold">{item.itemName}</h1>
        <div className="cursor-pointer">
          <CellEditButton data={item} type="items" />
        </div>
      </div>

      <div className="w-full columns-2">
        <div>Listed On: {item.listedSource ? item.listedSource : "---"}</div>

        <div>Sold: {item.soldDate ? item.soldDate : "---"}</div>

        {item.itemNotes && (
          <div>
            Notes: <Notes data={item.itemNotes} />
          </div>
        )}
      </div>
    </div>
  );
}
