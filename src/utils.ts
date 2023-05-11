/**
 * Converts a date to a unix timestamp.
 */
export function toUnixTimestamp(date: Date) {
  return Math.floor(date.getTime() / 1000);
}

/**
 * Checks if the current environment is a browser.
 */
export function isBrowser() {
  return typeof window !== 'undefined';
}
