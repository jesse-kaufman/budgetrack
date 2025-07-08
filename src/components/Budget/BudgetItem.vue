<template>
  <tr :class="[item.type, category]" @click="toggleEdit">
    <th scope="row" class="text-left">
      <template v-if="budgetStore.loading">
        <div class="w-40 skeleton"></div>
      </template>
      <template v-else>
      <div
          class="flex relative flex-row items-center space-x-2.5 leading-tight"
      >
        <div class="category-indicator"></div>
        <div>{{ icon }}</div>
        <TextField
          :model-value="item.name"
          @update:model-value="(val) => updateField('name', val)"
        />
        <div class="frequency-badge">
          {{ frequencyAbbrMap[item.frequency] }}
        </div>
      </div>
      </template>
    </th>
    <td class="text-right whitespace-nowrap bg-fuchsia-300/20 min-w-30">
      <template v-if="budgetStore.loading">
        <div class="skeleton"></div>
      </template>
      <template v-else>
        <div class="flex flex-row justify-between items-center space-x-1">
          $
          <div class="flex flex-row space-x-1 font-semibold text-right">
            <div v-if="item.type === 'income'">+</div>
            <div>{{ formatCurrency(perPayPeriodAmount, true, false) }}</div>
          </div>
        </div>
      </template>
</td>
    <td class="text-right whitespace-nowrap bg-cyan-300/20 min-w-30">
      <template v-if="budgetStore.loading">
        <div class="skeleton"></div>
      </template>
          <template v-else>
        <div class="flex flex-row justify-between items-center space-x-1">
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
  <tr :class="edit ? '' : 'hidden'">
    <td colspan="3" class="border-y-1">
      <div class="flex flex-row flex-wrap items-center space-x-5">
        <div class="budget-item-config">
          <strong>Amount:</strong>
          <CurrencyField
            :model-value="item.amount"
            :is-income="item.type === 'income'"
            @update:model-value="(val) => updateField('amount', val)"
          />
        </div>
        <div class="budget-item-config">
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
        <div class="budget-item-config">
          <strong>Due on:</strong>
          <div>
            <TextField
              :model-value="item.dueOn"
              class="max-w-35"
              @update:model-value="(val) => updateField('dueOn', val)"
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
import Select from "@/components/Base/BaseSelect.vue"
import CurrencyField from "@/components/Fields/CurrencyField.vue"
import TextField from "@/components/Fields/TextField.vue"
import {
  calculatePayPeriodAmount,
  formatCurrency,
} from "@/utils/currencyUtils.js"
import {
  validBudgetItemFrequencies,
  validBudgetItemTypes,
  categoryMap,
  frequencyAbbrMap,
  budgetItemTypeIconMap,
} from "@/config/budgetConfig"
import { useBudgetStore } from "@/stores/budgetStore"

// Define the emits for the component
const emit = defineEmits(["update:item", "error"])

// Define the props for the component
const { item, index } = defineProps({
  item: {
    type: Object,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
})

const budgetStore = useBudgetStore()

const edit = ref(false)

const perPayPeriodAmount = computed(() =>
  calculatePayPeriodAmount(item.amount, item.frequency)
)
const monthlyAmount = computed(() => perPayPeriodAmount.value * 2)
const category = computed(() => categoryMap[item.type])
const icon = computed(() => budgetItemTypeIconMap[item.type])

// When the item item is updated, emit the update event with the new item object
const updateField = (field, value) =>
  emit("update:item", { index, data: { ...item, [field]: value } })

const toggleEdit = () => (edit.value = !edit.value)
</script>
