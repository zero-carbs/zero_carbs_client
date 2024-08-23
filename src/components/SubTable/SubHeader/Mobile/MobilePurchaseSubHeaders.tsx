import CellPrice from "@/components/CellPrice";
import ItemsSoldCount from "@/components/TableCells/ItemsSoldCount";
import Earnings from "@/components/TableCells/Earnings";
import Percentage from "@/components/TableCells/Percentage";
import Notes from "@/components/TableCells/Notes";
import { PurchaseWithItems } from "@/types";

export default function MobilePurchaseSubHeaders({
  data,
}: {
  data: PurchaseWithItems;
}) {
  const mobilePurchaseHeaderData = [
    { label: "Source", value: <div>{data.source}</div> },
    { label: "Cost", value: <CellPrice data={data} /> },
    { label: "Earned", value: <Earnings soldTotals={data.soldTotals} /> },
    { label: "Sold", value: <ItemsSoldCount items={data.items} /> },
    { label: "Return", value: <Percentage data={data} /> },
    {
      label: "Notes",
      value: data.purchaseNotes ? <Notes data={data.purchaseNotes} /> : null,
    },
  ];

  return (
    <>
      <div className="col-span-full px-2 pt-2 columns-2">
        {mobilePurchaseHeaderData.map((item) => (
          <div
            key={item.label}
            className={`flex gap-x-2 ${item.label === "Notes" && "flex-col"}`}
          >
            <span className="font-bold">
              {item.value !== null && `${item.label}:`}
            </span>
            {item.value}
          </div>
        ))}
      </div>
      <hr className="my-2" />
    </>
  );
}
