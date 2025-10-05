<template>
  <div>
    <Dialog
      :visible="isVisible"
      @update:visible="closeModal"
      modal
      header="Upload your dataset"
      :style="{ width: '25rem' }"
    >
      <div class="flex flex-col gap-y-10">
        <FileUpload
          ref="fileupload"
          mode="basic"
          name="demo"
          @upload="onUpload"
          @select="onFileSelect"
          url="/api/upload"
          accept=".csv"
        />

        <div v-if="parsingFinished">
          <FloatLabel class="w-full md:w-56">
            <Select
              class="w-full"
              v-model="selectedColumn"
              :options="columnsToSelect"
              inputId="over_label"
              optionLabel="name"
            />
            <label for="over_label">Select class column</label>
          </FloatLabel>
        </div>

        <Button @click="handleUpload" v-if="canShowUploadButton" severity="info">Upload</Button>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { useDatasetStore } from '@/stores/dataset'
import { Dialog, FileUpload, Select, FloatLabel, Button } from 'primevue'
import { ref, computed } from 'vue'

const store = useDatasetStore()

/* 
Store the CSV file, and the dataset info
*/
const handleUpload = () => {
  store.setCurrentDataset({
    headers: columns.value,
    name: 'custom',
    targetColumn: selectedColumn.value?.name,
  })

  console.log(store.currentDataset)
  closeModal(false)
}

const parsingFinished = ref(false)
const fileupload = ref()

const selectedColumn = ref<{ name: string; code: string } | null>(null)
const columnsToSelect = computed(() =>
  columns.value.map((value) => {
    return {
      name: value,
      code: value,
    }
  }),
)

const canShowUploadButton = computed(() => {
  return selectedColumn.value != null
})

// The list of columns (headers) from the CSV
const columns = ref<string[]>([])

const parseCsv = (csvString: string): string[] => {
  const lines = csvString.split('\n').filter((line) => line.trim() !== '')

  if (lines.length === 0) return []

  // First line = headers
  const headers = lines[0] ? lines[0].split(',').map((h) => h.trim()) : []

  return headers
}

const onFileSelect = async (event: any) => {
  console.log('Loading data')
  const file = event.files[0]
  const text = await file.text()

  columns.value = parseCsv(text)
  console.log(columns.value)

  console.log('Data loaded')
  parsingFinished.value = true
}

const onUpload = () => {
  console.log('File uploaded')
}

defineProps<{
  isVisible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isVisible', value: boolean): void
}>()

const closeModal = (value: boolean) => {
  emit('update:isVisible', value)
}
</script>

<style scoped></style>
