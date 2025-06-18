<template>
  <input
    type="checkbox"
    :checked="model"
    @change="model = $event.target.checked"
  />
</template>

<script setup>
const model = defineModel(
  {
    type: Boolean,
    default: false,
  },
  {
    onUpdate: "model",
  }
)
</script>
