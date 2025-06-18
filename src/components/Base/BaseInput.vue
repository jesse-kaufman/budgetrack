<template>
  <input
    ref="elementRef"
    v-model="model"
    :class="['input', invalid ? 'invalid-input' : '']"
  />
</template>

<script setup>
import { ref } from "vue"

defineProps({
  invalid: {
    type: Boolean,
    default: false,
  },
})

const model = defineModel({
  type: [Number, String, null],
  default: "",
  required: true,
})

const elementRef = ref(null)

defineExpose({
  focus() {
    elementRef.value?.focus()
  },
})
</script>
