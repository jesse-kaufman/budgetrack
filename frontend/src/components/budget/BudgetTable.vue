<template>
  <Table class="w-full mt-2">
    <thead>
      <tr>
        <th scope="col"></th>
        <th scope="col">Amount</th>
        <th v-if="showAccountColumn" scope="col">Savings Account</th>
        <th class="bg-fuchsia-300/40" scope="col">Per Paycheck</th>

        <th v-if="showMonthColumn" class="bg-cyan-300/40" scope="col">
          Per Month
        </th>
      </tr>
    </thead>
    <tbody>
      <template v-if="!budgetStore.loading">
        <BudgetItem
          v-for="(item, index) in budgetStore.items"
          :key="item.name"
          :item="item"
          :index="index"
          :show-month-column="showMonthColumn"
          :show-account-column="showAccountColumn"
          :previous-type="index > 0 ? budgetStore.items[index - 1].type : null"
          @update:item="handleUpdate"
        />
      </template>
      <template v-else>
        <template v-for="n in 10" :key="n">
          <BudgetItem
            :item="{}"
            :index="n"
            :show-month-column="showMonthColumn"
            :show-account-column="showAccountColumn"
          />
        </template>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td :colspan="columnCount"></td>
        <td class="bg-gray-700">
          <template v-if="!budgetStore.loading">
            <div class="flex flex-row items-center justify-between space-x-1">
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
        <td v-if="showMonthColumn" class="bg-gray-700">
          <template v-if="!budgetStore.loading">
            <div class="flex flex-row items-center justify-between space-x-1">
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
import { useBudgetStore } from "#stores/budgetStore.js"
import Table from "#base/BaseTable.vue"
import { formatCurrency } from "#utils/currencyUtils.js"

const budgetStore = useBudgetStore()

const { showMonthColumn, showAccountColumn } = defineProps({
  showMonthColumn: {
    type: Boolean,
    required: true,
  },
  showAccountColumn: {
    type: Boolean,
    required: true,
  },
})

const columnCount = computed(() => {
  let count = 2
  if (showAccountColumn) count++
  return count
})
const totalClass = computed(() =>
  budgetStore.totalMonthlyDifference < 0 ? "text-red-400" : "text-green-400"
)

const handleUpdate = (eventData) =>
  budgetStore.updateItem(eventData.index, eventData.data)
</script>
