<template>
  <tr :class="[item.type, category]">
    <th scope="row" class="px-2 text-left min-w-55">
      <div class="flex flex-row space-x-1">
        <div class="category-indicator"></div>
        <div>{{ icon }}</div>
        <InputText
          :model-value="item.name"
          :loading="loading"
          @update:model-value="(val) => updateField('name', val)"
        />
      </div>
    </th>

    <td class="px-2 text-center min-w-30">
      <Select
        :model-value="item.type"
        :options="validBudgetItemTypes"
        :loading="loading"
        @update:model-value="(val) => updateField('type', val)"
      />
    </td>
    <td class="border-r-dashed min-w-30">
      <Select
        :model-value="item.frequency"
        :options="validBudgetItemFrequencies"
        :loading="loading"
        @update:model-value="(val) => updateField('frequency', val)"
      />
    </td>
    <td class="min-w-12">
      <InputText
        :model-value="item.dueOn"
        class="max-w-35"
        :loading="loading"
        @update:model-value="(val) => updateField('dueOn', val)"
      />
    </td>
    <td class="px-2 text-right whitespace-nowrap min-w-30">
      <InputCurrency
        :model-value="item.amount"
        :loading="loading"
        :is-income="item.type === 'income'"
        type="number"
        class="text-right"
        min="0"
        :decimals="2"
        @update:model-value="(val) => updateField('amount', val)"
        @error="(msg) => emit('error', msg)"
      />
    </td>
    <td class="px-2 text-right whitespace-nowrap bg-fuchsia-300/20 min-w-30">
      <template v-if="!loading">
        <div class="flex flex-row items-center justify-between space-x-1">
          <span>$</span>
          <div v-if="item.type === 'income'">+</div>
          <div class="font-semibold text-right">
            {{ formatCurrency(perPayPeriodAmount, true, false) || "&nbsp;" }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="px-2 text-right whitespace-nowrap bg-cyan-300/20 min-w-30">
      <template v-if="!loading">
        <div class="flex flex-row items-center justify-between space-x-1">
          <span>$</span>
          <div v-if="item.type === 'income'">+</div>
          <div class="font-semibold text-right">
            {{ formatCurrency(monthlyAmount, true, false) || "&nbsp;" }}
          </div>
        </div>
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue"
import Select from "@/components/Base/BaseSelect.vue"
import Input from "@/components/Base/BaseInput.vue"
import InputCurrency from "@/components/Input/InputCurrency.vue"
import InputText from "@/components/Input/InputText.vue"
import {
  calculatePayPeriodAmount,
  formatCurrency,
} from "@/utils/currencyUtils.js"
import {
  validBudgetItemFrequencies,
  validBudgetItemTypes,
  categoryMap,
  budgetItemTypeIconMap,
} from "@/config/budgetConfig"

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
  loading: {
    type: Boolean,
    default: false,
  },
})

const perPayPeriodAmount = computed(() =>
  calculatePayPeriodAmount(item.amount, item.frequency)
)

const monthlyAmount = computed(() => perPayPeriodAmount.value * 2)

const category = computed(() => categoryMap[item.type])

const icon = computed(() => budgetItemTypeIconMap[item.type])

// When the item item is updated, emit the update event with the new item object
const updateField = (field, value) =>
  emit("update:item", { index, data: { ...item, [field]: value } })
</script>
