<template>
  <div>
    <BudgetHeader />
    <div class="settings">
      <BaseCheckbox
        id="show-month-column"
        :model-value="showMonthColumn"
        @update:model-value="toggleMonth"
      />
      <label class="inline-block pl-2" for="show-month-column">
        Show month column
      </label>
    </div>
    <BudgetTable :show-month-column="showMonthColumn" />
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue"
import BudgetHeader from "@/components/budget/BudgetHeader.vue"
import BudgetTable from "@/components/budget/BudgetTable.vue"
import BaseCheckbox from "@/components/base/BaseCheckbox.vue"

import { useBudgetStore } from "@/stores/budgetStore"

const budgetStore = useBudgetStore()

const showMonthColumn = ref(false)

const toggleMonth = (val) => (showMonthColumn.value = val)

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
