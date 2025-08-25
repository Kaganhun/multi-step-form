<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore, type Step } from '../store/form'

const form = useFormStore()
const steps = [
  { key: 'personal', label: 'Your Info' },
  { key: 'plan', label: 'Select Plan' },
  { key: 'addons', label: 'Add-ons' },
  { key: 'summary', label: 'Summary' },
  { key: 'thankyou', label: 'Done' },
] as const

const activeIndex = computed(() => steps.findIndex((s) => s.key === form.step))

function goTo(step: Step, index: number) {
  if (index <= activeIndex.value) {
    form.goTo(step)
  }
}
</script>

<template>
  <!-- Mobile: top horizontal -->
  <div class="md:hidden">
    <div class="flex items-center justify-start gap-3 p-2 text-white">
      <template v-for="(s, i) in steps" :key="s.key">
        <button
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-colors"
          :class="i === activeIndex ? 'bg-white text-accent border-white shadow' : 'border-white text-white/90 hover:bg-white/80'"
          @click="goTo(s.key as Step, i)"
        >
          {{ i + 1 }}
        </button>
      </template>
    </div>
  </div>

  <!-- Desktop: sidebar -->
  <div class="hidden md:block">
    <div class="sticky top-8 rounded-xl bg-transparent p-0 text-white">
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


