<template>
  <tr :class="item.type">
    <th scope="row" class="px-2 min-w-55">
      <Input
        v-if="!loading"
        :model-value="item.name"
        class="w-full"
        @update:model-value="(val) => updateField('name', val)"
      />
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </th>

    <td class="px-2 text-center min-w-30">
      <template v-if="!loading">
        <select id="countries" class="w-full text-sm">
          <option disabled>-- Select One --</option>
          <option>Income</option>
          <option>Bill</option>
          <option>Variable Expense</option>
          <option>Credit Card Payment</option>
          <option>Savings Transfer</option>
          <option>Investment Transfer</option>
        </select>
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right border-r-dashed min-w-30">
      <template v-if="!loading">
        <select id="countries" class="w-full text-sm">
          <option disabled>-- Select One --</option>
          <option value="payPeriod">Pay period</option>
          <option value="1m">Monthly</option>
          <option value="6m">6 Months</option>
          <option value="1y">Yearly</option>
        </select>
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right min-w-12">
      <Input
        v-if="!loading"
        :model-value="item.dueOn"
        class="w-full"
        @update:model-value="(val) => updateField('dueOn', val)"
      />
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="px-2 text-right whitespace-nowrap bg-fuchsia-300/30 min-w-30">
      <template v-if="!loading">
        <CurrencyInput
          :model-value="item.amount"
          type="number"
          class="text-right"
          min="0"
          :decimals="2"
          @update:model-value="(val) => updateField('amount', val)"
          @error="(msg) => emit('error', msg)"
        />
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="px-2 text-right whitespace-nowrap bg-fuchsia-300/30 min-w-30">
      <template v-if="!loading">
        <div
          class="flex flex-row items-center justify-between space-x-1 cursor-pointer h-7"
        >
          <span>$</span>
          <div class="font-semibold text-right">
            {{ formatCurrency(perPayPeriodAmount, true, false) || "&nbsp;" }}
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
import Input from "@/components/Base/BaseInput.vue"
import CurrencyInput from "@/components/Base/CurrencyInput.vue"
import { formatCurrency } from "@/utils/currencyUtils.js"

// Define the emits for the component
const emit = defineEmits(["update:item-item", "error"])

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
  emit("update:item-item", { ...item, [field]: value })
}
</script>
