import PopoverWrapper from "@/components/PopoverWrapper";
import Notes from "@/components/TableCells/Notes";
import { price } from "@/lib/utils";
import { ListingWithItems, PurchaseWithItems } from "@/types";
import { DbItemSelect } from "@server/db/schema";
import { useTanFetch } from "@/hooks/useTanFetch";

export default function MobileListingSubCells({
  item,
  allData,
}: {
  item: DbItemSelect;
  allData: ListingWithItems | PurchaseWithItems | null | any;
}) {
  const { data: purchaseData, isLoading } = useTanFetch(
    [`purchase?id=${item.purchaseId}`],
    true,
  );

  if (isLoading || !purchaseData) {
    return <div>Loading...</div>;
  }

  const p = purchaseData.data[0];
  const popoverData = [
    { key: "purchaseName", label: "Purchase" },
    { key: "datePurchased", label: "Purchase Date" },
    { key: "priceTotal", label: "Price" },
    { key: "priceTax", label: "Tax" },
    { key: "priceShipping", label: "Shipping" },
    { key: "priceFees", label: "Fees" },
    { key: "source", label: "Source" },
    { key: "purchaseNotes", label: "Notes" },
  ];
  return (
    <div className="col-span-full w-full py-1">
      <div className="flex items-start justify-between">
        <h1 className="font-bold">{item.itemName}</h1>
        <div className="cursor-pointer"></div>
      </div>

      <div className="w-full text-left">
        <PopoverWrapper
          asChild
          trigger={
            <div className="max-w-[100%]">Purchase: {p.purchaseName}</div>
          }
          customClasses="w-full"
          content={
            <div className="w-full">
              <ul className="min-w-[60vw]">
                {popoverData.map((c) =>
                  p[c.key] ? (
                    <li
                      key={c.key}
                      className={`flex justify-center items-start gap-y-4 gap-x-4 ${c.key === "purchaseNotes" && "flex-col"}`}
                    >
                      <div className="font-bold text-xs w-full">{`${c.label}:`}</div>
                      <div className="text-xs w-full">
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

        {(item.itemNotes || allData?.listingNotes) && (
          <div className="flex flex-col">
            Notes: <Notes data={allData.listingNotes} />
          </div>
        )}
      </div>
    </div>
  );
}
