<script setup lang="ts">
import { useUiStore } from '../../store/ui'
import Toast from './Toast.vue'

const ui = useUiStore()

function dismiss(id: string) {
  ui.removeToast(id)
}
</script>

<template>
  <div class="pointer-events-none fixed inset-0 z-[100] flex items-start justify-end p-4 sm:p-6">
    <div class="pointer-events-none flex w-full max-w-md flex-col gap-3">
      <transition-group name="fade-slide" tag="div">
        <div v-for="t in ui.toasts" :key="t.id" class="pointer-events-auto">
          <Toast :id="t.id" :type="t.type" :title="t.title" :message="t.message">
            <template #actions>
              <button class="ml-2 text-xs text-neutral-500 hover:text-neutral-800" @click="dismiss(t.id)">Close</button>
            </template>
          </Toast>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active, .fade-slide-leave-active { transition: all .2s ease; }
.fade-slide-enter-from { opacity: 0; transform: translateY(-4px); }
.fade-slide-leave-to { opacity: 0; transform: translateY(-4px); }
</style>


