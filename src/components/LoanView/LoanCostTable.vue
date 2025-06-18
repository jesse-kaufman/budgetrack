<template>
  <Table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col" colspan="2" class="bg-blue-200">Projected</th>
        <th scope="col" colspan="2" class="bg-lime-200">Actual</th>
        <th scope="col">Variation</th>
        <th scope="col">Inspected</th>
        <th scope="col">Draw Req.</th>
        <th scope="col" class="bg-fuchsia-200">Drawn</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!loading">
        <CostTableRow
          v-for="cost in costs"
          :key="cost.id"
          :cost="cost"
          :total-projected-cost="totalProjectedCost"
          :total-actual-cost="totalActualCost"
          @update:cost-item="(val) => emit('update:cost-item', val)"
          @error="
            (msg) => {
              console.debug('EMIT from LoanCostTable')
              emit('error', msg)
            }
          "
        />
      </template>
      <template v-else>
        <template v-for="n in 10" :key="n">
          <CostTableRow :cost="{}" :loading="loading" />
        </template>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="9"></td>
      </tr>
    </tfoot>
  </Table>
</template>

<script setup>
import Table from "@/components/Base/Table/BaseTable.vue"
import CostTableRow from "@/components/LoanView/LoanCostTableRow.vue"

const emit = defineEmits(["update:cost-item", "error"])

const { costs } = defineProps({
  costs: {
    type: Array,
    default: () => [],
  },
  totalProjectedCost: {
    type: [Number, null],
    required: true,
  },
  totalActualCost: {
    type: [Number, null],
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
