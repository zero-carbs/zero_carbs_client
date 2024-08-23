/**
 * Converts a string into a slug by removing special characters, converting to lowercase, and replacing spaces with hyphens.
 *
 * @param {string} str - The string to be converted into a slug.
 * @returns {string} - The slugified version of the input string.
 * @throws {TypeError} - If the input is not a string.
 * @example
 *
 * slugify("Hello World!"); // Output: "hello-world"
 * slugify("  This is a Test  "); // Output: "this-is-a-test"
 * slugify("12345"); // Output: "12345"
 */
export const slugify = (str: string): string => {
  if (typeof str !== "string") {
    throw new TypeError("Input must be a string");
  }

  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};
