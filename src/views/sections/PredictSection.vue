<template>
  <div class="flex flex-row items-center gap-x-8 px-16 py-4 w-full my-4">
    <PredictInputData @method-changed="onMethodChanged" @data-uploaded="handleDataUploaded" />
    <DataVisualization :data-result="dataResult" :inputMethod="selectedMethod" />
  </div>
</template>

<script setup lang="ts">
import PredictInputData from '@/components/content/PredictInputData.vue'
import DataVisualization from '@/components/predict/DataVisualization.vue'
import type { DataResult } from '@/interfaces/DataTableInterfaces'
import { ref } from 'vue'

const dataResult = ref<DataResult | null>(null)

// Can be 'File' or 'Manually'
const selectedMethod = ref<string>('Manually')

const onMethodChanged = (method: string) => {
  selectedMethod.value = method
}

const handleDataUploaded = (result: DataResult) => {
  dataResult.value = result
}
</script>
