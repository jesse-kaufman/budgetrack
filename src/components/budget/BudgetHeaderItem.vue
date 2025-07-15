<template>
  <div
    class="min-w-1/3 sm:min-w-auto grow last:border-gray-800/80 last:border-b-1 last:border-r-1 px-4 py-2"
  >
    <div class="text-[.8em] uppercase font-black">{{ name }}:</div>
    <div v-if="loading" class="mt-1.5 mb-1 skeleton min-w-10"></div>
    <div v-else>{{ value }}</div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    default: "",
  },
  value: {
    type: [String, Number],
    default: "",
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>
