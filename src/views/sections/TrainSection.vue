<template>
  <TrainHeader />

  <!-- Sample data and graphs -->
  <div class="flex flex-row justify-between w-full px-16 py-4 border-b-2 border-gray-300  ">
    <!-- Sample dataset data (10 rows) -->
    <DataTable
      size="small"
      :value="KOI"
      scrollable
      scroll-height="60vh"
      show-gridlines
      striped-rows
			table-style="width: 100%"
    >
      <Column field="KepID" header="KepID" />
      <Column field="KOI_Name" header="KOI Name" />
      <Column field="Kepler_Name" header="Kepler Name" />
      <Column field="Exoplanet_Archive_Disposition" header="Exoplanet Archive Disposition" />
    </DataTable>

    <!-- Graphs section -->
    <div class="flex flex-col h-full justify-between items-center">
      <FloatLabel variant="on">
        <Select class="w-48" input-id="graphs" :options="graphs" :default-value="graphs[0]" />
        <label for="graphs">Graph</label>
      </FloatLabel>
    </div>
  </div>
</template>

<script setup lang="ts">
import TrainHeader from '@/components/content/TrainHeader.vue'
import { Column, DataTable, FloatLabel, Select } from 'primevue'
import { ref } from 'vue'

// Hardcoded table values for now...
const KOI = ref([
  {
    KepID: '10797460',
    KOI_Name: 'K00752.01',
    Kepler_Name: 'Kepler-227 b',
    Exoplanet_Archive_Disposition: 'CONFIRMED',
  },
  {
    KepID: '10797460',
    KOI_Name: 'K00752.02',
    Kepler_Name: 'Kepler-227 c',
    Exoplanet_Archive_Disposition: 'CONFIRMED',
  },
  {
    KepID: '10811496',
    KOI_Name: 'K00753.01',
    Kepler_Name: '',
    Exoplanet_Archive_Disposition: 'CANDIDATE',
  },
  {
    KepID: '10848459',
    KOI_Name: 'K00754.01',
    Kepler_Name: '',
    Exoplanet_Archive_Disposition: 'FALSE POSITIVE',
  },
  {
    KepID: '10854555',
    KOI_Name: 'K00755.01',
    Kepler_Name: 'Kepler-664 b',
    Exoplanet_Archive_Disposition: 'CONFIRMED',
  },
  {
    KepID: '10872983',
    KOI_Name: 'K00756.01',
    Kepler_Name: 'Kepler-228 b',
    Exoplanet_Archive_Disposition: 'CONFIRMED',
  },
  {
    KepID: '10872983',
    KOI_Name: 'K00756.02',
    Kepler_Name: 'Kepler-228 c',
    Exoplanet_Archive_Disposition: 'CONFIRMED',
  },
  {
    KepID: '10872983',
    KOI_Name: 'K00756.03',
    Kepler_Name: 'Kepler-228 b',
    Exoplanet_Archive_Disposition: 'CONFIRMED',
  },
  {
    KepID: '6721123',
    KOI_Name: 'K00114.01',
    Kepler_Name: '',
    Exoplanet_Archive_Disposition: 'FALSE POSITIVE',
  },
  {
    KepID: '10910878',
    KOI_Name: 'K00757.01',
    Kepler_Name: 'Kepler-229 c',
    Exoplanet_Archive_Disposition: 'CONFIRMED',
  },
])

// Sample graphs (will be modified later)
const graphs = ref(['Performance', 'Epochs', 'Graph'])
</script>
