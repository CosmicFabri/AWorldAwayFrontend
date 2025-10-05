<template>
  <div class="flex flex-row justify-between items-center gap-x-8 px-16 py-4">
    <PredictInputData @method-changed="onMethodChanged" />
    <DataVisualization :inputMethod="selectedMethod" />
  </div>
</template>

<script setup lang="ts">
import PredictInputData from '@/components/content/PredictInputData.vue'
import DataVisualization from '@/components/predict/DataVisualization.vue'
import { ref } from 'vue'

 // Can be 'File' or 'Manually'
const selectedMethod = ref<string>('Manually')

const onMethodChanged = (method: string) => {
  selectedMethod.value = method
}
</script>
