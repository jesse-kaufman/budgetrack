<template>
  <template v-if="!loading">
    <select v-model="modelValue" class="w-full">
      <option disabled>-- Select One --</option>
      <option
        v-for="option in normalizedOptions"
        :key="option.value ?? option"
        :value="option.value ?? option"
        :selected="modelValue === option.value"
      >
        {{ option.label ?? option }}
      </option>
    </select>
  </template>
  <template v-else>
    <div class="skeleton"></div>
  </template>
</template>

<script setup>
import { computed } from "vue"
const modelValue = defineModel({ type: String })

const { options } = defineProps({
  loading: {
    type: Boolean,
    default: true,
  },
  options: {
    type: [Array, Object],
    required: true,
  },
})

/** Stores normalized options, converting object options to an array for looping. */
const normalizedOptions = computed(() => {
  if (Array.isArray(options)) return options
  return Object.entries(options).map(([value, label]) => ({ value, label }))
})
</script>
