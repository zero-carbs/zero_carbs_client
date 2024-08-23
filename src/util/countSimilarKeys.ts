/**
 * Counts the number of occurrences of a given key in an array of Item objects and returns an array of objects,
 * each containing the key name and its corresponding count.
 *
 * @param {Item[]} arrData - An array of Item objects.
 * @param {string} valueToCount - The key name whose occurrences are to be counted.
 * @returns {({name: string, count: number}[]) } - An array of objects, each containing a name and its corresponding count.
 */

interface Item {
  [key: string]: any;
}

export function countSimilarKeys(
  arrData: Item[],
  valueToCount: string,
): { name: string; count: number }[] {
  if (arrData.length === 0) return [];

  const countObj: Record<string, number> = {};

  arrData.forEach((item) => {
    if (countObj[item[valueToCount]]) {
      countObj[item[valueToCount]]++;
    } else {
      countObj[item[valueToCount]] = 1;
    }
  });

  const result: { name: string; count: number }[] = Object.entries(
    countObj,
  ).map(([key, value]) => ({ name: key, count: value }));

  return result;
}
