<template>
  <input
    ref="elementRef"
    v-model="model"
    v-bind="$attrs"
    class="input"
    :class="[isValid ? '' : 'invalid-input']"
  />
</template>

<script setup>
import { ref } from "vue"

const model = defineModel({
  type: [Number, String, null],
  default: "",
  required: true,
})

defineProps({
  isValid: {
    type: Boolean,
    default: true,
  },
})

const elementRef = ref(null)

defineExpose({ elementRef })
</script>
