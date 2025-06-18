<template>
  <div>
    <BudgetHeader :budget="budget" />
    <BudgetTable :items="budget.items" />
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
  items: [
    {
      name: "Paycheck",
      type: "income",
      dueOn: "",
      frequency: "payPeriod",
    },
    {
      name: "Paycheck 2",
      type: "income",
      amount: 150,
      dueOn: "1st of month",
      frequency: "biannually",
    },
  ],
}
</script>
