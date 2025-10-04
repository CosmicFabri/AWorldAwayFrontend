<template>
  <TrainHeader />

	<div class="flex flex-col px-16 border-b-2 border-gray-300">
		<!-- Sample data and graphs -->
		<div class="flex flex-row gap-x-8 justify-between w-full py-4">
			<!-- Sample dataset data (10 rows) -->
			<DataTable
				size="small"
				:value="KOI"
				scrollable
				scroll-height="60vh"
				show-gridlines
				striped-rows
				table-style="width: 100%"
				class="w-4/5"
			>
				<Column field="KepID" header="KepID" />
				<Column field="KOI_Name" header="KOI Name" />
				<Column field="Kepler_Name" header="Kepler Name" />
				<Column field="Exoplanet_Archive_Disposition" header="Exoplanet Archive Disposition" />
				<Column field="Orbital_Period_days" header="Orbital Period (days)" />
				<Column field="Transit_Epoch_BKJD" header="Transit Epoch" />
				<Column field="Impact_Parameter" header="Impact Parameter" />
				<Column field="Transit_Duration_hrs" header="Transit Duration (hrs)" />
			</DataTable>
	
			<!-- Graphs section -->
			<div class="flex flex-col h-full gap-y-8 justify-between items-center">
				<FloatLabel variant="on">
					<Select class="w-48" input-id="graphs" :options="graphs" :default-value="graphs[0]" />
					<label for="graphs">Graph</label>
				</FloatLabel>
				<div class="flex w-80 h-80 border-2">
					<!-- Make this a square -->
				</div>
			</div>
		</div>

		<!-- Export Model button -->
		<Button class="mb-4" label="Export Model" />
	</div>
</template>

<script setup lang="ts">
import TrainHeader from '@/components/content/TrainHeader.vue'
import { Button, Column, DataTable, FloatLabel, Select } from 'primevue'
import { ref } from 'vue'
import { KOI } from '@/data/KOI'

// Sample graphs (will be modified later)
const graphs = ref(['Performance', 'Epochs', 'Graph'])
</script>
