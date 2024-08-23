/**
 * Localizes a value by formatting it according to the specified language and format.
 * @param value - The value to be localized. It can be a string or a number.
 * @returns The localized value in the format specified by the language.
 */

export const localizeValue = (value: string | number) => {
  if (typeof value === "number") {
    // If the value is a number, format it using the en-US locale.
    return value.toLocaleString("en-US");
  }

  if (value.includes("%")) {
    // If the value includes a percentage sign, remove the percent sign and format the remaining number.
    const noPercent = value.replace("%", "");
    const formattedPercent = Number(noPercent).toLocaleString("en-US") + "%";
    return formattedPercent;
  }

  if (value.includes("+")) {
    // If the value includes a plus sign, remove the plus sign and format the remaining number.
    const noPlus = value.replace("+", "");
    const formattedPlus = Number(noPlus).toLocaleString("en-US");
    return `+${formattedPlus}`;
  }

  if (value.includes("-")) {
    // If the value includes a minus sign, remove the minus sign and format the remaining number.
    const noMinus = value.replace("-", "");
    const formattedMinus = Number(noMinus).toLocaleString("en-US");
    return `-${formattedMinus}`;
  }

  return value;
};
