import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const percentDifference = (cost: number, revenue: number) => {
  const profit = revenue - cost;
  const profitPercentage = (profit / cost) * 100;
  return `${profitPercentage.toFixed(2)}%`;
};

export const formatPrice = (price: number) => {
  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return priceFormatter.format(price);
};

// this functiont converts a decimal price to an integer of cents
export const convertDollarsToCents = (price: any) =>
  Number(Math.round(price * 100));

// this function converts cents to a decimal price
export const convertCentsToDollars = (cents: any) => Number(cents) / 100;

// converts a decimal price to an integer of cents
export const convertDecimalToCents = (price: number) => Math.round(price * 100);

export const price = (price: number) =>
  formatPrice(convertCentsToDollars(price));

// Removes duplicate entries from an array
export const removeDuplicates = (arr: any[]) => {
  let uniqueArray = [];
  for (let i = 0; i < arr.length; i++) {
    const currentElementIndex = uniqueArray.indexOf(arr[i]);
    if (currentElementIndex === -1) {
      uniqueArray.push(arr[i]);
    }
  }
  return uniqueArray;
};

// Calculates the profit/loss for a purchase and returns an integer
export const calculateProfitMargin = (
  purchasePrice: number,
  soldPrice: number,
) => {
  if (soldPrice > purchasePrice) {
    const profit = soldPrice - purchasePrice; // Calculate profit first
    const res = Math.round((profit / purchasePrice) * 100).toFixed(0);
    return `+${res}`;
  }

  if (soldPrice < purchasePrice) {
    const loss = purchasePrice - soldPrice;
    return `-${((loss / purchasePrice) * 100).toFixed(0)}`;
  }

  return 0;
};
