<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore, PLAN_PRICES, type Plan } from '../../store/form'

const form = useFormStore()

const billing = computed({
  get: () => form.plan?.billing ?? 'monthly',
  set: (val: Plan['billing']) => {
    const current = form.plan ?? { id: 'arcade', billing: 'monthly' as const }
    form.setPlan({ ...current, billing: val })
  },
})

const plans: Array<{ id: Plan['id']; title: string; icon?: string }> = [
  { id: 'arcade', title: 'Arcade', icon: new URL('../../assets/icons/joystick.svg', import.meta.url).href },
  { id: 'advanced', title: 'Advanced', icon: new URL('../../assets/icons/controller.svg', import.meta.url).href },
  { id: 'pro', title: 'Pro', icon: new URL('../../assets/icons/trophy.svg', import.meta.url).href },
]

function selectPlan(id: Plan['id']) {
  form.setPlan({ id, billing: billing.value })
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-primary">Select your plan</h1>
      <p class="text-sm text-neutral-400">You have the option of monthly or yearly billing.</p>
    </header>

    <div class="grid gap-3 sm:gap-4 md:grid-cols-3">
      <button
        v-for="p in plans"
        :key="p.id"
        type="button"
        v-tilt="{ max: 8, scale: 1.02 }"
        class="flex items-center gap-3 sm:gap-4 rounded-lg border p-4 text-left transition-shadow hover:border-primary hover:shadow-card focus:outline-none focus:ring-2 focus:ring-primary/20 md:block"
        :class="form.plan?.id === p.id ? 'border-primary bg-primary/5' : 'border-neutral-200 bg-white'"
        @click="selectPlan(p.id)"
      >
        <!-- icon for Arcade, placeholder for others -->
        <div class="h-10 w-10 sm:h-12 sm:w-12 shrink-0 rounded-md md:mb-8 bg-sky/40 overflow-hidden flex items-center justify-center">
          <img v-if="p.icon" :src="p.icon" alt="" class="h-10 w-10 object-contain" />
        </div>
        <div>
          <div class="font-semibold text-primary">{{ p.title }}</div>
          <div class="text-sm text-neutral-400">
            ${{ PLAN_PRICES[billing][p.id] }}/{{ billing === 'monthly' ? 'mo' : 'yr' }}
          </div>
        </div>
      </button>
    </div>

    <div class="flex items-center justify-center gap-3 rounded-md bg-neutral-100 p-3">
      <span :class="['text-sm', billing === 'monthly' ? 'text-primary font-medium' : 'text-neutral-400']">Monthly</span>
      <button
        class="relative h-6 w-12 rounded-full bg-primary/20 transition-colors active:scale-[0.98]"
        type="button"
        @click="billing = billing === 'monthly' ? 'yearly' : 'monthly'"
      >
        <span
          class="absolute top-1 h-4 w-4 rounded-full bg-primary transition-all duration-200"
          :class="billing === 'monthly' ? 'left-1' : 'left-7'"
        />
      </button>
      <span :class="['text-sm', billing === 'yearly' ? 'text-primary font-medium' : 'text-neutral-400']">Yearly</span>
    </div>

    <p v-if="!form.plan" class="error-text">Please select a plan</p>
  </div>
</template>


