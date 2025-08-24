<template>
  <div
    id="sticky-banner"
    tabindex="-1"
    class="fixed top-0 flex justify-between w-full h-12 select-none z-900 drop-shadow-sm start-0"
  >
    <div
      class="flex items-center justify-around w-full p-1 px-4"
      :class="{
        'bg-linear-to-t from-red-900 to-red-800/90 text-white':
          type === 'error',
        'bg-yellow-500 text-yellow-900': type !== 'error',
      }"
    >
      <p class="text-sm leading-none text-center font-bold grow-1 p-0.5">
        <span>{{ message }}</span>
      </p>
      <div
        v-if="type !== 'error'"
        class="ml-8 button button-primary text-shadow-sm"
      >
        Save
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  message: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})
</script>
