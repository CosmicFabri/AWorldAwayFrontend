<template>
  <div class="flex flex-row items-center justify-between px-16 py-4 border-b-2 border-gray-300">
    <!-- Train -->
    <h1 class="text-2xl font-semibold">Train</h1>
    <div class="flex flex-row gap-x-4">
      <ExecuteButton />
      <Button
        @click="defaultParams = !defaultParams"
        class="w-13 h-13 p-0"
        severity="contrast"
        rounded
      >
        <i class="pi pi-replay py-2" style="font-size: 1.2rem; font-weight: bold" />
      </Button>
    </div>

    <div class="flex flex-row gap-x-6">
      <!-- Dataset Select -->

      <FloatLabel variant="on">
        <Select
          class="w-36"
          input-id="datasets"
          :options="datasets"
          :default-value="datasets[0]"
          @change="handleChange"
        />
        <label for="datasets">Dataset</label>
      </FloatLabel>

      <!-- Algorithm Select -->
      <FloatLabel variant="on">
        <Select
          class="w-60"
          input-id="algorithms"
          :options="algorithms"
          :default-value="algorithms[0]"
          disabled
        />
        <label for="algorithms">Algorithm</label>
      </FloatLabel>

      <!-- Hyperparameters -->
      <GBTParameters :default="defaultParams" />

      <UploadDatasetModal v-model:isVisible="isModalVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, FloatLabel, Select } from 'primevue'
import { ref } from 'vue'
import GBTParameters from './GBTParameters.vue'
import ExecuteButton from './ExecuteButton.vue'
import UploadDatasetModal from '../train/UploadDatasetModal.vue'
import { exoplanetsApi } from '@/api/axios'
import { useDatasetStore } from '@/stores/dataset'

const datasets = ref(['KOI', 'Upload my data'])
const algorithms = ref(['Gradient Boosting Tree'])

const isModalVisible = ref(false)
const defaultParams = ref(false)

const handleChange = async (event: any) => {
  if (event.value === 'Upload my data') {
    isModalVisible.value = true
  } else if (event.value === 'KOI') {
    try {
      const res = await exoplanetsApi.get('init')
      const data = await res.data
      const store = useDatasetStore()

      store.setCurrentDataset({
        headers: data.headerTest,
        name: 'Koi',
        targetColumn: 'koi_disposition',
      })
    } catch (error) {
      console.log(error)
    }
  }
}
</script>

<style scoped></style>
