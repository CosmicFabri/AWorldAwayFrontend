<template>
  <div class="flex flex-row justify-between px-16 py-4">
    <PredictInputData />
    <DataVisualization />
  </div>
</template>

<script setup lang="ts">
import PredictInputData from '@/components/content/PredictInputData.vue'
import DataVisualization from '@/components/predict/DataVisualization.vue'
</script>
