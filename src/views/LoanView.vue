<template>
  <div>
    <router-link :to="`../`" class="button">
      <span class="inline-block rotate-180">➞</span>
    </router-link>

    <LoanHeader
      :loan="loan"
      :loading="loading"
      :has-unsaved-changes="hasUnsavedChanges"
      :form-has-errors="formHasError"
      :form-error="formError"
    />

    <LoanCostTable
      :costs="loan.costs"
      :total-projected-cost="loan.projectedCost || null"
      :total-actual-cost="loan.actualCost || null"
      :loading="loading"
      @update:cost-item="updateCostItem"
      @error="(msg) => (formError = msg)"
    />
  </div>
</template>

<script setup>
import equal from "fast-deep-equal"
import { useRoute } from "vue-router"
import { computed, reactive, ref, onMounted, toRaw } from "vue"
import LoanHeader from "@/components/LoanView/LoanHeader.vue"
import LoanCostTable from "@/components/LoanView/LoanCostTable.vue"
import { getLoan } from "@/services/loanService.js"

const route = useRoute()

// Ref to manage loading state
const loading = ref(true)
// Reactive object to hold loan data
const loan = reactive({})
// Reactive object to hold form error(s)
const formError = ref(null)

// Computed prop to store current loan ID (from URL)
const loanId = computed(() => route.params.id)

// Plain object to hold the original loan data for comparison
let originalLoan = {}

// Computed prop telling whether form has an error based on formError
const formHasError = computed(() => formError.value !== null)
// Calculate if there are any unsaved changes
const hasUnsavedChanges = computed(
  () => !equal(JSON.parse(JSON.stringify(loan)), originalLoan)
)

// Fetch the loan data when the component is mounted
onMounted(async () => {
  // Default loading state to true
  loading.value = true

  const data = await getLoan(loanId.value)
  Object.assign(loan, data)

  // Recalculate totals and assign them to loan
  const totals = recalculateTotals(loan.costs)
  loan.projectedCost = totals.totalProjectedCost
  loan.actualCost = totals.totalActualCost
  loan.drawnAmount = totals.totalDrawnAmount

  // Store clean loan object for later comparison
  originalLoan = structuredClone(toRaw(loan))

  // Set loading state to false
  loading.value = false
})

// Function to update a cost item in the loan
function updateCostItem(updatedCost) {
  // Find the index of the cost item to update
  const index = loan.costs.findIndex((c) => c.id === updatedCost.id)

  // Update the cost item if it exists
  if (index !== -1) loan.costs[index] = updatedCost

  // Now re-calculate the loan's totals and assign them to loan
  const totals = recalculateTotals(loan.costs)
  loan.projectedCost = totals.totalProjectedCost
  loan.actualCost = totals.totalActualCost
  loan.drawnAmount = totals.totalDrawnAmount

  console.log("updated loan:", loan)
}

function recalculateTotals(costs) {
  let totalProjectedCost = 0
  let totalActualCost = 0
  let totalDrawnAmount = 0

  for (const cost of costs) {
    totalProjectedCost += parseFloat(cost?.projectedCost) || 0
    totalActualCost += parseFloat(cost?.actualCost) || 0
    totalDrawnAmount += parseFloat(cost?.drawnAmount) || 0
  }

  return { totalProjectedCost, totalActualCost, totalDrawnAmount }
}
</script>
