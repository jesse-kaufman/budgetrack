<template>
  <AppLayout :title="$route.meta.title || ''">
    <router-view />
  </AppLayout>
</template>

<script setup>
import AppLayout from "./layouts/AppLayout.vue"
</script>
