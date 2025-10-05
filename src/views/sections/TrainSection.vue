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
        <Column
          v-for="header in tableHeaders"
          :key="header"
          :field="header"
          :header="header"
        />
      </DataTable>

      <!-- Graphs section -->
      <div class="flex flex-col h-full gap-y-8 justify-between items-center">
        <FloatLabel variant="on">
          <Select class="w-48" input-id="graphs" :options="graphs" :default-value="graphs[0]" />
          <label for="graphs">Graph</label>
        </FloatLabel>
        <div class="flex w-80 h-80 border-2"></div>
      </div>
    </div>

    <Button class="mb-4" label="Export Model" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import TrainHeader from '@/components/content/TrainHeader.vue'
import { Button, Column, DataTable, FloatLabel, Select } from 'primevue'
import { exoplanetsApi } from '@/api/axios'

const graphs = ref(['Performance', 'Epochs', 'Graph'])

// Dynamic table data
const tableHeaders = ref<string[]>([])
const tableRows = ref<any[]>([])

onMounted(async () => {
  try {
    const res = await exoplanetsApi.get('init')
    const data = await res.data

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
</script>