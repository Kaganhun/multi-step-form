<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useThemeStore } from '../../store/theme'

const theme = useThemeStore()
const isDark = computed(() => theme.theme === 'dark')
onMounted(() => theme.init())
</script>

<template>
  <button
    class="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:hover:bg-neutral-800"
    @click="theme.toggle()"
    :aria-pressed="isDark"
  >
    <span v-if="!isDark">🌞</span>
    <span v-else>🌙</span>
    <span class="hidden sm:inline">{{ isDark ? 'Dark' : 'Light' }}</span>
  </button>
</template>


