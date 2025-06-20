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
        :model-value="item.type"
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
    <td class="px-2 text-right whitespace-nowrap bg-fuchsia-300/30 min-w-30">
      <InputCurrency
        :model-value="item.amount"
        :loading="loading"
        type="number"
        class="text-right"
        min="0"
        :decimals="2"
        @update:model-value="(val) => updateField('amount', val)"
        @error="(msg) => emit('error', msg)"
      />
    </td>
    <td class="px-2 text-right whitespace-nowrap bg-fuchsia-300/30 min-w-30">
      <template v-if="!loading">
        <div class="flex flex-row items-center justify-between space-x-1">
          <span>$</span>
          <div class="font-semibold text-right">
            {{
              formatCurrency(
                calculatePayPeriodAmount(item.amount, item.frequency),
                true,
                false
              ) || "&nbsp;"
            }}
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
} from "@/config/budgetConfig"

// Define the emits for the component
const emit = defineEmits(["update:item", "error"])

// Define the props for the component
const { item } = defineProps({
  item: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// When the item item is updated, emit the update event with the new item object
function updateField(field, value) {
  emit("update:item", { ...item, [field]: value })
}
</script>
