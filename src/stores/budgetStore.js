/* eslint-disable max-lines-per-function */
/** @file Budget store. */
import { defineStore } from "pinia"
import { ref, watch, computed } from "vue"
import { calculatePayPeriodAmount } from "@/utils/currencyUtils"

/**
 * Budget store object.
 */
export const useBudgetStore = defineStore("budget", () => {
  /** Stores last updated date/time. */
  const lastUpdated = ref(null)

  /** Stores budget items. */
  const items = ref([])

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
      .filter((i) =>
        ["bill", "ccPayment", "loanPayment", "variableExpense"].contains(i.type)
      )
      .reduce(
        (sum, i) => sum + calculatePayPeriodAmount(i.amount, i.frequency),
        0
      )
  )

  // Setup watcher to auto-update lastUpdated value
  watch(
    items,
    () => {
      lastUpdated.value = new Date().toISOString()
    },
    { deep: true }
  )

  // ACTIONS

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

  return {
    lastUpdated,
    items,
    totalPayPeriodIncome,
    totalPayPeriodExpenses,
    addItem,
    updateItem,
    removeItem,
    clearItems,
  }
})
