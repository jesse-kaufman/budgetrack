/** @file Loan services. */
import { API_BASE } from "@/config/api"

/**
 * Gets list of loans from repository.
 * @returns {object[]} - List of construction loans.
 */
export const getLoans = async () => {
  const res = await fetch(`${API_BASE}/construction-loans`, {
    method: "GET",
    credentials: "include",
  })
  if (!res.ok) throw new Error("Failed to fetch loans")
  return res.json()
}

/**
 * Gets loan from repository.
 * @param {number} id - ID of the loan to retrieve.
 * @returns {object} Loan object containing project details and costs.
 */
export const getLoan = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const res = await fetch(`${API_BASE}/construction-loans/${id}`, {
    credentials: "include",
  })

  if (!res.ok) throw new Error("Failed to fetch loan")
  return res.json()
}

/**
 * Saves object to repository via API.
 * @param {object} loan - Loan object to be saved.
 * @returns {object} JSON copy of saved object.
 */
export const saveLoan = async (loan) => {
  const isUpdate = Boolean(loan.id)
  const url = isUpdate ? `${API_BASE}/construction-loans/${loan.id}` : API_BASE
  const method = isUpdate ? "PUT" : "POST"

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loan),
  })

  if (!res.ok) throw new Error("Failed to save loan")
  return res.json()
}
