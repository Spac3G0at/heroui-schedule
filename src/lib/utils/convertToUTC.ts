// dateUtils.js

import moment from "moment";

/**
 * Converts a local date string or Date object to a UTC ISO string.
 * @param {string | Date} localDate - The local date (string or Date object) to convert to UTC.
 * @returns {string} The UTC ISO string.
 */
export const convertToUTC = (localDate: string | Date) => {
  // If input is a string, assume it's in local time
  // If input is a Date object, moment() will take care of it
  return moment(localDate).utc().toISOString();
};
