<template>
  <div>
    <BudgetHeader />
    <BudgetTable />
  </div>
</template>

<script setup>
import { onMounted, watch } from "vue"
import BudgetHeader from "@/components/budget/BudgetHeader.vue"
import BudgetTable from "@/components/budget/BudgetTable.vue"

import { useBudgetStore } from "@/stores/budgetStore"

const budgetStore = useBudgetStore()

onMounted(async () => {
  await budgetStore.load()

  watch(
    () => budgetStore.items,
    async () => {
      console.log("budget items changed")
      if (budgetStore.formIsDirty && budgetStore.formIsValid) {
        await budgetStore.save()
        console.log("saved")
      } else {
        console.log("not saving")
      }
    },
    { deep: true }
  )
})
</script>
