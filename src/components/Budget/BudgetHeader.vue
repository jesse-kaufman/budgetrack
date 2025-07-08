<template>
  <div
    class="flex flex-row flex-wrap mt-8 mb-8 align-items-start sm:flex-nowrap leading-4.5"
  >
    <div class="m-2 w-full sm:w-fit">
      <div class="ml-1 font-bold">Per Paycheck</div>
      <div
        class="flex overflow-hidden flex-wrap rounded-xl border divide-x divide-y divide-solid shadow-sm border-collapse divide-gray-800/80 grow border-gray-800/50"
      >
        <BudgetHeaderItem
          name="Income"
          :loading="budgetStore.loading"
          class="bg-lime-300/50"
          :value="formatCurrency(budgetStore.totalPayPeriodIncome)"
        />
        <BudgetHeaderItem
          name="Expenses"
          :loading="budgetStore.loading"
          class="bg-purple-300/50"
          :value="formatCurrency(budgetStore.totalPayPeriodExpenses)"
        />
        <BudgetHeaderItem
          name="Difference"
          :loading="budgetStore.loading"
          class="bg-blue-300/50"
          :value="formatCurrency(budgetStore.totalPayPeriodDifference)"
        />
      </div>
    </div>

    <div class="m-2 w-full sm:w-fit">
      <div class="ml-1 font-bold">Monthly</div>
      <div
        class="flex overflow-hidden flex-wrap rounded-xl border divide-x divide-y divide-solid shadow-sm border-collapse divide-gray-800/80 grow border-gray-800/50"
      >
        <BudgetHeaderItem
          name="Income"
          :loading="budgetStore.loading"
          class="bg-lime-300/50"
          :value="formatCurrency(budgetStore.totalMonthlyIncome)"
        />
        <BudgetHeaderItem
          name="Expenses"
          :loading="budgetStore.loading"
          class="bg-purple-300/50 w-fit"
          :value="formatCurrency(budgetStore.totalMonthlyExpenses)"
        />
        <BudgetHeaderItem
          name="Difference"
          :loading="budgetStore.loading"
          class="bg-blue-300/50 w-fit"
          :value="formatCurrency(budgetStore.totalMonthlyDifference)"
        />
      </div>
    </div>

    <div class="m-2 w-full sm:w-fit">
      <div class="ml-1 font-bold">&nbsp;</div>
      <div
        class="flex overflow-hidden flex-wrap rounded-xl border divide-x divide-y divide-solid shadow-sm border-collapse divide-gray-800/80 grow border-gray-800/50"
      >
        <BudgetHeaderItem
          name="Needs"
          :loading="budgetStore.loading"
          class="bg-amber-300/50"
          :value="formatCurrency(budgetStore.needs)"
        />
        <BudgetHeaderItem
          name="Wants"
          :loading="budgetStore.loading"
          class="bg-red-300/50"
          :value="formatCurrency(budgetStore.wants)"
        />
        <BudgetHeaderItem
          name="Future"
          :loading="budgetStore.loading"
          class="bg-green-300/50"
          :value="formatCurrency(budgetStore.future)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BudgetHeaderItem from "./BudgetHeaderItem.vue"
import { formatCurrency } from "@/utils/currencyUtils.js"
import { useBudgetStore } from "@/stores/budgetStore"

const budgetStore = useBudgetStore()
</script>
