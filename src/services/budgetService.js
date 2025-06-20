/** @file Loan services. */
import { API_BASE } from "@/config/api"

/**
 * Gets budget from repository.
 * @returns {object} Object containing budget.
 */
// eslint-disable-next-line max-lines-per-function
export const getBudget = () => {
  const budget = {
    lastUpdated: new Date(),
    items: [
      {
        name: "Paycheck",
        type: "income",
        amount: 2000,
        frequency: "payPeriod",
      },
      {
        name: "Electricity",
        type: "bill",
        amount: 190,
        dueOn: "15th of month",
        frequency: "monthly",
      },
      {
        name: "Natural Gas",
        type: "bill",
        amount: 90,
        dueOn: "7th of month",
        frequency: "monthly",
      },
      {
        name: "Christmas savings",
        type: "savingsTransfer",
        amount: 10,
        frequency: "payPeriod",
      },
      {
        name: "Safety Net",
        type: "investmentTransfer",
        amount: 10,
        frequency: "payPeriod",
      },
    ],
  }

  //  const res = await fetch(`${API_BASE}/budget`, {
  //    credentials: "include",
  //  })

  // if (!res.ok) throw new Error("Failed to fetch budget")
  // return res.json()
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
