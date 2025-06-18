<template>
  <transition name="fade-slide">
    <HeaderNotice
      v-if="hasUnsavedChanges && formError === null"
      type="saveNotice"
      message="Click the Save button to save your changes."
    />
  </transition>

  <transition name="fade-slide">
    <HeaderNotice
      v-if="formError !== null"
      type="error"
      :message="`Form has errors: ${formError}`"
    />
  </transition>

  <div
    class="overflow-hidden flex flex-wrap mt-8 mb-8 leading-4.5 mx-2 border rounded-lg shadow-sm border-gray-400/50 max-w-fit divide-gray-300 divide-solid divide-y divide-x border-collapse"
  >
    <LoanHeaderItem name="ID" :value="loan.id" :loading="loading" />
    <LoanHeaderItem name="Lot" :value="loan.lot" :loading="loading" />
    <LoanHeaderItem name="Block" :value="loan.block" :loading="loading" />
    <LoanHeaderItem name="Addition" :value="loan.addition" :loading="loading" />
    <LoanHeaderItem name="City" :value="loan.city" :loading="loading" />
    <LoanHeaderItem name="State" :value="loan.state" :loading="loading" />
    <LoanHeaderItem name="Zip" :value="loan.zip" :loading="loading" />
    <LoanHeaderItem
      class="bg-blue-200/50"
      name="Projected Cost"
      :value="loan.projectedCost ? formatCurrency(loan.projectedCost) : ''"
      :loading="loading"
    />
    <LoanHeaderItem
      class="bg-lime-200/50"
      name="Actual Cost"
      :value="loan.actualCost ? formatCurrency(loan.actualCost) : ''"
      :loading="loading"
    />
    <LoanHeaderItem
      class="bg-fuchsia-200/50"
      name="Drawn"
      :value="loan.drawnAmount ? formatCurrency(loan.drawnAmount) : ''"
      :loading="loading"
    />
  </div>
</template>

<script setup>
import LoanHeaderItem from "./LoanHeaderItem.vue"
import HeaderNotice from "./LoanHeaderNotice.vue"
import { formatCurrency } from "@/utils/currencyUtils.js"

const { formError } = defineProps({
  loan: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  hasUnsavedChanges: {
    type: Boolean,
    default: false,
  },
  formHasErrors: {
    type: Boolean,
    default: false,
  },
  formError: {
    type: String,
    default: "",
  },
})
console.debug("THE FORM ERROR: ", formError)
</script>

<style scoped>
.fade-slide-enter-active {
  transition:
    opacity 0.3s ease,
    transform 0.1s ease;
}
.fade-slide-leave-active {
  transition:
    opacity 0.75s ease,
    transform 1.5s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-2em);
}
</style>
