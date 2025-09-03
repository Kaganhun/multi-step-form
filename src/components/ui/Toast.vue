<script setup lang="ts">
import { computed } from 'vue'

type ToastType = 'success' | 'error' | 'info'

const props = defineProps<{
  id: string
  type: ToastType
  title?: string
  message: string
}>()

const icon = computed(() => {
  if (props.type === 'success') return '✅'
  if (props.type === 'error') return '⚠️'
  return 'ℹ️'
})
</script>

<template>
  <div
    class="pointer-events-auto flex w-full min-w-[280px] max-w-sm items-start gap-3 rounded-xl bg-white p-4 shadow-lg ring-1 ring-black/5"
    :class="{
      'border-l-4 border-green-500': type === 'success',
      'border-l-4 border-red-500': type === 'error',
      'border-l-4 border-blue-500': type === 'info',
    }"
  >
    <div class="text-xl">{{ icon }}</div>
    <div class="flex-1">
      <p v-if="title" class="text-sm font-semibold text-neutral-900">{{ title }}</p>
      <p class="mt-0.5 text-sm text-neutral-700">{{ message }}</p>
    </div>
    <slot name="actions" />
  </div>
</template>


