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

const getMonthFromString = (dateString: Date) => {
  const dateObj = new Date(dateString);
  const month = dateObj.getMonth() + 1;

  return month;
};

const filterOnlyThisYear = (arr: any[], year: string, dateKey: string) => {
  const thisYearData = arr.filter(
    (item: any) => item[dateKey] && item[dateKey].split("-")[0] === year,
  );
  return thisYearData;
};

const currentYear = new Date().getFullYear().toString();

const getAllPurchaseDates = (data: any[]) =>
  data.map((item: any) => ({
    name: item.datePurchased,
    soldTotals: item.soldTotals,
  }));

const getAllPurchaseMonths = (data: any[]) =>
  data.map((item: any) => getMonthFromString(item.name));

const getAllPurchaseMonthsWithTotals = (data: any[]) =>
  data.map((item: any) => ({
    name: getMonthFromString(item.name),
    soldTotals: item.soldTotals,
  }));

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

const blankArray = months.map((item: any) => {
  return { name: item, count: 0 };
});

const getPurchaseMonths = (data: any[]) =>
  data.map((item: any) => {
    const monthNum = getMonthFromString(item.name);
    item.name = months[monthNum - 1];
    return item;
  });

type IItem = {
  [key: string]: any; // Replace 'any' with the actual data type of 'item'.
};

const getUniqueListBy = <T extends IItem[]>(arr: T, key: keyof IItem): T[] => {
  return Array.from(
    new Map(arr.map((item) => [item[key], item])).values(),
  ) as T[];
};

// FIX: This is currently taking the purchase year to get the data. It should be using the year
// from each item that is sold.
export const getMonthlySoldTotals = (data: any[]) => {
  // console.log('groupDataByMonth:', data);
  const thisYearPurchases = filterOnlyThisYear(
    data,
    currentYear,
    "datePurchased",
  );
  // console.log('thisYearPurchases:', thisYearPurchases);
  const allPurchaseDates = getAllPurchaseDates(thisYearPurchases).filter(
    (purchase: any) => purchase.soldTotals !== 0,
  );
  // console.log('allPurchaseDates:', allPurchaseDates);
  const allPurchaseMonthsWithTotals =
    getAllPurchaseMonthsWithTotals(allPurchaseDates);
  // console.log('allPurchaseMonthsWithTotals:', allPurchaseMonthsWithTotals);

  // function groupBy(data: { name: number, soldTotals: number }[], key: keyof typeof data ) {

  type ItemType = { name: number; soldTotals: number };
  type ResType = ItemType[];

  // wtf typescript
  function groupBy(data: any, key: string): ResType {
    let groups: { [key: string]: any } = {};

    data.forEach((item: ItemType) => {
      /* @ts-ignore */
      if (!groups[item[key]]) {
        /* @ts-ignore */
        groups[item[key]] = { [key]: item[key], soldTotals: 0 };
      }

      /* @ts-ignore */
      groups[item[key]].soldTotals += item.soldTotals;
    });

    return Object.values(groups);
  }

  const groupedData = groupBy(allPurchaseMonthsWithTotals, "name");
  // console.log('groupedData:', groupedData);

  const addAllMonths = (arr: { name: number; soldTotals: number }[]) => {
    const newArr: any[] = [];
    for (let i = 0; i <= 11; i++) {
      newArr.push(
        arr[i]
          ? { name: months[i], value: arr[i].soldTotals }
          : { name: months[i], value: 0 },
      );
    }
    return newArr;
  };

  const withMonthNames = addAllMonths(groupedData);
  // console.log('withMonthNames:', withMonthNames);
  return withMonthNames;
};

export const getPurchasesPerMonth = (data: any[]) => {
  // console.log('start data:', data)
  const thisYearPurchases = filterOnlyThisYear(
    data,
    currentYear,
    "datePurchased",
  );

  const allPurchaseDates = getAllPurchaseDates(thisYearPurchases);
  const allPurchaseMonths = getAllPurchaseMonths(allPurchaseDates);
  const purchaseDateArr = countNumbersInArray(allPurchaseMonths);
  const purchaseMonthArr = getPurchaseMonths(purchaseDateArr);
  const monthsArray = [...blankArray, ...purchaseMonthArr];
  const purchasesPerMonth = getUniqueListBy(monthsArray, "name");

  return purchasesPerMonth;
};
