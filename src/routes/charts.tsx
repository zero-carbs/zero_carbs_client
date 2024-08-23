import PieChart from "@/components/Charts/PieChart";
import DataListCard from "@/components/Charts/DataListCard";
import CardWrapper from "@/components/CardWrapper";
import PurchasesOverTime from "@/components/Charts/PurchasesOverTime";
import MonthlySalesBarChart from "@/components/Charts/MonthlySalesBarChart";
import { countSimilarKeys } from "@/util/countSimilarKeys";
import { getTotalPurchases, getTotalEarned } from "@/util/getTotals";
import { getMonthlySales } from "@/util/getMonthlySoldTotals";
import { getChartColors } from "@/config/chartColors";
import { DbItemSelect } from "@server/db/schema";
import { ListingWithItems, PurchaseWithItems } from "@/types";
import { getMoneyCardData } from "@/components/Charts/chartUtils/moneyCardData";
import { getPurchaseCardData } from "@/components/Charts/chartUtils/getPurchaseCardData";
import ChartSkeleton from "@/components/Skeletons/ChartSkeleton";
import HighestSoldItem from "@/components/Charts/HighestSoldItem";
import HighestPurchaseCard from "@/components/Charts/HighestPurchaseCard";
import { useTanFetch } from "@/hooks/useTanFetch";

export default function ChartPage() {
  const { data: dbRes, isLoading } = useTanFetch(["chart-data"]);

  const { colors: chartColors, grid: gridColor } = getChartColors();
  console.log("gridColor charts:", gridColor)

  if (isLoading || !dbRes?.allTableData) {
    return <ChartSkeleton />;
  }

  const {
    dbPurchaseData,
    dbListingData,
    dbAllItems,
  }: {
    dbPurchaseData: PurchaseWithItems[];
    dbListingData: ListingWithItems[];
    dbAllItems: DbItemSelect[];
  } = dbRes?.allTableData;

  const hasPurchases = dbPurchaseData.length > 0;
  const uniqueKeys = countSimilarKeys(dbPurchaseData, "source");
  const totalSpent = getTotalPurchases(dbPurchaseData) || 0;
  const totalEarned = getTotalEarned(dbListingData) || 0;
  const monthlySoldTotals = getMonthlySales(dbListingData) || [];
  const purchaseCardData = getPurchaseCardData(
    dbPurchaseData,
    dbListingData,
    dbAllItems,
  );
  const moneyCardData = getMoneyCardData(totalSpent, totalEarned);

  const listedSoldItemData = [
    {
      name: "Unlisted",
      count:
        dbAllItems.filter((item: any) => !item.isSold && !item.isListed)
          .length || 0,
    },
    {
      name: "Listed",
      count: dbAllItems.filter((item: any) => item.isListed).length || 0,
    },
    {
      name: "Sold",
      count: dbAllItems.filter((item: any) => item.isSold).length || 0,
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 px-2 py-2 pb-20 md:grid-cols-6">
      <div className="col-span-3 md:col-span-2">
        <div className="flex gap-4 md:flex-col">
          <DataListCard data={purchaseCardData} />
          <DataListCard data={moneyCardData} />
        </div>
      </div>

      <div className="col-span-3 flex md:col-span-4">
        <div className="flex grow gap-4">
          <HighestSoldItem
            dbPurchaseData={dbPurchaseData}
            dbListingData={dbListingData}
            dbAllItems={dbAllItems}
          />
          <HighestPurchaseCard dbPurchaseData={dbPurchaseData} />
        </div>
      </div>

      {/* Monthly Purchases/Listings/Sold */}
      <div className="col-span-3 h-full w-full">
        <PurchasesOverTime
          purchaseData={dbPurchaseData}
          listingData={dbListingData}
          itemData={dbAllItems}
          colors={chartColors}
          gridColor={gridColor}
        />
      </div>

      {/* Monthly Sales */}
      <div className="col-span-3 h-full w-full">
        <MonthlySalesBarChart
          salesData={monthlySoldTotals}
          colors={chartColors}
          gridColor={gridColor}
        />
      </div>

      {/* Pie Charts */}
      {hasPurchases && (
        <>
          <CardWrapper
            contentClasses="flex justify-center items-center flex-col"
            title="Items"
            content={
              <PieChart data={listedSoldItemData} colors={chartColors} />
            }
          />
          <CardWrapper
            contentClasses="flex justify-center items-center flex-col"
            title="Sources"
            content={<PieChart data={uniqueKeys} colors={chartColors} />}
          />
        </>
      )}
    </div>
  );
}
