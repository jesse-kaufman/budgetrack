<template>
  <div
    class="flex flex-row flex-wrap mt-8 mb-4 align-items-start sm:flex-nowrap leading-4.5"
  >
    <div class="sm:w-fit w-full m-2">
      <div class="ml-1 font-bold">Per Paycheck</div>
      <div
        class="rounded-xl divide-solid divide-gray-800/80 grow border-gray-800/50 flex flex-wrap overflow-hidden border border-collapse divide-x divide-y shadow-sm"
      >
        <BudgetHeaderItem
          name="Income"
          class="bg-lime-300/50"
          :loading="budgetStore.loading"
          :value="budgetStore.totalPayPeriodIncome"
        />
        <BudgetHeaderItem
          name="Expenses"
          class="bg-purple-300/50"
          :loading="budgetStore.loading"
          :value="budgetStore.totalPayPeriodExpenses"
        />
        <BudgetHeaderItem
          name="Difference"
          class="bg-blue-300/50 font-bold"
          :loading="budgetStore.loading"
          :value="budgetStore.totalPayPeriodDifference"
        />
      </div>
    </div>

    <div class="sm:w-fit w-full m-2">
      <div class="ml-1 font-bold">Monthly</div>
      <div
        class="rounded-xl divide-solid divide-gray-800/80 grow border-gray-800/50 flex flex-wrap overflow-hidden border border-collapse divide-x divide-y shadow-sm"
      >
        <BudgetHeaderItem
          name="Income"
          class="bg-lime-300/50"
          :loading="budgetStore.loading"
          :value="budgetStore.totalMonthlyIncome"
        />
        <BudgetHeaderItem
          name="Expenses"
          class="bg-purple-300/50"
          :loading="budgetStore.loading"
          :value="budgetStore.totalMonthlyExpenses"
        />
        <BudgetHeaderItem
          name="Difference"
          class="bg-blue-300/50 font-bold"
          :loading="budgetStore.loading"
          :value="budgetStore.totalMonthlyDifference"
        />
      </div>
    </div>

    <div class="sm:w-fit w-full m-2">
      <div class="ml-1 font-bold">&nbsp;</div>
      <div
        class="rounded-xl divide-solid divide-gray-800/80 grow border-gray-800/50 flex flex-wrap overflow-hidden border border-collapse divide-x divide-y shadow-sm"
      >
        <BudgetHeaderItem
          name="Needs"
          class="bg-amber-300/50"
          :loading="budgetStore.loading"
          :value="budgetStore.needs"
        />
        <BudgetHeaderItem
          name="Wants"
          class="bg-red-300/50"
          :loading="budgetStore.loading"
          :value="budgetStore.wants"
        />
        <BudgetHeaderItem
          name="Future"
          class="bg-green-300/50"
          :loading="budgetStore.loading"
          :value="budgetStore.future"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import BudgetHeaderItem from "./BudgetHeaderItem.vue"
import { useBudgetStore } from "@/stores/budgetStore"

const budgetStore = useBudgetStore()
</script>
