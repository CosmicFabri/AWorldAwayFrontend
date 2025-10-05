import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface Dataset {
  headers: string[]
  name: string
  targetColumn?: string
}

export const useDatasetStore = defineStore('dataset', () => {
  const currentDataset = ref<Dataset>()
  const trainingDatasetCSV = ref<File>()

  const setCurrentDataset = (newDataset: Dataset) => {
    currentDataset.value = newDataset
  }

  const getHeadersWithoutTarget = computed(() => {
    const headers = currentDataset.value?.headers
    const target = currentDataset.value?.targetColumn

    if (!headers || !target) return []

    return headers.filter((value) => {
      return value !== target
    })
  })

  return {
    currentDataset,
    setCurrentDataset,
    getHeadersWithoutTarget,
    trainingDatasetCSV,
  }
})
