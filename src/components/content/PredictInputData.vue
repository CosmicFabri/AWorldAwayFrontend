<template>
  <div class="flex flex-col gap-y-4 w-60">
    <div class="flex flex-row justify-center items-center gap-x-5">
      <h1 class="text-2xl font-semibold">Predict</h1>
      <ExecuteButton />
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
      v-if="showFileUpload"
      ref="fileupload"
      mode="basic"
      name="demo"
      url="/api/upload"
      accept=".csv"
    />
  </div>
</template>

<script setup lang="ts">
import { FileUpload, Select } from 'primevue'
import ExecuteButton from './ExecuteButton.vue'
import { computed, ref } from 'vue'

const emit = defineEmits<{
  (e: 'method-changed', value: string): void
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
