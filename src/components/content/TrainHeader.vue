<template>
  <div class="flex flex-row items-center justify-between px-16 py-2 border-b-2 border-gray-300">
    <!-- Train -->
    <div class="flex flex-col gap-y-2">
      <h1 class="text-2xl font-semibold">Train</h1>
      <ExecuteButton />
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
import { FloatLabel, Select } from 'primevue'
import { ref } from 'vue';
import GBTParameters from './GBTParameters.vue'
import ExecuteButton from './ExecuteButton.vue';

const datasets = ref(['KOI', 'TESS'])
const algorithms = ref(['Backpropagation', 'Algorithm'])
</script>

<style scoped>
</style>
