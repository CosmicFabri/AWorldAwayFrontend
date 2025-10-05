<template>
  <div class="flex flex-col items-center gap-y-4 w-60">
    <div class="flex flex-row justify-center items-center gap-x-5">
      <h1 class="text-2xl font-semibold">Predict</h1>
      <ExecuteButton @prediction-done="handlePredictionDone" :method="selectedMethod?.code" />
    </div>
    <h2 class="text-xl font-semibold text-center">Input data</h2>
    <Select
      v-model="selectedMethod"
      input-id="input-method"
      :options="methods"
      optionLabel="name"
      :default-value="methods[1]"
      class="w-full"
      @change="emitMethodChange"
    />
    <FileUpload
      class="mx-auto"
      v-if="showFileUpload"
      @select="onFileSelect"
      ref="fileupload"
      mode="basic"
      name="demo"
      accept=".csv"
      auto
    />
  </div>
</template>

<script setup lang="ts">
import { FileUpload, Select } from 'primevue'
import type { TableRow, ColumnDef, DataResult } from '@/interfaces/DataTableInterfaces'
import ExecuteButton from './ExecuteButton.vue'
import { computed, ref } from 'vue'
import { useDatasetStore } from '@/stores/dataset'
import type { ClassificationResultResponse } from '@/interfaces/ClassificationResult.interface'

const handlePredictionDone = (value: ClassificationResultResponse) => {
  emit('predictionDone', value)
}

const store = useDatasetStore()
const fileupload = ref()

const parseCsv = (csvString: string): DataResult => {
  const lines = csvString.split('\n').filter((line) => line.trim() !== '')

  if (lines.length === 0) return { columns: [], data: [] }

  // First line = headers
  const headers = lines[0] ? lines[0].split(',').map((h) => h.trim()) : []
  const columns: ColumnDef[] = headers.map((header) => ({ field: header, header }))

  // Remaining lines = rows
  const data: TableRow[] = lines.slice(1).map((line) => {
    const values = line.split(',').map((v) => v.trim())
    const row: TableRow = {}
    headers.forEach((header, index) => {
      row[header] = values[index] ?? ''
    })
    return row
  })

  return { columns, data }
}

const onFileSelect = async (event: any) => {
  console.log('Loading data')

  const file = event.files[0]
  console.log(file)
  const text = await file.text()

  const { columns, data } = parseCsv(text)

  const result: DataResult = {
    columns,
    data,
  }

  console.log('Data loaded')

  emit('data-uploaded', result)

  // Save file in the store
  store.trainingDatasetCSV = file
}

const emit = defineEmits<{
  (e: 'method-changed', value: string): void
  (e: 'data-uploaded', value: DataResult): void
  (e: 'predictionDone', value: ClassificationResultResponse): void
}>()

const selectedMethod = ref<{ name: string; code: string } | null>(null)

const methods = ref([
  { name: 'Upload file', code: 'File' },
  { name: 'Enter manually', code: 'Manually' },
])

const showFileUpload = computed(() => selectedMethod.value?.name === 'Upload file')

const emitMethodChange = () => {
  if (selectedMethod.value) {
    emit('method-changed', selectedMethod.value.code)
  }
}
</script>

<style scoped></style>
