<template>
  <div class="flex flex-row items-center gap-x-8 px-16 py-4 w-full">
    <PredictInputData @prediction-done="handlePrediction" @method-changed="onMethodChanged" @data-uploaded="handleDataUploaded" />
    <DataVisualization :data-result="dataResult" :inputMethod="selectedMethod" />
  </div>
</template>

<script setup lang="ts">
import PredictInputData from '@/components/content/PredictInputData.vue'
import DataVisualization from '@/components/predict/DataVisualization.vue'
import type { ClassificationResultResponse } from '@/interfaces/ClassificationResult.interface'
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

const handlePrediction = (result: ClassificationResultResponse) => {
  const oldColumns = dataResult.value?.columns
  const oldData = dataResult.value?.data

  const newColumns = [
    {
      field: 'prediction',
      header: 'prediction'
    },
    {
      field: 'probability',
      header: 'probability'
    },
    ...(oldColumns ?? [])
  ]

  const newData = (oldData ?? []).map((value, index) => {
    return {
      prediction: result.predictions[index]?.toString() ?? '',
      probability: result.probabilities[index]?.toString() ?? '',
      ...value
    }
  })

  dataResult.value = {
    columns: newColumns,
    data: newData
  }
}
</script>
