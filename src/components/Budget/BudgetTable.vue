<template>
  <Table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Type</th>
        <th scope="col">Frequency</th>
        <th scope="col">Due</th>
        <th scope="col">Amount</th>
        <th scope="col">Per Paycheck</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!loading">
        <BudgetTableRow
          v-for="item in budgetStore.items"
          :key="item.name"
          :item="item"
          @update:item="budgetStore.updateItem"
        />
      </template>
      <template v-else>
        <template v-for="n in 10" :key="n">
          <BudgetTableRow :item="{}" :loading="true" />
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
import BudgetTableRow from "./BudgetTableRow.vue"
import { useBudgetStore } from "@/stores/budgetStore"
import Table from "@/components/Base/BaseTable.vue"

const budgetStore = useBudgetStore()

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
