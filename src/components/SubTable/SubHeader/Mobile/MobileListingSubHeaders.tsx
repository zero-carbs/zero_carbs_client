import Notes from "@/components/TableCells/Notes";
import { price } from "@/lib/utils";
import { ListingWithItems } from "@/types";

export default function MobileListingSubHeaders({
  data,
}: {
  data: ListingWithItems;
}) {
  const mobilePurchaseHeaderData = [
    { label: "Date listed", value: <div>{data.listingDate}</div> },
    { label: "Listed on", value: <div>{data.listingSource}</div> },
    { label: "Sold", value: <div>{data.listingSold ? "true" : "---"}</div> },
    { label: "Sold price", value: <div>{price(data.listingSoldPrice)}</div> },
    {
      label: "Sold shipping",
      value: <div>{price(data.listingSoldShipping)}</div>,
    },
    { label: "Sold fees", value: <div>{price(data.listingSoldFees)}</div> },
    {
      label: "Notes",
      value: data.listingNotes ? <Notes data={data.listingNotes} /> : null,
    },
  ];

  return (
    <>
      <div className="col-span-full px-2 pt-2 columns-2">
        {mobilePurchaseHeaderData.map((item) => (
          <div
            key={item.label}
            className={`flex gap-x-2 leading-[18px] ${item.label === "Notes" && "flex-col"}`}
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
