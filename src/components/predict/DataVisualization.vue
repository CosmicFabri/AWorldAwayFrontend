<template>
  <DataPointTable v-if="inputMethod === 'Manually'" />
  <DatasetVisualizationTable :data-result="dataResult" v-if="inputMethod === 'File'" />
</template>

<script setup lang="ts">
import type { DataResult } from '@/interfaces/DataTableInterfaces'
import DataPointTable from './tables/DataPointTable.vue'
import DatasetVisualizationTable from './tables/DatasetVisualizationTable.vue'

defineProps<{
  inputMethod: string
  dataResult: DataResult | null
}>()
</script>
