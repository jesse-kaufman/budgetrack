<template>
  <div>
    <BudgetHeader :budget="budget" />
    <BudgetTable :costs="budget.items" />
  </div>
</template>

<script setup>
import BudgetHeader from "@/components/BudgetView/BudgetHeader.vue"
import BudgetTable from "@/components/BudgetView/BudgetTable.vue"

const budget = {
  monthlyIncome: 1234,
  monthlyExpenses: 123,
  needs: 123,
  wants: 123,
  future: 123,
  items: [{}, {}],
}
</script>
