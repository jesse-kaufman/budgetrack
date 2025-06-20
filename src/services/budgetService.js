/** @file Loan services. */
import { API_BASE } from "@/config/api"

/**
 * Gets budget from repository.
 * @returns {object} Object containing budget.
 */
export const getBudget = async () => {
  const res = await fetch(`${API_BASE}/budget`, {
    credentials: "include",
  })

  if (!res.ok) throw new Error("Failed to fetch budget")
  return res.json()
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
