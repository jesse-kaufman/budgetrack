/** @file Budget-related configuration values. */

/** Stores list of valid budget item types and their labels. */
export const validBudgetItemTypes = {
  income: "Income",
  loanPayment: "Loan Payment",
  ccPayment: "Credit Card Payment",
  bill: "Bill",
  variableExpense: "Variable Expense",
  shopping: "Shopping",
  takeout: "Fast Food",
  entertainment: "Entertainment",
  savingsTransfer: "Savings Transfer",
  investmentTransfer: "Investment Transfer",
}

/** Stores list of valid budget item frequencies. */
export const validBudgetItemFrequencies = {
  payPeriod: "Pay Period",
  monthly: "Monthly",
  semiannually: "6 Months",
  yearly: "Yearly",
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
  savingsTransfer: "future",
  investmentTransfer: "future",
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
  savingsTransfer: "💰",
  investmentTransfer: "📈",
}
