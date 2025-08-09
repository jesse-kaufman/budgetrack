<template>
  <div class="scroll-container pb-4 overflow-x-auto">
    <table
      v-bind="$attrs"
      class="border-gray-800/80 border-spacing-0 border border-separate rounded-lg shadow-lg"
    >
      <slot></slot>
    </table>
  </div>
</template>

<script setup>
defineOptions({ inheritAttrs: false })
</script>
