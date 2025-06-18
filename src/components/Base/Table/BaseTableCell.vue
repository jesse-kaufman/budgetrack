<!-- BaseTableCell.vue -->
<template>
  <component :is="as">
    <slot />
  </component>
</template>

<script setup>
defineProps({
  as: {
    type: String,
    default: "td",
  },
  isLast: {
    type: Boolean,
    default: false,
  },
})
</script>
