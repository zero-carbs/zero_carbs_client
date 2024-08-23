export type ParamsEntries = IterableIterator<Entry> | Array<Entry>;
export type Entry = [string, string];

/**
 * Converts an array of key-value pairs representing URL parameters into an object.
 * @param params - An array of key-value pairs representing URL parameters.
 * @returns An object with keys representing the parameter names and values representing the parameter values.
 */
export const paramsToObject = (
  params: ParamsEntries,
): Record<string, string> => {
  const result: Record<string, string> = {};
  for (const [key, value] of params) {
    result[key] = value;
  }
  return result;
};
