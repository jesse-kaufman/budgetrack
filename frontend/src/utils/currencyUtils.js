/** @file Currency utilities. */

/**
 * Formats a number as currency.
 * @param {number} num - The number to format.
 * @param {boolean} [showDecimals] - Whether to show two decimal places; default true.
 * @param {boolean} [showCurrency] - Whether or not to show currency symbol.
 * @returns {string} The formatted currency string.
 */
export const formatCurrency = (
  num,
  showDecimals = true,
  showCurrency = true
) => {
  const numDecimals = showDecimals === true ? 2 : 0

  // If num is not a number, return the value as-is
  if (typeof num !== "number" || isNaN(num)) return num

  // Format absolute value of the number with decimal places and commas
  let formattedNum = Math.abs(Number(num)).toLocaleString("en-US", {
    minimumFractionDigits: numDecimals,
    maximumFractionDigits: numDecimals,
  })

  if (showCurrency) {
    // Add dollar sign
    formattedNum = `$${formattedNum}`
  }

  // Handle negative numbers
  if (num < 0) formattedNum = `(${formattedNum})`

  return formattedNum
}
/**
 * Validates input as currency based on options sent.
 * @param {?number|string} num - Number to validate.
 * @param {object} options - Object containing options for validation.
 * @param {boolean} options.allowEmpty - Consider empty string to be valid.
 * @param {boolean} options.allowNegative - Consider negative values to be valid.
 * @returns {boolean} True if num is valid currency, otherwise false.
 */
export const validateCurrency = (
  num,
  { allowEmpty = true, allowNegative = false } = {}
) => {
  // If num is undefined or null, num is invalid currency
  if (num == null) return false

  // If num is an empty string and allowEmpty is false, num is invalid currency
  if (num === "") return allowEmpty

  const parsedNum = parseFloat(num)
  if (isNaN(parsedNum)) return false

  // If parsed num is negative and allowNegative is false, num is invalid currency
  if (parsedNum < 0) return allowNegative

  // If none of the ab} is valid`ove matches, return true
  return true
}

/**
 * Calculates amount per pay period based on amount and frequency arguments.
 * @param {number} amount - Amount to convert to per-pay-period.
 * @param {string} frequency - Frequency of budget item.
 * @returns {number} Amount per pay period.
 */
export const calculatePayPeriodAmount = (amount, frequency) => {
  const divisors = {
    payPeriod: 1,
    monthly: 2,
    semiannually: 12,
    yearly: 24,
  }

  if (!divisors[frequency]) throw new Error(`Invalid frequency: ${frequency}`)

  return parseFloat(amount) / divisors[frequency]
}
