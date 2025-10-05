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

        <!-- Dynamic image -->
        <img
          v-if="imageSrc"
          :src="imageSrc"
          class="flex w-92 h-90 border-2 shadow-lg/30"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import TrainHeader from '@/components/content/TrainHeader.vue'
import { Button, Column, DataTable, FloatLabel, Select } from 'primevue'
import { exoplanetsApi } from '@/api/axios'
import { useDatasetStore } from '@/stores/dataset'

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