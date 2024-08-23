import { ListingWithItems, PurchaseWithItems } from "@/types";
import CardWrapper from "@/components/CardWrapper";
import { getPurchasesPerMonth } from "@/util/groupDataByMonth";
import { DbItemSelect } from "@server/db/schema";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function PurchasesOverTime({
  purchaseData,
  listingData,
  itemData,
  colors,
  gridColor,
}: {
  purchaseData: PurchaseWithItems[];
  listingData: ListingWithItems[];
  itemData: DbItemSelect[];
  colors: string[];
  gridColor: string;
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getMonthFromString = (dateString: Date | string) => {
    const dateObj = new Date(dateString);
    const month = dateObj.getMonth() + 1;

    return month;
  };

  const filterOnlyThisYear = (arr: any[], year: string, dateKey: string) => {
    const thisYearData = arr.filter(
      (item) => item[dateKey] && item[dateKey].split("-")[0] === year,
    );
    return thisYearData;
  };

  const currentYear = new Date().getFullYear().toString();

  const thisYearListing = filterOnlyThisYear(
    listingData,
    currentYear,
    "listingDate",
  );
  const thisYearItems = filterOnlyThisYear(itemData, currentYear, "soldDate");

  const soldItems = thisYearItems.filter((item) => item.isSold === true);
  const soldItemData = soldItems.map((item) => ({
    name: item.itemName,
    soldDate: item.soldDate,
    monthNumber: getMonthFromString(item.soldDate),
  }));

  const allListingDates = thisYearListing.map((item) => ({
    name: item.listingDate,
  }));

  const allListingMonths = allListingDates.map((item) =>
    getMonthFromString(item.name),
  );

  type NumberWithCount = { name: string; count: number };

  const countNumbersInArray = (arr: number[]): NumberWithCount[] => {
    let result: NumberWithCount[] = [];
    arr.forEach((num) => {
      const existingObj = result.find((obj) => obj.name === String(num));
      if (existingObj) {
        existingObj.count++;
      } else {
        result.push({ name: String(num), count: 1 });
      }
    });
    return result;
  };

  const listingDateArr = countNumbersInArray(allListingMonths);
  const itemDateArr = countNumbersInArray(
    soldItemData.map((item) => item.monthNumber),
  );

  const blankArray = months.map((item) => {
    return { name: item, count: 0 };
  });

  const listingMonths = listingDateArr.map((item) => {
    const monthNum = getMonthFromString(item.name);
    item.name = months[monthNum - 1];
    return item;
  });

  const itemMonths = itemDateArr.map((item) => {
    const monthNum = getMonthFromString(item.name);
    item.name = months[monthNum - 1];
    return item;
  });

  const uglyListingMonths = [...blankArray, ...listingMonths];
  const uglyItemMonths = [...blankArray, ...itemMonths];

  type IItem = {
    [key: string]: any; // Replace 'any' with the actual data type of 'item'.
  };

  const getUniqueListBy = <T extends IItem[]>(
    arr: T,
    key: keyof IItem,
  ): T[] => {
    return Array.from(
      new Map(arr.map((item) => [item[key], item])).values(),
    ) as T[];
  };

  const uniqueArray = getPurchasesPerMonth(purchaseData);
  const uniqueListingArray = getUniqueListBy(uglyListingMonths, "name");
  const uniqueSoldArray = getUniqueListBy(uglyItemMonths, "name");

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      legend: { position: "bottom" as const },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: { color: gridColor },
      },
      y: {
        grid: { color: gridColor },
        grace: "10%",
        min: 0,
        type: "linear" as const,
        display: true,
        position: "left" as const,
        yAxisId: "y",
      },
      y1: {
        grace: "10%",
        min: 0,
        type: "linear" as const,
        display: false,
        position: "right" as const,
        yAxisId: "y1",
        grid: {
          drawOnChartArea: false,
          color: gridColor,
        },
      },
    },
  };

  const sourceData = {
    labels: months,
    datasets: [
      {
        label: " Purchases",
        data: uniqueArray.map((purchasedItems: any) => purchasedItems.count),
        backgroundColor: colors[0] || ["salmon"],
        borderColor: colors[0] || ["salmon"],
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: " Listings",
        data: uniqueListingArray.map(
          (purchasedItems: any) => purchasedItems.count,
        ),
        backgroundColor: colors[1] || ["lightpink"],
        borderColor: colors[1] || ["lightpink"],
        borderWidth: 1,
        tension: 0.1,
      },
      {
        label: " Items Sold",
        data: uniqueSoldArray.map(
          (purchasedItems: any) => purchasedItems.count,
        ),
        backgroundColor: colors[2] || ["steelblue"],
        borderColor: colors[2] || ["steelblue"],
        borderWidth: 1,
        tension: 0.1,
      },
    ],
  };
  return (
    <CardWrapper
      title="Inventory: 2024"
      content={<Line options={options} data={sourceData} />}
    />
  );
}
