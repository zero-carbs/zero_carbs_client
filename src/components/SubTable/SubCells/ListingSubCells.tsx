import { price } from "@/lib/utils";
import PopoverWrapper from "@/components/PopoverWrapper";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import MobileSubCells from "./Mobile";
import Notes from "@/components/TableCells/Notes";
import { ListingWithItems } from "@/types";
import { DbItemSelect } from "@server/db/schema";
import { useTanFetch } from "@/hooks/useTanFetch";

export default function ListingSubCells({
  item,
  allData,
  table,
}: {
  item: DbItemSelect;
  allData: ListingWithItems;
  table: "purchases" | "listings";
}) {
  const { data: purchaseData, isLoading } = useTanFetch(
    [`purchase?id=${item.purchaseId}`],
    true,
  );

  const isMobile = useMediaQuery("mobile");

  if (isLoading || !purchaseData) {
    return <div>Loading...</div>;
  }

  const p = purchaseData.data[0];
  const popoverData = [
    { key: "purchaseName", label: "Purchase Name" },
    { key: "datePurchased", label: "Purchase Date" },
    { key: "priceTotal", label: "Price" },
    { key: "priceTax", label: "Tax" },
    { key: "priceShipping", label: "Shipping" },
    { key: "priceFees", label: "Fees" },
    { key: "source", label: "Source" },
    { key: "purchaseNotes", label: "Notes" },
  ];
  return isMobile ? (
    <MobileSubCells item={item} table={table} allData={allData} />
  ) : (
    <>
      <div className="text-left">{item.itemName}</div>
      <PopoverWrapper
        trigger={p.purchaseName}
        customClasses="w-full"
        content={
          <div>
            <ul>
              {popoverData.map((c) =>
                p[c.key] ? (
                  <li
                    key={c.key}
                    className={`flex justify-between items-start text-right gap-y-4 gap-x-8 ${c.key === "purchaseNotes" && "flex-col gap-y-0"}`}
                  >
                    <div className="font-bold text-xs">{`${c.label}:`}</div>
                    <div className="text-xs">
                      {c.key.includes("price") ? price(p[c.key]) : p[c.key]}
                    </div>
                  </li>
                ) : (
                  ""
                ),
              )}
            </ul>
          </div>
        }
      />
      {item.itemNotes && <Notes data={item.itemNotes} />}
    </>
  );
}
