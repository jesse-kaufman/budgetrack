<template>
  <AppLayout :title="$route.meta.title || ''">
    <RouterView />
  </AppLayout>
</template>

<script setup>
import AppLayout from "./layouts/AppLayout.vue"
</script>
