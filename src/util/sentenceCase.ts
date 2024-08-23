/**
 * Convert a string to sentence case
 * @param str The string to convert
 * returns The converted string
 */
export function sentenceCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
