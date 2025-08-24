<template>
  <div
    class="min-w-1/3 w-fit sm:min-w-auto grow last:border-gray-800/80 last:border-b-1 last:border-r-1 px-4 py-3"
  >
    <div class="text-[.8em] uppercase font-black">{{ name }}:</div>
    <div v-if="loading" class="skeleton min-w-20 mt-3 mb-2" />
    <div v-else class="pt-1 text-lg">
      <CurrencyField v-if="value" :modelValue="value" :viewOnly="true" />
      <div v-else><slot /></div>
    </div>
  </div>
</template>

<script setup>
import CurrencyField from "#ui/fields/CurrencyField.vue"

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
