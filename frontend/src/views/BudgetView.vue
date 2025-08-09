<template>
  <div>
    <BudgetHeader />

    <div class="inline-block cursor-pointer" @click="toggleSettings">
      <span class="inline-block pr-1.5 text-xl">⚙️</span>
    </div>
    <div
      v-if="showSettings"
      class="border-1 border-white/20 bg-white/5 rounded-xl p-4 mb-2"
    >
      <div>
        <BaseCheckbox
          id="show-month-column"
          :model-value="showMonthColumn"
          @update:model-value="toggleMonth"
        />
        <label class="inline-block pl-2" for="show-month-column">
          Show month column
        </label>
      </div>

      <div>
        <BaseCheckbox
          id="show-account-column"
          :model-value="showAccountColumn"
          @update:model-value="toggleAccount"
        />
        <label class="inline-block pl-2" for="show-account-column">
          Show account column
        </label>
      </div>
    </div>
    <BudgetTable
      :show-month-column="showMonthColumn"
      :show-account-column="showAccountColumn"
    />
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue"
import BudgetHeader from "#budget/BudgetHeader.vue"
import BudgetTable from "#budget/BudgetTable.vue"
import BaseCheckbox from "#base/BaseCheckbox.vue"
import { useBudgetStore } from "#stores/budgetStore.js"

const budgetStore = useBudgetStore()

const showMonthColumn = ref(false)
const showAccountColumn = ref(false)
const showSettings = ref(false)

const toggleMonth = (val) => (showMonthColumn.value = val)
const toggleAccount = (val) => (showAccountColumn.value = val)
const toggleSettings = () => (showSettings.value = !showSettings.value)

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
