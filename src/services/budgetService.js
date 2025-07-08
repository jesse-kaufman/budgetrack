/** @file Loan services. */
import { API_BASE } from "@/config/api"
import { validBudgetItemTypes } from "@/config/budgetConfig"

/**
 * Gets budget from repository.
 * @returns {object} Object containing budget.
 */
// eslint-disable-next-line max-lines-per-function
export const getBudget = async () => {
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
        name: "Mortgage",
        type: "loanPayment",
        amount: 565,
        frequency: "monthly",
      },
      {
        name: "Student Loan",
        type: "loanPayment",
        amount: 264,
        frequency: "monthly",
      },
      {
        name: "Electricity",
        type: "bill",
        amount: 216,
        dueOn: "15th of month",
        frequency: "monthly",
      },
      {
        name: "Natural Gas",
        type: "bill",
        amount: 81,
        dueOn: "7th of month",
        frequency: "monthly",
      },
      {
        name: "City Utilities",
        type: "bill",
        amount: 130,
        dueOn: "1st of month",
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
      {
        name: "Car Insurance",
        type: "bill",
        amount: 250,
        frequency: "semiannually",
        dueOn: "May / Nov",
      },
      {
        name: "Car Gas",
        type: "variableExpense",
        amount: 250,
        frequency: "monthly",
        dueOn: "",
      },
      {
        name: "Credit Card",
        type: "ccPayment",
        amount: 250,
        frequency: "monthly",
        dueOn: "",
      },
      {
        name: "Fast Food",
        type: "takeout",
        amount: 250,
        frequency: "monthly",
        dueOn: "",
      },
      {
        name: "Shopping",
        type: "shopping",
        amount: 200,
        frequency: "monthly",
        dueOn: "",
      },
    ],
  }

  //  const res = await fetch(`${API_BASE}/budget`, {
  //    credentials: "include",
  //  })

  // if (!res.ok) throw new Error("Failed to fetch budget")
  // return res.json()

  budget.items = sortItemsByTypeOrder(budget.items)

  await new Promise((r) => setTimeout(r, 1000))

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
