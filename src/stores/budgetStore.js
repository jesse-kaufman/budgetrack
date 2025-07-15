/* eslint-disable max-lines-per-function */
/** @file Budget store. */
import { defineStore } from "pinia"
import { ref, watch, computed } from "vue"
import equal from "fast-deep-equal"
import { calculatePayPeriodAmount } from "@/utils/currencyUtils"
import { getBudget } from "@/services/budgetService"
import { getBudgetCategoryTotal } from "@/utils/budgetUtils"

/**
 * Budget store object.
 */
// eslint-disable-next-line max-statements
export const useBudgetStore = defineStore("budget", () => {
  /** Stores last updated date/time. */
  const lastUpdated = ref(null)
  /** Stores budget items. */
  const items = ref([])
  /** Stores original budget items before edits; used to check if form is dirty. */
  const originalItems = ref([])
  /** Holds any form error messages or null for none. */
  const formErrorMsg = ref(null)
  /** Holds the loading state. */
  const loading = ref(true)

  /** Whether the current project has unsaved changes. */
  const formIsDirty = computed(
    () => !equal(JSON.parse(JSON.stringify(items)), originalItems.value)
  )
  /** Whether the current project form is valid. */
  const formIsValid = computed(() => !formErrorMsg.value)

  /** Stores total income per pay period. */
  const totalPayPeriodIncome = computed(() =>
    items.value
      .filter((i) => i.type === "income")
      .reduce(
        (sum, i) => sum + calculatePayPeriodAmount(i.amount, i.frequency),
        0
      )
  )
  /** Stores total expenses per pay period. */
  const totalPayPeriodExpenses = computed(() =>
    items.value
      .filter((i) => i.type !== "income")
      .reduce(
        (sum, i) => sum + calculatePayPeriodAmount(i.amount, i.frequency),
        0
      )
  )

  /** Stores estimated total income per month. */
  const totalMonthlyIncome = computed(() => totalPayPeriodIncome.value * 2)
  /** Stores estimated monthly expenses. */
  const totalMonthlyExpenses = computed(() => totalPayPeriodExpenses.value * 2)
  /** Stores total difference in income vs expenses per pay period. */
  const totalPayPeriodDifference = computed(
    () => totalPayPeriodIncome.value - totalPayPeriodExpenses.value
  )
  /** Stores estimated monthly difference between income and expenses. */
  const totalMonthlyDifference = computed(
    () => totalPayPeriodDifference.value * 2
  )

  /** Stores total expenses categorized as "needs" (e.g.: bills, variable expenses). */
  const needs = computed(() => getBudgetCategoryTotal(items.value, "needs"))
  /** Stores total expenses categorized as "wants" (e.g.: shopping). */
  const wants = computed(() => getBudgetCategoryTotal(items.value, "wants"))
  /** Stores total expenses categorized as "future" (e.g.: transfers to savings/investments). */
  const future = computed(() => getBudgetCategoryTotal(items.value, "future"))

  // Setup watcher to auto-update lastUpdated value
  watch(
    items,
    () => {
      lastUpdated.value = new Date().toISOString()
    },
    { deep: true }
  )

  // ACTIONS

  const load = async () => {
    loading.value = true
    const data = await getBudget()
    items.value = data.items || []
    lastUpdated.value = data.lastUpdated || null
    loading.value = false
  }

  /**
   * Adds item to budget store.
   * @param {object} item - Item to add to the budget.
   * @returns {void}
   */
  const addItem = (item) => items.value.push(item)

  /**
   * Updates budget item in store.
   * @param {number} index - Index of budget item to update.
   * @param {object} updated - Updated values for budget item.
   */
  const updateItem = (index, updated) => {
    if (items.value[index]) {
      items.value[index] = { ...items.value[index], ...updated }
    }
  }

  /**
   * Removes item from budget store.
   * @param {number} index - Index of item to remove from budget.
   */
  const removeItem = (index) => {
    if (index >= 0 && index < items.value.length) {
      items.value.splice(index, 1)
    }
  }

  /**
   * Clears all items from budget store.
   * @returns {void}
   */
  const clearItems = () => (items.value = [])

  const setErrorMsg = (msg) => (formErrorMsg.value = msg)

  return {
    lastUpdated,
    items,
    originalItems,
    loading,
    formErrorMsg,
    formIsDirty,
    formIsValid,
    totalPayPeriodIncome,
    totalPayPeriodExpenses,
    totalPayPeriodDifference,
    totalMonthlyIncome,
    totalMonthlyExpenses,
    totalMonthlyDifference,
    needs,
    wants,
    future,
    load,
    addItem,
    updateItem,
    removeItem,
    clearItems,
    setErrorMsg,
  }
})
