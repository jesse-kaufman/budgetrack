/** @file Budget item type data. */

/**
 * Defines all valid budget item types with their display name,
 * associated category, and an icon. This is the single source of truth.
 *
 * The 'key' property will be used as the enum value in the database.
 */
const _data = [
  // Use an internal variable for the raw data array
  {
    key: "income",
    name: "Income",
    category: null,
    icon: "💵",
  },
  {
    key: "loanPayment",
    name: "Loan Payments",
    category: "needs",
    icon: "🏛️",
  },
  {
    key: "ccPayment",
    name: "Credit Card Payments",
    category: "needs",
    icon: "💳",
  },
  {
    key: "bill",
    name: "Bills",
    category: "needs",
    icon: "🧾",
  },
  {
    key: "variableExpense",
    name: "Variable Expenses",
    category: "needs",
    icon: "🚗",
  },
  {
    key: "shopping",
    name: "Shopping",
    category: "wants",
    icon: "🛍️",
  },
  {
    key: "takeout",
    name: "Takeout",
    category: "wants",
    icon: "🍟",
  },
  {
    key: "entertainment",
    name: "Entertainment",
    category: "wants",
    icon: "🍿",
  },
  {
    key: "savings",
    name: "Savings",
    category: "future",
    icon: "💰",
  },
  {
    key: "investments",
    name: "Investments",
    category: "future",
    icon: "📈",
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
 * Retrieves the icon for a specific budget item type.
 * @param {string} key - The unique key of the budget item type.
 * @returns {string | undefined} The icon string if found, otherwise undefined.
 */
const getIcon = (key) => _map[key]?.icon

/**
 * Retrieves the category for a specific budget item type.
 * @param {string} key - The unique key of the budget item type.
 * @returns {string | null | undefined} The category string (e.g., "needs", "wants", "future"), null for 'income', or undefined if key not found.
 */
const getCategory = (key) => _map[key]?.category

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
  getIcon,
  getCategory,
  getKeys,
}
