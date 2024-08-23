import { describe, it, expect } from "vitest";
import { localizeValue } from "@/util/localizeValue";

describe("localizeValue", () => {
  it("should return the input value as a string if it is a number", () => {
    const value = 123456;
    const result = localizeValue(value);
    expect(result).toBe("123,456");
  });

  it("should return the input value as a string with a percentage sign if it includes a percentage sign", () => {
    const value = "123.45%";
    const result = localizeValue(value);
    expect(result).toBe("123.45%");
  });

  it("should return the input value as a string with a plus sign if it includes a plus sign", () => {
    const value = "+123.45";
    const result = localizeValue(value);
    expect(result).toBe("+123.45");
  });

  it("should return the input value as a string with a minus sign if it includes a minus sign", () => {
    const value = "-123.45";
    const result = localizeValue(value);
    expect(result).toBe("-123.45");
  });

  it("should return the input value as a string if it does not include any special characters", () => {
    const value = "123.45";
    const result = localizeValue(value);
    expect(result).toBe("123.45");
  });
});
