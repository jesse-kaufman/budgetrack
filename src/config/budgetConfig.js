/** @file Budget-related configuration values. */

/** Stores list of valid budget item types and their labels. */
export const validBudgetItemTypes = {
  income: "Income",
  loanPayment: "Loan Payments",
  ccPayment: "Credit Card Payments",
  bill: "Bills",
  variableExpense: "Variable Expenses",
  shopping: "Shopping",
  entertainment: "Entertainment",
  savings: "Savings",
  investments: "Investments",
}

/** Stores list of valid budget item frequencies. */
export const validBudgetItemFrequencies = {
  payPeriod: "Pay Period",
  monthly: "Monthly",
  semiannually: "6 Months",
  yearly: "Yearly",
}

/** Stores list of valid budget item frequencies. */
export const frequencyAbbrMap = {
  payPeriod: "2W",
  monthly: "M",
  semiannually: "6M",
  yearly: "Y",
}

/** Stores the mapping of budget item types to categories. */
export const categoryMap = {
  bill: "needs",
  ccPayment: "needs",
  loanPayment: "needs",
  variableExpense: "needs",
  shopping: "wants",
  takeout: "wants",
  entertainment: "wants",
  savings: "future",
  investments: "future",
  income: null,
}

/** Stores mapping of budget item types to icons. */
export const budgetItemTypeIconMap = {
  income: "💵",
  bill: "🧾",
  ccPayment: "💳",
  loanPayment: "🏛️",
  variableExpense: "🚗",
  shopping: "🛍️",
  takeout: "🍟",
  entertainment: "🍿",
  savings: "💰",
  investments: "📈",
}
