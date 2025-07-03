<template>
  <Table>
    <thead>
      <tr>
        <th scope="col"></th>
        <th class="bg-fuchsia-300/40" scope="col">Per Paycheck</th>
        <th class="bg-cyan-300/40" scope="col">Per Month</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!loading">
        <BudgetItem
          v-for="(item, index) in budgetStore.items"
          :key="item.name"
          :item="item"
          :index="index"
          @update:item="handleUpdate"
        />
      </template>
      <template v-else>
        <template v-for="n in 10" :key="n">
          <BudgetItem :item="{}" :loading="true" />
        </template>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td></td>
        <td class="bg-gray-700">
          <template v-if="!loading">
            <div class="flex flex-row justify-between items-center space-x-1">
              <span>$</span>
              <div :class="`font-semibold text-right ${totalClass}`">
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
            <div class="flex flex-row justify-between items-center space-x-1">
              <span>$</span>
              <div :class="`font-semibold text-right ${totalClass}`">
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
import BudgetItem from "./BudgetItem.vue"
import { useBudgetStore } from "@/stores/budgetStore"
import Table from "@/components/Base/BaseTable.vue"
import { formatCurrency } from "@/utils/currencyUtils"

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
