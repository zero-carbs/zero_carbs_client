/**
 * Formats the user settings sources into an array of objects containing source label and source name.
 *
 * @param {UserSettingsWithSources} settings - User settings object with a list of sources.
 * @returns {Array<{label: string, value: string}>} - An array of objects with source label and source name.
 */

import { UserSettingsWithSources } from "@/types";

export const getFormattedSources = (settings: UserSettingsWithSources) => {
  if (!settings || Object.keys(settings).length === 0) return [];

  const formattedSources = settings.sources.map((source) => {
    const { sourceLabel: label, sourceName: value } = source;
    if (label && value) {
      return { label, value };
    }
    return { label: "", value: "" };
  });

  return formattedSources;
};
