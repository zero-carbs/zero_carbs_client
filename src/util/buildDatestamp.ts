/**
 * Builds a datestamp string from a given date.
 *
 * @param date - The date to build the datestamp from.
 * @return The datestamp string in the format "YYYYMMDD".
 */

export const buildDatestamp = (date: Date) => {
  const month = date.getMonth() < 10 ? `0${date.getMonth()}` : date.getMonth();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const year = date.getFullYear();

  return `${year}${month}${day}`;
};
