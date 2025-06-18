<template>
  <div
    class="flex flex-row flex-wrap align-items-start sm:flex-nowrap mt-8 mb-8 leading-4.5"
  >
    <div class="w-full m-2 sm:w-fit">
      <div class="ml-1 font-bold">Monthly</div>
      <div
        class="flex flex-wrap overflow-hidden border border-collapse divide-x divide-y shadow-sm rounded-xl divide-gray-800/80 grow border-gray-800/50 divide-solid"
      >
        <BudgetHeaderItem
          name="Income"
          class="bg-lime-300/50"
          :value="formatCurrency(budget.monthlyIncome)"
        />
        <BudgetHeaderItem
          name="Expenses"
          class="bg-purple-300/50 w-fit"
          :value="formatCurrency(budget.monthlyExpenses)"
        />
        <BudgetHeaderItem
          name="Difference"
          class="bg-blue-300/50 w-fit"
          :value="formatCurrency(budget.monthlyIncome - budget.monthlyExpenses)"
        />
      </div>
    </div>

    <div class="w-full m-2 sm:w-fit">
      <div class="ml-1 font-bold">Per Paycheck</div>
      <div
        class="flex flex-wrap overflow-hidden border border-collapse divide-x divide-y shadow-sm rounded-xl divide-gray-800/80 grow border-gray-800/50 divide-solid"
      >
        <BudgetHeaderItem
          name="Income"
          class="bg-lime-300/50"
          :value="formatCurrency(budget.monthlyIncome / 2)"
        />
        <BudgetHeaderItem
          name="Expenses"
          class="bg-purple-300/50"
          :value="formatCurrency(budget.monthlyExpenses / 2)"
        />
        <BudgetHeaderItem
          name="Difference"
          class="bg-blue-300/50"
          :value="
            formatCurrency((budget.monthlyIncome - budget.monthlyExpenses) / 2)
          "
        />
      </div>
    </div>

    <div class="w-full m-2 sm:w-fit">
      <div class="ml-1 font-bold">&nbsp;</div>
      <div
        class="flex flex-wrap overflow-hidden border border-collapse divide-x divide-y shadow-sm rounded-xl divide-gray-800/80 grow border-gray-800/50 divide-solid"
      >
        <BudgetHeaderItem
          name="Needs"
          class="bg-amber-300/50"
          :value="formatCurrency(budget.needs)"
        />
        <BudgetHeaderItem
          name="Wants"
          class="bg-red-300/50"
          :value="formatCurrency(budget.wants)"
        />
        <BudgetHeaderItem
          name="Future"
          class="bg-green-300/50"
          :value="formatCurrency(budget.future)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BudgetHeaderItem from "./BudgetHeaderItem.vue"
import { formatCurrency } from "@/utils/currencyUtils.js"

defineProps({
  budget: {
    type: Object,
    required: true,
  },
})
</script>
