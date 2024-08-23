/**
 * Replaces all UUIDs in a text with an empty string.
 * @param text The text to search.
 * @returns The text with all UUIDs removed.
 */

export const replaceUUID = (text: string) => {
  const uuidRegex =
    /\`([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})\`/g;
  return text.replace(uuidRegex, "");
};
