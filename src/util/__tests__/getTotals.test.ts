import { describe, test, expect } from "vitest";
import { getTotalPurchases } from "../getTotals";
import { DbPurchaseSelect } from "@/db/schema";

describe("getTotalPurchases", () => {
  test("returns the correct total for valid purchase data", () => {
    const validPurchaseData = [
      {
        id: "1",
        priceTotal: 2540,
        priceTax: 37522,
        priceShipping: 500,
        priceFees: 234,
      },
      {
        id: "2",
        priceTotal: 1000,
        priceTax: 1511,
        priceShipping: 898,
        priceFees: 42,
      },
    ];

    // @ts-ignore
    expect(getTotalPurchases(validPurchaseData)).toBe(44247);
  });

  test("returns 0 for an empty purchase data array", () => {
    const emptyPurchaseData: DbPurchaseSelect[] = [];

    expect(getTotalPurchases(emptyPurchaseData)).toBe(0);
  });

  // test("returns NaN if any of the prices are invalid", () => {
  //   const invalidPurchaseData = [
  //     { id: "1", priceTotal: -25, priceTax: 0, priceShipping: 5, priceFees: 2 },
  //     {
  //       id: "2",
  //       priceTotal: 100,
  //       priceTax: "",
  //       priceShipping: -8,
  //       priceFees: NaN,
  //     },
  //   ];
  //
  //   expect(getTotalPurchases(invalidPurchaseData)).toBeNaN();
  // });
});

// import { getTotalPurchases } from '../getTotals';
// import { DbPurchaseSelect } from '@server/db/schema';
//
// const validPurchaseData = [
//   { id: '1', priceTotal: 2540, priceTax: 37522, priceShipping: 500, priceFees: 234 },
//   { id: '2', priceTotal: 1000, priceTax: 1511, priceShipping: 898, priceFees: 42 }
// ];
//
// const invalidPurchaseData = [
//   { id: '1', priceTotal: -25, priceTax: 0, priceShipping: 5, priceFees: 2 },
//   { id: '2', priceTotal: 100, priceTax: '', priceShipping: -8, priceFees: NaN }
// ];
//
// describe('getTotalPurchases function', () => {
//   test('returns correct total for valid purchase data', () => {
//     expect(getTotalPurchases(validPurchaseData)).toBe(43347);
//   });
//
//   test('returns NaN if any of the prices are invalid', () => {
//     expect(getTotalPurchases(invalidPurchaseData)).toEqual(NaN);
//   });
//
//   test('returns 0 for an empty purchase data array', () => {
//     const emptyPurchaseData: DbPurchaseSelect[] = [];
//     expect(getTotalPurchases(emptyPurchaseData)).toBe(0);
//   });
// });
//
