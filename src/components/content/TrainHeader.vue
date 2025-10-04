<template>
  <div class="flex flex-row items-center justify-between px-16 py-2 border-b-2 border-gray-300">
    <!-- Train -->
    <div class="flex flex-col gap-y-2">
      <h1 class="text-2xl font-semibold">Train</h1>
      <Button class="custom-blue-button" rounded>
        <i class="pi pi-play py-2" style="font-size: 1.2rem; font-weight: bold" />
      </Button>
    </div>

    <div class="flex flex-row gap-x-8">
      <!-- Dataset Select -->
			<FloatLabel>
				<Select class="w-48" input-id="datasets" :options="datasets" :default-value="datasets[0]" />
				<label for="datasets">Dataset</label>
			</FloatLabel>

			<!-- Algorithm Select -->
			<FloatLabel>
				<Select class="w-48" input-id="algorithms" :options="algorithms" :default-value="algorithms[0]" />
				<label for="algorithms">Algorithm</label>
			</FloatLabel>

			<!-- Hyperparameters -->
			<GBTParameters />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Button, FloatLabel, Select } from 'primevue'
import { ref } from 'vue';
import GBTParameters from './GBTParameters.vue'

const datasets = ref(['KOI', 'TESS'])
const algorithms = ref(['Backpropagation', 'Algorithm'])
</script>

<style scoped>
.custom-blue-button {
  /* electrical-blue, in the color palette */
  background-color: #0042a6;
  border-color: #0042a6;
}
</style>
