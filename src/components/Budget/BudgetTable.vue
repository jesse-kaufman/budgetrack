<template>
  <Table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Type</th>
        <th scope="col">Frequency</th>
        <th scope="col">Due</th>
        <th scope="col">Amount</th>
        <th class="bg-fuchsia-300/40" scope="col">Per Paycheck</th>
        <th class="bg-cyan-300/40" scope="col">Per Month</th>
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
        <td colspan="5"></td>
        <td class="bg-gray-700">
          <template v-if="!loading">
            <div class="flex flex-row items-center justify-between space-x-1">
              <span>$</span>
              <div class="font-semibold text-right {{ totalClass }}">
                {{
                  formatCurrency(
                    budgetStore.totalPayPeriodDifference,
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
        <td class="bg-gray-700">
          <template v-if="!loading">
            <div class="flex flex-row items-center justify-between space-x-1">
              <span>$</span>
              <div class="font-semibold text-right {{ totalClass }}">
                {{
                  formatCurrency(
                    budgetStore.totalMonthlyDifference,
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
    </tfoot>
  </Table>
</template>

<script setup>
import { computed } from "vue"
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

const totalClass = computed(() =>
  budgetStore.totalMonthlyDifference < 0 ? "text-red-400" : "text-green-400"
)

const handleUpdate = (eventData) =>
  budgetStore.updateItem(eventData.index, eventData.data)
</script>
