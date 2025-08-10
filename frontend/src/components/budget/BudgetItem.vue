<template>
  <template
    v-if="previousType && previousType !== item.type && !budgetStore.loading"
  >
    <tr class="text-[0.7em] uppercase font-semibold text-left bg-gray-800/50">
      <td
        :colspan="columnCount"
        class="px-2 py-0.5 space-x-2 border-x-1 border-gray-100/10"
      >
        <span>{{ itemTypes.getIcon(item.type) }}</span>
        <span class="text-white/50">
          {{ itemTypes.getName(item.type) }}
        </span>
      </td>
    </tr>
  </template>
  <tr :class="[item.type, category]" @click="toggleEdit">
    <th scope="row" class="pl-2 text-left">
      <template v-if="budgetStore.loading">
        <div class="sm:mr-15 skeleton w-40"></div>
      </template>
      <template v-else>
        <div
          class="flex relative flex-row items-center ml-1 space-x-2.5 leading-tight"
        >
          <div class="flex items-center gap-2">
            <div class="category-indicator"></div>
            <TextField
              :model-value="item.name"
              @update:model-value="(val) => updateField('name', val)"
            />
            <template v-if="!item.scheduled && item.type !== 'income'">
              <div class="unscheduled-badge"></div>
            </template>
          </div>
          <div class="flex items-center gap-2 ml-auto">
            <div class="frequency-badge">
              {{ frequencyAbbrMap[item.frequency] }}
            </div>
          </div>
        </div>
      </template>
    </th>
    <td class="whitespace-nowrap min-w-30 text-right">
      <template v-if="budgetStore.loading">
        <div class="skeleton"></div>
      </template>
      <template v-else>
        <CurrencyField
          :model-value="item.amount"
          :is-income="item.type === 'income'"
          @update:model-value="(val) => updateField('amount', val)"
        />
      </template>
    </td>
    <td v-if="showAccountColumn" class="whitespace-nowrap">
      <template v-if="budgetStore.loading">
        <div class="skeleton"></div>
      </template>
      <template v-else>{{ item.account }}</template>
    </td>
    <td class="whitespace-nowrap bg-fuchsia-300/20 min-w-30 text-right">
      <template v-if="budgetStore.loading">
        <div class="skeleton"></div>
      </template>
      <template v-else>
        <div class="flex flex-row items-center justify-between space-x-1">
          $
          <div class="flex flex-row space-x-1 font-semibold text-right">
            <div v-if="item.type === 'income'">+</div>
            <div>{{ formatCurrency(perPayPeriodAmount, true, false) }}</div>
          </div>
        </div>
      </template>
    </td>
    <td
      v-if="showMonthColumn"
      class="whitespace-nowrap bg-cyan-300/20 min-w-30 text-right"
    >
      <template v-if="budgetStore.loading">
        <div class="skeleton"></div>
      </template>
      <template v-else>
        <div class="flex flex-row items-center justify-between space-x-1">
          $
          <div class="flex flex-row space-x-1">
            <div v-if="item.type === 'income'">+</div>
            <div>{{ formatCurrency(monthlyAmount, true, false) }}</div>
          </div>
        </div>
      </template>
    </td>
  </tr>
  <!-- Edit budget item section start -->
  <tr v-if="item.type !== 'income'" :class="edit ? '' : 'hidden'">
    <td :colspan="columnCount" class="border-y-1">
      <div class="flex flex-row flex-wrap items-center space-x-5">
        <div v-if="item.type !== 'income'" class="budget-item-config">
          <strong>Frequency:</strong>
          <div>
            <Select
              :model-value="item.frequency"
              :options="validBudgetItemFrequencies"
              @update:model-value="(val) => updateField('frequency', val)"
            />
          </div>
        </div>
        <div class="budget-item-config">
          <strong>Type:</strong>
          <div>
            <Select
              :model-value="item.type"
              :options="validBudgetItemTypes"
              @update:model-value="(val) => updateField('type', val)"
            />
          </div>
        </div>
        <div v-if="item.type !== 'income'" class="budget-item-config">
          <strong>Due on:</strong>
          <div>
            <TextField
              :model-value="item.dueOn"
              class="max-w-35"
              @update:model-value="(val) => updateField('dueOn', val)"
            />
          </div>
        </div>
        <div v-if="item.type !== 'income'" class="budget-item-config items-end">
          <strong>Account:</strong>
          <div>
            <Select
              :model-value="item.account"
              :options="accounts"
              @update:model-value="(val) => updateField('account', val)"
            />
          </div>
        </div>
        <div v-if="item.type !== 'income'" class="budget-item-config items-end">
          <strong>Scheduled:</strong>
          <div>
            <BaseCheckbox
              :model-value="item.scheduled"
              class="max-w-35"
              @update:model-value="(val) => updateField('scheduled', val)"
            />
          </div>
        </div>
      </div>
    </td>
  </tr>
  <!-- Edit budget item end -->
</template>

<script setup>
import { computed, ref } from "vue"
import itemTypes from "#shared/budget/budgetItemTypes.js"
import Select from "#base/BaseSelect.vue"
import CurrencyField from "#ui/fields/CurrencyField.vue"
import TextField from "#ui/fields/TextField.vue"
import BaseCheckbox from "#base/BaseCheckbox.vue"
import {
  calculatePayPeriodAmount,
  formatCurrency,
} from "#utils/currencyUtils.js"
import {
  validBudgetItemFrequencies,
  validBudgetItemTypes,
  frequencyAbbrMap,
  accounts,
} from "#config/budgetConfig.js"
import { useBudgetStore } from "#stores/budgetStore.js"

// Define the emits for the component
const emit = defineEmits(["update:item", "error"])

// Define the props for the component
const { item, index, showAccountColumn, showMonthColumn } = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  previousType: {
    type: String,
    default: "",
  },
  showMonthColumn: {
    type: Boolean,
    required: true,
  },
  showAccountColumn: {
    type: Boolean,
    required: true,
  },
})

const budgetStore = useBudgetStore()

const edit = ref(false)

const columnCount = computed(() => {
  // eslint-disable-next-line no-magic-numbers
  let count = 3
  if (showAccountColumn) count++
  if (showMonthColumn) count++
  return count
})
const perPayPeriodAmount = computed(() =>
  calculatePayPeriodAmount(item.amount, item.frequency)
)
const monthlyAmount = computed(() => perPayPeriodAmount.value * 2)
const category = computed(() => itemTypes.getCategory(item.type))

// When the item item is updated, emit the update event with the new item object
const updateField = (field, value) =>
  emit("update:item", { index, data: { ...item, [field]: value } })

/**
 * Toggles edit mode for budget item.
 * @returns {void}
 */
const toggleEdit = () => (edit.value = !edit.value)
</script>
