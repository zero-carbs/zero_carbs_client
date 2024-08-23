import { PurchaseWithItems } from "@/types";
import DataListCard from "../DataListCard";
import { getHighestPurchase } from "../chartUtils/getHighestPurchase";

export default function HighestPurchaseCard({
  dbPurchaseData,
}: {
  dbPurchaseData: PurchaseWithItems[];
}) {
  const highestPurchaseData = getHighestPurchase(dbPurchaseData);

  return (
    <DataListCard
      data={highestPurchaseData.data}
      title="Highest Purchase Return"
      description={highestPurchaseData.name}
    />
  );
}
