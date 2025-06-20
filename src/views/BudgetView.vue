<template>
  <div>
    <BudgetHeader :budget="budget" />
    <BudgetTable :items="budget.items" />
  </div>
</template>

<script setup>
import BudgetHeader from "@/components/Budget/BudgetHeader.vue"
import BudgetTable from "@/components/Budget/BudgetTable.vue"

const budget = {
  monthlyIncome: 1234,
  monthlyExpenses: 123,
  needs: 123,
  wants: 123,
  future: 123,
  items: [
    {
      name: "Paycheck",
      type: "income",
      amount: 150,
      dueOn: "1st of month",
      frequency: "biannually",
    },
    {
      name: "Electricity",
      type: "bill",
      amount: 190,
      dueOn: "15th of month",
      frequency: "monthly",
    },
  ],
}
</script>
