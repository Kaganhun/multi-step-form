<script setup lang="ts">
import { computed } from 'vue'
import { useUiStore } from '../../store/ui'
import Spinner from './Spinner.vue'

const ui = useUiStore()
const visible = computed(() => ui.isLoading)
</script>

<template>
  <transition name="fade" appear>
    <div v-if="visible" class="fixed inset-0 z-50 grid place-items-center bg-black/30 backdrop-blur-sm">
      <div class="flex items-center gap-3 rounded-xl bg-neutral-900/90 px-4 py-3 text-white shadow-lg">
        <Spinner :size="18" />
        <span class="text-sm">Processing...</span>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .15s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>


