<template>
  <input
    ref="elementRef"
    v-model="model"
    v-bind="$attrs"
    :class="['input', isValid ? '' : 'invalid-input']"
  />
</template>

<script setup>
import { ref } from "vue"

defineProps({
  isValid: {
    type: Boolean,
    default: true,
  },
})

const model = defineModel({
  type: [Number, String, null],
  default: "",
  required: true,
})

const elementRef = ref(null)

defineExpose({ elementRef })
</script>
