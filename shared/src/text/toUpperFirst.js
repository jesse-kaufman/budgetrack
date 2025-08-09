/** @file Text utility functions. */

/**
 * Capitalizes the first letter of a string.
 * @param {string} str - String to format.
 * @returns {string} Formatted string.
 */
export const toUpperFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)
