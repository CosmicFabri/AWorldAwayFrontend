<template>
  <AppHeader />
  <ContentView />
  <AppFooter />
</template>

<script setup lang="ts">
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import ContentView from './views/ContentView.vue'

console.log("API URL:", import.meta.env.VITE_API_URL)
</script>
