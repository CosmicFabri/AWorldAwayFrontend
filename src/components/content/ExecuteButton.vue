<template>
  <Button @click="handleClick" class="w-13 h-13 p-0" rounded>
    <i class="pi pi-play py-2" style="font-size: 1.2rem; font-weight: bold" />
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import { exoplanetsApi } from '@/api/axios'
import { useDatasetStore } from '@/stores/dataset'
import type { ClassificationResultResponse } from '@/interfaces/ClassificationResult.interface'

const store = useDatasetStore()

const props = defineProps<{
  // File or Manually
  method?: string
}>()

const handleClick = async () => {
  try {
    if (props.method === 'File') {
      const csvFile = store.trainingDatasetCSV

      const formData = new FormData()

      if (csvFile) {
        formData.append('file', csvFile)
      } else {
        throw new Error('No CSV file provided')
      }

      const response = await exoplanetsApi.post<ClassificationResultResponse>(
        'predict/batch',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true,
        },
      )

      const { predictions, probabilities } = response.data
      const result = {
        predictions,
        probabilities,
      }

      // store.classificationResult = result

      emit('predictionDone', result)
    }
  } catch (error) {
    console.log(error)
  }
}

const emit = defineEmits<{
  (e: 'predictionDone', value: ClassificationResultResponse): void
}>()
</script>
