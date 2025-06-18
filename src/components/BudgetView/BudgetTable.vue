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
          v-for="item in items"
          :key="item.name"
          :item="item"
          @update:item-item="(val) => emit('update:item', val)"
          @error="
            (msg) => {
              emit('error', msg)
            }
          "
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
import Table from "@/components/Base/Table/BaseTable.vue"
import BudgetTableRow from "@/components/BudgetView/BudgetTableRow.vue"

const emit = defineEmits(["update:item", "error"])

const { items } = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
