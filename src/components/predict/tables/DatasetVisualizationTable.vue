<template>
  <div class="w-[80%]">
    <h2 v-if="!dataResult" class="text-xl font-semibold text-center">Your dataset will appear here</h2>

    <DataTable
      v-else
      size="small"
      scroll-height="60vh"
      scrollable 
      striped-rows
      table-style="width: 100%"
      :value="dataResult.data"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20, 50]"
    >
      <Column
        v-for="col of dataResult.columns"
        :key="col.field"
        :field="col.field"
        :header="col.header"
      ></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { DataResult } from '@/interfaces/DataTableInterfaces'
import { DataTable, Column } from 'primevue'

defineProps<{
  dataResult: DataResult | null
}>()
</script>

<style scoped></style>
