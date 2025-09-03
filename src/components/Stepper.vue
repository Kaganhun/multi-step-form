<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore, type Step } from '../store/form'

const form = useFormStore()
const steps = [
  { key: 'personal', label: 'YOUR INFO' },
  { key: 'plan', label: 'SELECT PLAN' },
  { key: 'addons', label: 'ADD-ONS' },
  { key: 'summary', label: 'SUMMARY' },
  { key: 'thankyou', label: 'DONE' },
] as const

const activeIndex = computed(() => steps.findIndex((s) => s.key === form.step))

function goTo(step: Step, index: number) {
  if (index <= activeIndex.value) {
    form.goTo(step)
  }
}
</script>

<template>
  <!-- Mobile: top horizontal with progress bar -->
  <div class="lg:hidden">
    <div class="px-3 pt-3">
      <div class="h-1.5 w-full rounded-full bg-white/30">
        <div class="h-full rounded-full bg-white transition-all" :style="{ width: Math.min(100, Math.max(0, (activeIndex+1)/(steps.length-1)*100)) + '%' }"></div>
      </div>
    </div>
    <div class="flex items-center justify-start gap-2 sm:gap-3 p-2 text-white">
      <template v-for="(s, i) in steps" :key="s.key">
        <button
          type="button"
          class="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border text-xs sm:text-sm transition-colors"
          :class="i === activeIndex ? 'bg-white text-accent border-white shadow' : 'border-white text-white/90 hover:bg-white/80'"
          @click="goTo(s.key as Step, i)"
        >
          {{ i + 1 }}
        </button>
      </template>
    </div>
  </div>

  <!-- Desktop: sidebar -->
  <div class="hidden lg:block">
    <div class="sticky top-8 rounded-xl bg-transparent p-0 text-white">
      <div class="mb-6 h-1.5 w-full rounded-full bg-white/25">
        <div class="h-full rounded-full bg-white transition-all" :style="{ width: Math.min(100, Math.max(0, (activeIndex+1)/(steps.length-1)*100)) + '%' }"></div>
      </div>
      <nav class="flex flex-col gap-6">
        <template v-for="(s, i) in steps" :key="s.key">
          <div class="flex items-center gap-4">
            <button
              type="button"
              class="flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors"
              :class="i === activeIndex ? 'bg-white text-accent border-white shadow' : 'border-white text-white hover:bg-white/10'"
              @click="goTo(s.key as Step, i)"
            >
              {{ i + 1 }}
            </button>
            <div class="hidden md:block">
              <div class="text-xs uppercase opacity-80">Step {{ i + 1 }}</div>
              <div class="text-sm font-semibold tracking-wide">{{ s.label }}</div>
            </div>
          </div>
        </template>
      </nav>
    </div>
  </div>
</template>


