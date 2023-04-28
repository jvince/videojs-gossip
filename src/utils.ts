/**
 * Converts a date to a unix timestamp.
 */
export function toUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}
