import { ListingWithItems } from "@/types";

export const getMonthlySales = (rawData: ListingWithItems[]) => {
  const monthlySales = [
    { name: "January", value: 0 },
    { name: "February", value: 0 },
    { name: "March", value: 0 },
    { name: "April", value: 0 },
    { name: "May", value: 0 },
    { name: "June", value: 0 },
    { name: "July", value: 0 },
    { name: "August", value: 0 },
    { name: "September", value: 0 },
    { name: "October", value: 0 },
    { name: "November", value: 0 },
    { name: "December", value: 0 },
  ];

  function getMonthNum(month: string) {
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
    return months.indexOf(month);
  }

  function getTotalSalesForMonth(monthNum: number) {
    let totalSales = 0;
    rawData.forEach((listing: ListingWithItems) => {
      if (!listing.listingSoldDate) return;

      if (
        getMonthNum(
          new Date(listing.listingSoldDate).toLocaleString("default", {
            month: "long",
          }),
        ) === monthNum
      ) {
        totalSales +=
          listing.listingSoldPrice -
          listing.listingSoldShipping -
          listing.listingSoldFees;
      }
    });
    return totalSales;
  }

  monthlySales.forEach((_, index: number) => {
    monthlySales[index].value = getTotalSalesForMonth(index);
  });

  return monthlySales;
};
