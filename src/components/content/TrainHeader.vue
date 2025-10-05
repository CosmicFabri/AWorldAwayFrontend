<template>
  <div class="flex flex-row items-center justify-between px-16 py-2 border-b-2 border-gray-300">
    <!-- Train -->
    <div class="flex flex-col gap-y-2">
      <h1 class="text-2xl font-semibold">Train</h1>
      <ExecuteButton />
    </div>

    <div class="flex flex-row gap-x-6">
      <!-- Dataset Select -->

      <FloatLabel>
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
      <FloatLabel>
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
      <GBTParameters />

      <UploadDatasetModal v-model:isVisible="isModalVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { FloatLabel, Select } from 'primevue'
import { ref } from 'vue'
import GBTParameters from './GBTParameters.vue'
import ExecuteButton from './ExecuteButton.vue'
import UploadDatasetModal from '../train/UploadDatasetModal.vue'

const datasets = ref(['KOI', 'Upload my data'])
const algorithms = ref(['Gradient Boosting Tree'])

const isModalVisible = ref(false)

const handleChange = (event: any) => {
  if (event.value === 'Upload my data') {
    isModalVisible.value = true
  }
}
</script>

<style scoped></style>
