import { convertCentsToDollars, formatPrice } from "@/lib/utils";

export const getMoneyCardData = (totalSpent: number, totalEarned: number) => {
  const res = [
    {
      label: "Spent:",
      value: formatPrice(convertCentsToDollars(totalSpent)),
    },
    {
      label: "Earned:",
      value: formatPrice(convertCentsToDollars(totalEarned)),
    },
  ];

  return res;
};
