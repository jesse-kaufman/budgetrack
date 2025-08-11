<template>
  <div
    class="min-w-1/3 w-fit sm:min-w-auto grow last:border-gray-800/80 last:border-b-1 last:border-r-1 px-4 py-3"
  >
    <div class="text-[.8em] uppercase font-black">{{ name }}:</div>
    <div v-if="loading" class="mt-1.5 mb-1 skeleton min-w-10"></div>
    <div class="pt-1 text-lg" v-else>
      <CurrencyField v-if="value" :model-value="value" :view-only="true" />
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
