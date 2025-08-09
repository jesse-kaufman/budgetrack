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

/** Stores mock list of accounts. */
export const accounts = [
  "Safety Net ••9865",
  "Mortgage ••8295",
  "Debt Buster ••9632",
  "Electricity ••9803",
  "Citi ••9811",
  "American Express ••7679",
  "Car Insurance ••9803",
  "Car Tags ••1837",
  "Student Loan ••9224",
  "Christmas ••2497",
  "Capital One ••3163",
  "Alliant ••0822",
  "Annual Fees ••2791",
  "BOA ••6766",
  "Gas ••7038",
  "DNS/AWS ••0526",
  "Phone ••0682",
  "Apple ••8933",
  "Co-pays / meds ••1651",
  "Internet ••0254",
  "City bill ••1690",
  "Backup ••2077",
]
