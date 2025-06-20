/** @file Budget utils. */
import { calculatePayPeriodAmount } from "./currencyUtils"

const typeToCategory = {
  bill: "needs",
  ccPayment: "needs",
  loanPayment: "needs",
  variableExpense: "needs",
  shopping: "wants",
  takeout: "wants",
  entertainment: "wants",
  savingsTransfer: "future",
  investmentTransfer: "future",
  income: null,
}

/**
 * Gets category totals for needs, wants, and savings.
 * @param {Array} items - Budget items for categorization.
 * @param {string} category - Category for which to calculate total.
 * @returns {object} Object containing totals categorized as needs, wants, and savings.
 */
export const getBudgetCategoryTotal = (items, category) =>
  items
    // Filter by category
    .filter((i) => typeToCategory[i.type] === category)
    // Add to total
    .reduce(
      (sum, i) => sum + calculatePayPeriodAmount(i.amount, i.frequency) * 2,
      0
    )
