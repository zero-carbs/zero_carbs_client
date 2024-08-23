import { describe, expect, test } from "vitest";
import { countSimilarKeys } from "../countSimilarKeys";

interface Item {
  [key: string]: any;
}
const oneItem: Item[] = [{ name: "name1", source: "source1" }];
const testArr: Item[] = [
  { name: "name1", source: "source1" },
  { name: "name2", source: "source1" },
  { name: "name3", source: "source2" },
];

const valueToCount = "source";

describe("countSimilarKeys", () => {
  test("should return an empty array when given an empty array", () => {
    const arrData: Item[] = [];
    expect(countSimilarKeys(arrData, valueToCount)).toEqual([]);
  });

  test("should return an array with one object when given an array with one item", () => {
    const expected = [{ name: "source1", count: 1 }];
    expect(countSimilarKeys(oneItem, valueToCount)).toEqual(expected);
  });

  test("should return an array with one object for each unique source and a count of the number of occurrences", () => {
    const expected = [
      { name: "source1", count: 2 },
      { name: "source2", count: 1 },
    ];
    expect(countSimilarKeys(testArr, valueToCount)).toEqual(expected);
  });

  test("should handle null values as name string", () => {
    const arr = [
      { name: "name1", source: "source1" },
      { name: "name1", source: null },
    ];
    const expected = [
      { name: "source1", count: 1 },
      { name: "null", count: 1 },
    ];
    expect(countSimilarKeys(arr, "source")).toEqual(expected);
  });

  test("errors out when passed an array that does not match type", () => {
    const arr = ["this is bad"];
    const expected = Error;

    // @ts-ignore
    expect(countSimilarKeys(arr, "source")).toThrow(expected);
  });
});
