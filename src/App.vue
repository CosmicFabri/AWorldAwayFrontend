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
import { exoplanetsApi } from '@/api/axios'
import { useDatasetStore } from '@/stores/dataset'

onMounted(async () => {
  const store = useDatasetStore()

  try {
    const res = await exoplanetsApi.get('init')
    const data = await res.data

    store.setCurrentDataset({
      headers: data.headerTest,
      name: 'Koi',
      targetColumn: 'koi_disposition',
    })
  } catch (error) {
    console.log(error)
  }
})
</script>
