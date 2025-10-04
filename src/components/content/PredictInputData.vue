<template>
  <div class="flex flex-col gap-y-4 w-60">
    <div class="flex flex-row justify-center items-center gap-x-5">
      <h1 class="text-2xl font-semibold">Predict</h1>
      <ExecuteButton />
    </div>
    <h2 class="text-xl font-semibold text-center">Input data</h2>
    <Select
      v-model="selectedMethod"
      :options="methods"
      optionLabel="name"
      placeholder="Select how to input data"
      class="w-full"
    />

    <FileUpload
      v-if="showFileUpload"
      ref="fileupload"
      mode="basic"
      name="demo"
      url="/api/upload"
      accept=".csv"
    />
    <!-- <Button label="Upload file" severity="info" /> -->
    <!-- <Button label="Enter data" severity="info" /> -->
  </div>
</template>

<script setup lang="ts">
import { FileUpload, Select } from 'primevue'
import ExecuteButton from './ExecuteButton.vue'
import { computed, ref } from 'vue'

const selectedMethod = ref()
// const selectedMethodName = computed(() => selectedMethod.name)

const showFileUpload = computed(() => {
  return selectedMethod.value?.name === 'Upload file'
})

const methods = ref([
  { name: 'Upload file', code: 'File' },
  { name: 'Enter manually', code: 'Manually' },
])
</script>

<style scoped></style>
