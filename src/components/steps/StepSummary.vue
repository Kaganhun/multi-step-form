<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore, PLAN_PRICES, ADDON_PRICES } from '../../store/form'
import AddressDetails from '../AddressDetails.vue'
import AddressSummary from './AddressSummary.vue'

const form = useFormStore()
const billing = computed(() => form.plan?.billing ?? 'monthly')

const selectedAddons = computed(() => form.addons.filter(a => a.selected))
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-primary">Finishing up</h1>
      <p class="mt-1 text-sm text-neutral-400">Double-check everything looks OK before confirming.</p>
    </header>

    <div class="rounded-xl bg-neutral-100 p-5">
      <div class="flex items-center justify-between border-b pb-3">
        <div>
          <div class="font-semibold text-primary">
            {{ form.plan?.id?.toUpperCase() }} ({{ billing==='monthly' ? 'Monthly' : 'Yearly' }})
          </div>
          <button class="btn-secondary text-xs underline" @click="form.goTo('plan')">Change</button>
        </div>
        <div class="text-sm font-semibold text-primary">
          ${{ form.plan ? PLAN_PRICES[billing][form.plan.id] : 0 }}/{{ billing==='monthly'?'mo':'yr' }}
        </div>
      </div>
      <div class="mt-3 space-y-2">
        <div v-for="a in selectedAddons" :key="a.id" class="flex items-center justify-between text-sm">
          <span class="text-neutral-400">{{ a.id === 'online' ? 'Online service' : a.id === 'storage' ? 'Larger storage' : 'Customizable profile' }}</span>
          <span class="text-primary">+${{ ADDON_PRICES[billing][a.id] }}/{{ billing==='monthly'?'mo':'yr' }}</span>
        </div>
      </div>
    </div>

    <div class="flex items-center justify-between px-1 md:px-4">
      <span class="text-sm text-neutral-400">Total (per {{ billing==='monthly'?'month':'year' }})</span>
      <span class="text-2xl font-extrabold text-accent">+${{ form.totalPrice }}/{{ billing==='monthly'?'mo':'yr' }}</span>
    </div>

    <div class="pt-4 border-t">
      <AddressDetails title="Address Details" />
    </div>

    <AddressSummary />
  </div>
</template>


