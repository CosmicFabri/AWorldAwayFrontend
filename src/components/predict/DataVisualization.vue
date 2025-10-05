<template>
  <DataPointTable v-if="inputMethod === 'Manually'" />
</template>

<script setup lang="ts">
import DataPointTable from './tables/DataPointTable.vue';

const props = defineProps<{
  inputMethod: string
}>()
</script>
