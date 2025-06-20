/** @file Budget-related configuration values. */

/** Stores list of valid budget item types and their labels. */
export const validBudgetItemTypes = {
  income: "Income",
  bill: "Bill",
  ccPayment: "Credit Card Payment",
  loanPayment: "Loan Payment",
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
  "1m": "Monthly",
  "6m": "6 Months",
  "1y": "Yearly",
}
