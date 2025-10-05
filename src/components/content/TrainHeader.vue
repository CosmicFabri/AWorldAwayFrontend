<template>
  <div class="flex flex-row items-center justify-between px-16 py-4 border-b-2 border-gray-300">
    <!-- Train -->
    <h1 class="text-2xl font-semibold">Train</h1>

    <!-- Train and Reset Buttons -->
    <div class="flex flex-row gap-x-4">
      <!-- Execute button -->
      <Button @click="train" class="w-13 h-13 p-0" rounded>
        <i class="pi pi-play py-2" style="font-size: 1.2rem; font-weight: bold" />
      </Button>

      <!-- Reset Params button -->
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
      <GBTParameters v-model:params="form" :default="defaultParams" />

      <UploadDatasetModal v-model:isVisible="isModalVisible" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, FloatLabel, Select } from 'primevue'
import { ref } from 'vue'
import GBTParameters from './GBTParameters.vue'
import UploadDatasetModal from '../train/UploadDatasetModal.vue'
import { exoplanetsApi } from '@/api/axios'

const emit = defineEmits(['trained', 'loading'])

const form = ref({
  n_estimators: null,
  learning_rate: null,
  max_depth: null,
  min_samples_split: null,
})

const datasets = ref(['KOI', 'Upload my data'])
const algorithms = ref(['Gradient Boosting Tree'])

const isModalVisible = ref(false)
const defaultParams = ref(false)

const handleChange = (event: any) => {
  if (event.value === 'Upload my data') {
    isModalVisible.value = true
  }
}

const train = async () => {
  try {
    // Notify parent: training started
    emit('loading', true)

    const payload = {
      n_estimators: form.value.n_estimators,
      learning_rate: form.value.learning_rate,
      max_depth: form.value.max_depth,
      min_samples_split: form.value.min_samples_split,
      train_size: 0.7,
      scaler_type: 'standard',
    }

    console.log('Payload being sent:', payload)
    const res = await exoplanetsApi.post('train/gbt/koi', payload)

    console.log('Model trained successfully:', res.data)

    // Notify parent: training done
    emit('trained', res.data)
  } catch (err) {
    console.error('Error training model:', err)
  } finally {
    // Training finished (success or error)
    emit('loading', false)
  }
}
</script>
