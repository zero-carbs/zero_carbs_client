import { describe, test, expect } from "vitest";
import { getFormattedSources } from "@/util/getFormattedSources";
import { UserSettingsWithSources } from "@/types";

describe("getFormattedSources", () => {
  test("returns an empty array if no sources", () => {
    const settings: UserSettingsWithSources = {
      id: "1",
      settingsId: "fff",
      userId: "test-user",
      theme: "test-theme",
      sources: [],
    };
    const expected: any = [];
    expect(getFormattedSources(settings)).toEqual(expected);
  });

  test("returns a formatted array of sources", () => {
    const settings: UserSettingsWithSources = {
      id: "1",
      settingsId: "fff",
      userId: "test-user",
      theme: "test-theme",
      sources: [
        {
          id: "10",
          userId: "test-user",
          sourceName: "test-source-name",
          sourceLabel: "test-source-label",
        },
      ],
    };
    const expected = [
      { label: "test-source-label", value: "test-source-name" },
    ];
    expect(getFormattedSources(settings)).toEqual(expected);
  });

  test("returns an empty array if settings is empty", () => {
    const settings: any = []
    const expected: any = [];
    expect(getFormattedSources(settings)).toEqual(expected);
  });
  
  test("returns an empty array if settings is null", () => {
    const settings: any = null;
    const expected: any = [];
    expect(getFormattedSources(settings)).toEqual(expected);
  });
  
  test("returns an empty array if settings is undefined", () => {
    const settings: any = undefined;
    const expected: any = [];
    expect(getFormattedSources(settings)).toEqual(expected);
  });
});
