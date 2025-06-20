<template>
  <tr :class="[item.type, category]">
    <th scope="row" class="text-left">
      <div class="flex flex-row items-baseline space-x-1 whitespace-nowrap">
        <div class="category-indicator"></div>
        <div @click="toggleEdit">{{ icon }}</div>
        <InputText
          :model-value="item.name"
          :loading="loading"
          @update:model-value="(val) => updateField('name', val)"
        />
      </div>
    </th>
    <td class="text-center border-r-dashed">
      <template v-if="!loading">
        {{ frequencyAbbrMap[item.frequency] }}
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right whitespace-nowrap min-w-30">
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
    <td class="text-right whitespace-nowrap bg-fuchsia-300/20 min-w-30">
      <template v-if="!loading">
        <div class="flex flex-row items-center justify-between space-x-1">
          <span>$</span>
          <div class="flex flex-row space-x-1 font-semibold text-right">
            <div v-if="item.type === 'income'">+</div>
            <div>
              {{ formatCurrency(perPayPeriodAmount, true, false) || "&nbsp;" }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
    <td class="text-right whitespace-nowrap bg-cyan-300/20 min-w-30">
      <template v-if="!loading">
        <div class="flex flex-row items-center justify-between space-x-1">
          <span>$</span>
          <div class="flex flex-row space-x-1">
            <div v-if="item.type === 'income'">+</div>
            <div>
              {{ formatCurrency(monthlyAmount, true, false) || "&nbsp;" }}
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="skeleton"></div>
      </template>
    </td>
  </tr>
  <!-- Edit budget item section start -->
  <tr :class="edit ? '' : 'hidden'">
    <td colspan="6" class="border-t-1">
      <div class="flex flex-row flex-wrap items-baseline space-x-5">
        <div class="budget-item-config">
          <div class="font-bold">Type:</div>
          <div>
            <Select
              :model-value="item.type"
              :options="validBudgetItemTypes"
              :loading="loading"
              @update:model-value="(val) => updateField('type', val)"
            />
          </div>
        </div>
        <div class="budget-item-config">
          <div class="font-bold">Frequency:</div>
          <div>
            <Select
              :model-value="item.frequency"
              :options="validBudgetItemFrequencies"
              :loading="loading"
              @update:model-value="(val) => updateField('frequency', val)"
            />
          </div>
        </div>
        <div class="budget-item-config">
          <div class="font-bold">Due on:</div>
          <div>
            <InputText
              :model-value="item.dueOn"
              class="max-w-35"
              :loading="loading"
              :always-show-input="true"
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
  frequencyAbbrMap,
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
