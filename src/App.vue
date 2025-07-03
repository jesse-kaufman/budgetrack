<template>
  <div class="w-fit mx-auto">
    <router-view></router-view>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { useBudgetStore } from "@/stores/budgetStore"

const budgetStore = useBudgetStore()

onMounted(() => {
  budgetStore.load()
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>
