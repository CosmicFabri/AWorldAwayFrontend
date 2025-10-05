<template>
  <TrainHeader />

  <div class="flex flex-col px-16 border-b-2 border-gray-300">
    <div class="flex flex-row gap-x-8 justify-between w-full py-4">
      <!-- Dynamic DataTable -->
      <DataTable
        size="small"
        :value="tableRows"
        scrollable
        scroll-height="60vh"
        show-gridlines
        striped-rows
        table-style="width: 100%"
        class="w-5/7"
      >
        <Column v-for="header in tableHeaders" :key="header" :field="header" :header="header" />
      </DataTable>

      <!-- Graphs section -->
      <div class="flex flex-col h-full gap-y-4 justify-between items-center">
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

        <!-- Dynamic image -->
        <img v-if="imageSrc" :src="imageSrc" class="flex w-92 h-90 border-2 shadow-lg/30" />
      </div>
    </div>

    <Button class="mb-4" label="Export Model" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import TrainHeader from '@/components/content/TrainHeader.vue'
import { Button, Column, DataTable, FloatLabel, Select } from 'primevue'
import { exoplanetsApi } from '@/api/axios'
import { useDatasetStore } from '@/stores/dataset'

// Options for select dropdown
const graphs = ref([
  { label: 'Confusion matrix', value: 'confusion' },
  { label: 'Feature importance', value: 'feature' },
  { label: 'Metrics bar', value: 'metrics' },
])

// Selected graph
const selectedGraph = ref<string>('confusion')

// Dynamic table data
const tableHeaders = ref<string[]>([])
const tableRows = ref<any[]>([])

// Base64 images from backend
const graphImages = ref<Record<string, string>>({})

// Displayed image
const imageSrc = ref<string>('')

const store = useDatasetStore()

onMounted(async () => {
  try {
    const res = await exoplanetsApi.get('init')
    const data = await res.data

    // Store base64 images
    graphImages.value = {
      confusion: `data:image/png;base64,${data.graphics.confussion_matrix}`,
      feature: `data:image/png;base64,${data.graphics.feature_importance}`,
      metrics: `data:image/png;base64,${data.graphics.metrics_bar}`,
    }

    // Default image
    imageSrc.value = graphImages.value.confusion as string

    // Set headers from backend
    tableHeaders.value = data.headerTest

    // Map backend rows into objects {header: value, ...} for DataTable
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

// Watcher to update image when select changes
watch(selectedGraph, (newVal) => {
  imageSrc.value = graphImages.value[newVal] as string
})
</script>
