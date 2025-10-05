<template>
  <Button @click="handleClick" class="w-13 h-13 p-0" rounded>
    <i class="pi pi-play py-2" style="font-size: 1.2rem; font-weight: bold" />
  </Button>
</template>

<script setup lang="ts">
import { Button } from 'primevue'
import { exoplanetsApi } from '@/api/axios'
import { useDatasetStore } from '@/stores/dataset'

const store = useDatasetStore()

const props = defineProps<{
  // File or Manually
  method?: string
}>()

const handleClick = async () => {
  try {
    if (props.method === 'File') {
      foo()
    }
  } catch (error) {
    console.log(error)
  }
}

const foo = async () => {}
</script>
