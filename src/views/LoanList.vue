<template>
  <div>
    <h1 class="mb-8 text-2xl font-black text-center">Construction Loans</h1>

    <BaseTable>
      <thead>
        <tr>
          <th class="whitespace-nowrap">Loan #</th>
          <th>Lot</th>
          <th>Block</th>
          <th>Addition</th>
          <th>City</th>
          <th>State</th>
          <th>ZIP</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <template v-if="loading">
          <tr v-for="n in 5" :key="n">
            <th><div class="skeleton"></div></th>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
            <td><div class="skeleton"></div></td>
          </tr>
        </template>
        <template v-if="!loading">
          <tr v-for="loan in loans" :key="loan.id">
            <th class="whitespace-nowrap">{{ loan.id }}</th>
            <td class="text-center">{{ loan.lot }}</td>
            <td class="text-center">{{ loan.block }}</td>
            <td class="text-center">{{ loan.addition }}</td>
            <td class="text-center">{{ loan.city }}</td>
            <td class="text-center">{{ loan.state }}</td>
            <td class="text-center">{{ loan.zip }}</td>
            <td class="text-center">
              <router-link
                :to="`/ConstructionLoans/${loan.id}`"
                class="button-sm"
              >
                view
              </router-link>
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr><td colspan="11"></td></tr>
      </tfoot>
    </BaseTable>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import { getLoans } from "@/services/loanService"
import BaseTable from "@/components/Base/Table/BaseTable.vue"

const loading = ref(true)
const loans = ref([])

// Fetch the loan data when the component is mounted
onMounted(async () => {
  // Default loading state to true
  loading.value = true

  loans.value = await getLoans()

  // Set loading state to false
  loading.value = false
})
</script>
