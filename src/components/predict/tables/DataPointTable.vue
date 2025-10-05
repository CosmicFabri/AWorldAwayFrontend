<template>
  <DataTable
    v-model:editingRows="editingRows"
    :value="KOIDataPoint"
    edit-mode="cell"
    @cell-edit-complete="onCellEditComplete"
    show-gridlines
    size="small"
    class="w-full"
  >
    <Column field="KepID" header="KepID">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" class="w-full text-sm" />
      </template>
    </Column>

    <Column field="KOI_Name" header="KOI Name">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" class="w-full text-sm" />
      </template>
    </Column>

    <Column field="Kepler_Name" header="Kepler Name">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" class="w-full text-sm" />
      </template>
    </Column>

    <Column field="Exoplanet_Archive_Disposition" header="Exoplanet Archive Disposition">
      <template #editor="{ data, field }">
        <InputText v-model="data[field]" class="w-full text-sm" />
      </template>
    </Column>

    <Column field="Orbital_Period_days" header="Orbital Period (days)">
      <template #editor="{ data, field }">
        <InputNumber
          v-model="data[field]"
          class="w-full"
          input-class="w-full text-sm"
          mode="decimal"
          :minFractionDigits="0"
          :maxFractionDigits="2"
        />
      </template>
    </Column>

    <Column field="Transit_Epoch_BKJD" header="Transit Epoch (BKJD)">
      <template #editor="{ data, field }">
        <InputNumber
          v-model="data[field]"
          class="w-full"
          input-class="w-full text-sm"
          mode="decimal"
        />
      </template>
    </Column>

    <Column field="Impact_Parameter" header="Impact Parameter">
      <template #editor="{ data, field }">
        <InputNumber
          v-model="data[field]"
          class="w-full"
          input-class="w-full text-sm"
          mode="decimal"
        />
      </template>
    </Column>

    <Column field="Transit_Duration_hrs" header="Transit Duration (hrs)">
      <template #editor="{ data, field }">
        <InputNumber
          v-model="data[field]"
          class="w-full"
          input-class="w-full text-sm"
          mode="decimal"
        />
      </template>
    </Column>
  </DataTable>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DataTable, Column } from 'primevue'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { KOIDataPoint } from '@/data/KOIDataPoint'

const editingRows = ref([])

const onCellEditComplete = (event: any) => {
  const { data, newValue, field } = event
  data[field] = newValue
}
</script>
