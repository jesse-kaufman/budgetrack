/** @file Budget item frequency data. */

/**
 * Defines all valid budget item frequencies with their display name.
 * This is the single source of truth.
 *
 * The 'key' property will be used as the enum value in the database.
 */
const _data = [
  // Use an internal variable for the raw data array
  {
    key: "payPeriod",
    name: "Pay Period",
  },
  {
    key: "monthly",
    name: "Monthly",
  },
  {
    key: "semiannually",
    name: "6 Months",
  },
  {
    key: "yearly",
    name: "Yearly",
  },
]

// Create an internal map for efficient lookups
const _map = _data.reduce((acc, item) => {
  acc[item.key] = item
  return acc
}, {})

/**
 * Retrieves all budget item types.
 * @returns {Array<object>} A shallow copy of all budget item type objects.
 */
const getAll = () => [..._data] // Return a copy to prevent external modification

/**
 * Retrieves a specific budget item type by its key.
 * @param {string} key - The unique key of the budget item type.
 * @returns {object | undefined} The budget item object if found, otherwise undefined.
 */
const get = (key) => _map[key]

/**
 * Retrieves the display name for a specific budget item type.
 * @param {string} key - The unique key of the budget item type.
 * @returns {string | undefined} The display name if found, otherwise undefined.
 */
const getName = (key) => _map[key]?.name

/**
 * Retrieves an array of keys for budget item types.
 * @returns {Array<string>} Array of keys.
 */
const getKeys = () => _data.map((item) => item.key)

export default {
  getAll,
  get,
  getName,
  getKeys,
}
