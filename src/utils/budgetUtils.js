/** @file Budget utils. */
import { calculatePayPeriodAmount } from "./currencyUtils.js"
import { categoryMap } from "@/config/budgetConfig.js"

/**
 * Gets category totals for needs, wants, and savings.
 * @param {Array} items - Budget items for categorization.
 * @param {string} category - Category for which to calculate total.
 * @returns {object} Object containing totals categorized as needs, wants, and savings.
 */
export const getBudgetCategoryTotal = (items, category) =>
  items
    // Filter by category
    .filter((i) => categoryMap[i.type] === category)
    // Add to total
    .reduce(
      (sum, i) => sum + calculatePayPeriodAmount(i.amount, i.frequency) * 2,
      0
    )
