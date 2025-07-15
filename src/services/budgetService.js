/** @file Loan services. */
import { API_BASE } from "@/config/api"
import { validBudgetItemTypes } from "@/config/budgetConfig"

/**
 * Gets budget from repository.
 * @returns {object} Object containing budget.
 */
export const getBudget = async () => {
  // eslint-disable-next-line no-magic-numbers
  await new Promise((r) => setTimeout(r, 1000))

  // Get budget from API
  const res = await fetch(`${API_BASE}/budget`)

  // Throw error if request failed
  if (!res.ok) throw new Error("Failed to fetch budget")

  // Get budget from response and sort items by type
  const budget = await res.json()
  budget.items = sortItemsByTypeOrder(budget.items)

  return budget
}

/**
 * Saves object to repository via API.
 * @param {object} budget - Budget object to be saved.
 * @returns {object} JSON copy of saved object.
 */
export const saveBudget = async (budget) => {
  const url = `${API_BASE}/budget`
  const method = "POST"

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(budget),
  })

  if (!res.ok) throw new Error("Failed to save budget")
  return res.json()
}

/**
 * Sorts items in the same order as validBudgetItemTypes.
 * @param {Array} items - Items to sort.
 * @returns {Array} Items sorted by type matching validBudgetItemTypes.
 */
function sortItemsByTypeOrder(items) {
  const typeOrder = Object.keys(validBudgetItemTypes)

  return [...items].sort((a, b) => {
    const aIndex = typeOrder.indexOf(a.type)
    const bIndex = typeOrder.indexOf(b.type)
    return aIndex - bIndex
  })
}
