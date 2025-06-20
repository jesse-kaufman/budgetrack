<template>
  <div>
    <BudgetHeader :budget="budgetStore" />
    <BudgetTable :items="budgetStore.items" />
  </div>
</template>

<script setup>
import BudgetHeader from "@/components/Budget/BudgetHeader.vue"
import BudgetTable from "@/components/Budget/BudgetTable.vue"
import { useBudgetStore } from "@/stores/budgetStore"

const budgetStore = useBudgetStore()
</script>
