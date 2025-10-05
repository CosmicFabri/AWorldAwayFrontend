<template>
  <div class="flex flex-row gap-x-8">
    <!-- Estimators -->
    <FloatLabel>
      <Select
        class="w-28"
        input-id="n_estimators"
        v-model="params.n_estimators"
        :options="nEstimatorsOptions"
        option-label="label"
        option-value="value"
      />
      <label for="n_estimators">Estimators</label>
    </FloatLabel>

    <!-- Learning Rate -->
    <FloatLabel>
      <Select
        class="w-28"
        input-id="learning_rate"
        v-model="params.learning_rate"
        :options="learningRateOptions"
        option-label="label"
        option-value="value"
      />
      <label for="learning_rate">Learning Rate</label>
    </FloatLabel>

    <!-- Max Depth -->
    <FloatLabel>
      <Select
        class="w-28"
        input-id="max_depth"
        v-model="params.max_depth"
        :options="maxDepthOptions"
        option-label="label"
        option-value="value"
      />
      <label for="max_depth">Max Depth</label>
    </FloatLabel>

    <!-- Subsample -->
    <FloatLabel>
      <Select
        class="w-28"
        input-id="subsample"
        v-model="params.subsample"
        :options="subsampleOptions"
        option-label="label"
        option-value="value"
      />
      <label for="subsample">Subsample</label>
    </FloatLabel>

    <!-- Min Samples Split -->
    <FloatLabel>
      <Select
        class="w-28"
        input-id="min_samples_split"
        v-model="params.min_samples_split"
        :options="minSamplesSplitOptions"
        option-label="label"
        option-value="value"
      />
      <label for="min_samples_split">Min Samples Split</label>
    </FloatLabel>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { FloatLabel, Select } from 'primevue'
import type { GBTParams } from '@/data/interfaces/GBTParams'

// This would be fetched from the backend
const backendResponse = {
  parameters_default: {
    learning_rate: 0.1,
    max_depth: 3,
    min_samples_split: 2,
    n_estimators: 100,
    subsample: 1
  }
}

const params = ref<GBTParams>({
  learning_rate: null,
  max_depth: null,
  min_samples_split: null,
  n_estimators: null,
  subsample: null
})

onMounted(() => {
  // Set defaults from backend
  params.value = { ...backendResponse.parameters_default }
})

// Options for dropdowns (include the backend default)
const nEstimatorsOptions = [
  { label: '50', value: 50 },
  { label: '100', value: 100 },
  { label: '200', value: 200 }
]

const learningRateOptions = [
  { label: '0.01', value: 0.01 },
  { label: '0.1', value: 0.1 },
  { label: '0.2', value: 0.2 }
]

const maxDepthOptions = [
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 }
]

const subsampleOptions = [
  { label: '0.8', value: 0.8 },
  { label: '1', value: 1 }
]

const minSamplesSplitOptions = [
  { label: '2', value: 2 },
  { label: '5', value: 5 },
  { label: '10', value: 10 }
]
</script>