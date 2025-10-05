<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="KOIDataPoint"
    edit-mode="cell"
    @cell-edit-complete="onCellEditComplete"
    show-gridlines
    size="small"
    class="w-[80%]"
  >
    <Column v-for="col in getTableColumns" :key="col.field" :field="col.field" :header="col.header">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" class="w-full text-sm" />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { DataTable, Column, InputText } from 'primevue'
import { KOIDataPoint } from '@/data/KOIDataPoint'
import { useDatasetStore } from '@/stores/dataset'

const store = useDatasetStore()

const tableHeaders = ref<string[]>([])

const getTableColumns = computed(() =>
  tableHeaders.value.map((value) => {
    return {
      field: value,
      header: value,
    }
  }),
)

// Watch para reaccionar cuando el dataset esté disponible
watch(
  () => store.currentDataset,
  (newDataset) => {
    if (newDataset) {
      tableHeaders.value = store.getHeadersWithoutTarget
      // console.log(tableHeaders.value)

      console.log('Dataset cargado:', newDataset)
    }
  },
  { immediate: true },
)

const editingRows = ref([])

const onCellEditComplete = (event: any) => {
  const { data, newValue, field } = event
  data[field] = newValue
}
</script>
