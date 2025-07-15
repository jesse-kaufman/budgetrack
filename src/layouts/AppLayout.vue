<template>
  <div class="w-fit mx-auto">
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <h1 class="text-2xl font-bold">{{ title }}</h1>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
