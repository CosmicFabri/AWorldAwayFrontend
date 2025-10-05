<template>
  <TrainHeader @trained="handleTrainingResults" @loading="handleLoading" />

  <div class="flex flex-col px-16 border-b-2 border-gray-300 pb-10 py-4">
    <div class="flex flex-row justify-between items-center w-full py-4">
      <!-- Dynamic DataTable -->
      <div class="flex flex-col w-5/8 gap-y-12">
        <h1 class="text-lg font-semibold">Sample data (10 rows of the dataset)</h1>
        <DataTable
          size="small"
          :value="tableRows"
          scrollable
          scroll-height="60vh"
          show-gridlines
          striped-rows
          table-style="width: 100%"
        >
          <Column v-for="header in tableHeaders" :key="header" :field="header" :header="header" />
        </DataTable>
      </div>

      <!-- Graphs section -->
      <div class="flex flex-col h-full gap-y-4 justify-between items-center">
        <div class="flex flex-row gap-x-12 justify-betweeen">
          <FloatLabel variant="on">
            <Select
              class="w-48"
              input-id="graphs"
              v-model="selectedGraph"
              :options="graphs"
              option-label="label"
              option-value="value"
            />
            <label for="graphs">Graph</label>
          </FloatLabel>
          <Button @click="exportModel" class="mb-4" label="Export Model" />
        </div>

        <!-- Conditional rendering -->
        <div class="flex w-120 h-105 border-2 shadow-lg/30 items-center justify-center">
          <div v-if="loading" class="flex flex-col items-center justify-center">
            <div
              class="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"
            ></div>
            <p class="mt-4 text-gray-600 font-medium">Training model...</p>
          </div>

          <img v-else :src="imageSrc" alt="Graph" class="flex w-full h-full object-contain" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import TrainHeader from '@/components/content/TrainHeader.vue'
import { Button, Column, DataTable, FloatLabel, Select } from 'primevue'
import { exoplanetsApi } from '@/api/axios'

const loading = ref(false)
const graphs = ref([
  { label: 'Confusion matrix', value: 'confusion' },
  { label: 'Feature importance', value: 'feature' },
  { label: 'Metrics bar', value: 'metrics' },
])

const selectedGraph = ref('confusion')
const tableHeaders = ref<string[]>([])
const tableRows = ref<any[]>([])
const graphImages = ref<Record<string, string>>({})
const imageSrc = ref<string>('')

const handleTrainingResults = (data: any) => {
  console.log('Training results received:', data)

  graphImages.value = {
    confusion: `data:image/png;base64,${data.graphics.confussion_matrix}`,
    feature: `data:image/png;base64,${data.graphics.feature_importance}`,
    metrics: `data:image/png;base64,${data.graphics.metrics_bar}`,
  }

  imageSrc.value = graphImages.value.confusion as string

  if (data.headerTest && data['matriz_values:']) {
    tableHeaders.value = data.headerTest

    tableRows.value = data['matriz_values:'].map((row: any[]) => {
      const obj: Record<string, any> = {}
      data.headerTest.forEach((header: string, i: number) => {
        obj[header] = row[i]
      })
      return obj
    })
  }
}

const handleLoading = (state: boolean) => {
  loading.value = state
}

const exportModel = async () => {
  try {
    const response = await exoplanetsApi.get('export', {
      responseType: 'blob',
    })

    const blob = new Blob([response.data], {
      type: response.headers['content-type'] || 'application/octet-stream',
    })

    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    const contentDisposition = response.headers['content-disposition']
    console.log(contentDisposition)

    let filename = 'model.pkl'

    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="?(.+)"?/i)
      if (filenameMatch && filenameMatch[1]) {
        filename = filenameMatch[1]
      }
    }

    link.download = filename
    document.body.appendChild(link)
    link.click()

    // Clean
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  try {
    const res = await exoplanetsApi.get('init')
    const data = res.data

    graphImages.value = {
      confusion: `data:image/png;base64,${data.graphics.confussion_matrix}`,
      feature: `data:image/png;base64,${data.graphics.feature_importance}`,
      metrics: `data:image/png;base64,${data.graphics.metrics_bar}`,
    }
		
    imageSrc.value = graphImages.value.confusion as string
    tableHeaders.value = data.headerTest
		
		
    tableRows.value = data['matriz_values:'].map((row: any[]) => {
      const obj: Record<string, any> = {}
      data.headerTest.forEach((header: string, i: number) => {
        obj[header] = row[i]
      })
      return obj
    })
  } catch (error) {
    console.error('Error fetching KOI data:', error)
  }
})

watch(selectedGraph, (newVal) => {
  imageSrc.value = graphImages.value[newVal] as string
})
</script>
