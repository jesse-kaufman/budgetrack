/** @file Number utility functions. */

/**
 * Formats the value based on the decimals prop.
 * - If decimals is null, returns the value as is.
 * - If decimals is a valid number, formats the value to that many decimal places.
 * - If value is not a number, returns it as is.
 * @param {number|string} value - Value to format.
 * @param {[number]} decimals - Number of decimal places to format to. If null, no formatting is applied.
 * @returns {string} - Formatted value.
 * @throws {Error} - If decimals is invalid.
 */
export const formatNumber = (value, decimals = null) => {
  // Do not format if decimals is not set
  if (decimals === null) return value

  // Validate decimals
  if (isNaN(decimals) || decimals < 0) {
    throw new Error("Invalid value for decimals attribute")
  }

  // Attempt to parse the input as a float
  const parsedValue = parseFloat(value)

  // If parsedValue is a number, format it to the specified number of decimal places
  if (!isNaN(parsedValue)) return parsedValue.toFixed(decimals)

  // If value is not a number, return it as is
  return value
}

/**
 * Calculates the percentage of an item cost relative to the total cost.
 * @param {number} itemCost - Cost of the item to calculate the percentage for.
 * @param {number} totalCost - Total cost to compare against.
 * @returns {string} The percentage formatted as a string with a percent sign, or "N/A" if the total cost is zero or null.
 */
export const calculatePercent = (itemCost, totalCost) => {
  if ((itemCost === "") | (totalCost == null) || totalCost === 0) return ""

  const itemNum = parseFloat(itemCost)
  const totalNum = parseFloat(totalCost)

  if (isNaN(itemNum) || isNaN(totalNum)) return ""

  // eslint-disable-next-line no-magic-numbers
  const percentage = ((itemNum / totalNum) * 100).toFixed(1)
  return `${percentage}%`
}
