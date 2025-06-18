<template>
  <tr :class="rowClass">
    <th scope="row" class="px-2 min-w-55">
      <Input
        v-if="!loading"
        :model-value="cost.name"
        class="w-full"
        @update:model-value="(val) => updateField('name', val)"
      />
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </th>
    <td class="text-right min-w-30 border-r-dashed bg-blue-100/50">
      <template v-if="!loading">
        <CurrencyInput
          :model-value="cost.projectedCost"
          type="number"
          class="text-right"
          min="0"
          :decimals="2"
          @update:model-value="(val) => updateField('projectedCost', val)"
          @error="(msg) => emit('error', msg)"
        />
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right bg-blue-100/50 min-w-12">
      <template v-if="!loading">
        {{ calculatePercent(cost.projectedCost, totalProjectedCost) }}
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right border-r-dashed bg-lime-200/50 min-w-30">
      <template v-if="!loading">
        <CurrencyInput
          :model-value="cost.actualCost"
          type="number"
          class="text-right"
          min="0"
          :decimals="2"
          @update:model-value="(val) => updateField('actualCost', val)"
          @error="(msg) => emit('error', msg)"
        />
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right bg-lime-200/50 min-w-12">
      <template v-if="!loading">
        {{ calculatePercent(cost.actualCost, totalActualCost) }}
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right min-w-25">
      <template v-if="!loading">{{ variation }}</template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-center min-w-30">
      <template v-if="!loading">
        <Input
          type="date"
          :model-value="cost.inspectedOn ? cost.inspectedOn.split('T')[0] : ''"
          @update:model-value="(val) => updateField('inspectedOn', val)"
        />
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="px-2 text-center min-w-30">
      <template v-if="!loading">
        <Input
          type="date"
          :model-value="
            cost.drawRequestedOn ? cost.drawRequestedOn.split('T')[0] : ''
          "
          @update:model-value="(val) => updateField('inspectedOn', val)"
        />
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="px-2 text-right whitespace-nowrap bg-fuchsia-200/30 min-w-30">
      <template v-if="!loading">
        <CurrencyInput
          :model-value="cost.drawnAmount"
          type="number"
          class="text-right"
          min="0"
          :decimals="2"
          @update:model-value="(val) => updateField('drawnAmount', val)"
          @error="(msg) => emit('error', msg)"
        />
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
import { calculatePercent } from "@/utils/numberUtils.js"

// Define the emits for the component
const emit = defineEmits(["update:cost-item", "error"])

// Define the props for the component
const { cost, totalProjectedCost, totalActualCost } = defineProps({
  cost: {
    type: Object,
    required: true,
  },
  totalProjectedCost: {
    type: [Number, null],
    default: null,
  },
  totalActualCost: {
    type: [Number, null],
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

// Computed property to hold the difference between actual and projected costs
const variation = computed(() => {
  const actualCost = parseFloat(cost.actualCost)
  const projectedCost = parseFloat(cost.projectedCost)

  // Return "N/A" if projected or actual cost is not a number
  if (isNaN(projectedCost) || isNaN(actualCost)) {
    return ""
  }

  const difference = actualCost - projectedCost

  if (difference === 0) return "--"

  // Calculate the variation as the difference between actual and projected costs and format as currency
  return formatCurrency(difference)
})

// Computed property to determine if row is complete
const rowClass = computed(() =>
  cost?.drawnAmount && cost.drawnAmount >= cost.actualCost ? "complete" : ""
)

// When the cost item is updated, emit the update event with the new cost object
function updateField(field, value) {
  emit("update:cost-item", { ...cost, [field]: value })
}
</script>
