<template>
  <div>
    <BudgetHeader />
    <BudgetTable />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import BudgetHeader from "@/components/Budget/BudgetHeader.vue"
import BudgetTable from "@/components/Budget/BudgetTable.vue"

import { useBudgetStore } from "@/stores/budgetStore"

const budgetStore = useBudgetStore()

onMounted(() => {
  budgetStore.load()
})
</script>
