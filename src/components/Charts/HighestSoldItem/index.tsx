import { price } from "@/lib/utils";
import { formatDistance } from "date-fns";
import { getHighestSoldItem } from "../chartUtils/getHighestSoldItem";
import DataListCard from "../DataListCard";
import { DbItemSelect } from "@server/db/schema";
import { ListingWithItems, PurchaseWithItems } from "@/types";

export default function HighestSoldItem({
  dbListingData,
  dbPurchaseData,
  dbAllItems,
}: {
  dbListingData: ListingWithItems[];
  dbPurchaseData: PurchaseWithItems[];
  dbAllItems: DbItemSelect[];
}) {
  const highestSoldItem = getHighestSoldItem({
    dbListingData,
    dbPurchaseData,
    dbAllItems,
  });

  const highestSoldItemData = [
    {
      label: "Purchase Price:",
      value: highestSoldItem
        ? price(highestSoldItem.purchase.priceTotal)
        : price(0),
    },
    {
      label: "Sold Price (net):",
      value: highestSoldItem
        ? price(highestSoldItem.purchase.soldTotals)
        : price(0),
    },
    {
      label: "Turnover:",
      value: highestSoldItem
        ? formatDistance(
            highestSoldItem.purchase.datePurchased,
            highestSoldItem?.item?.soldDate || 0,
          )
        : "N/A",
    },
    {
      label: "Source:",
      value: highestSoldItem ? highestSoldItem.purchase.source : "N/A",
    },
  ];

  return (
    <DataListCard
      data={highestSoldItemData}
      title="Highest Sold Item"
      description={highestSoldItem ? highestSoldItem?.item?.itemName : ""}
    />
  );
}
