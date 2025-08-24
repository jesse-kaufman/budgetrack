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
          :modelValue="showMonthColumn"
          @update:modelValue="toggleMonth"
        />
        <label class="inline-block pl-2" for="show-month-column">
          Show month column
        </label>
      </div>

      <div>
        <BaseCheckbox
          id="show-account-column"
          :modelValue="showAccountColumn"
          @update:modelValue="toggleAccount"
        />
        <label class="inline-block pl-2" for="show-account-column">
          Show account column
        </label>
      </div>
    </div>
    <BudgetTable
      :showMonthColumn="showMonthColumn"
      :showAccountColumn="showAccountColumn"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue"
import BaseCheckbox from "#base/BaseCheckbox.vue"
import { useBudgetStore } from "#stores/budgetStore.js"
import BudgetHeader from "#budget/BudgetHeader.vue"
import BudgetTable from "#budget/BudgetTable.vue"

const budgetStore = useBudgetStore()

const showMonthColumn = ref(false)
const showAccountColumn = ref(false)
const showSettings = ref(false)

/**
 *
 * @param val
 */
const toggleMonth = (val) => (showMonthColumn.value = val)
/**
 *
 * @param val
 */
const toggleAccount = (val) => (showAccountColumn.value = val)
/**
 *
 */
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
