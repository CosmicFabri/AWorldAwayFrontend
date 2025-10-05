<template>
  <AppHeader />
  <ContentView />
  <AppFooter />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import ContentView from './views/ContentView.vue'
import { exoplanetsApi } from './api/axios'

onMounted(async () => {
	try {
		const response = await exoplanetsApi.get('init')
		console.log(response);
		
	} catch (error) {
		console.log("There was an error...");
		
	}
})
</script>
