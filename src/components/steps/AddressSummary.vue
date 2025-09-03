<script setup lang="ts">
import { useFormStore } from '../../store/form'
const form = useFormStore()
</script>

<template>
  <div class="rounded-xl border p-4 text-sm">
    <h3 class="mb-2 text-base font-semibold text-primary">Address Summary</h3>
    <div class="grid gap-3 md:grid-cols-2">
      <div>
        <div class="font-medium">Billing</div>
        <div class="text-neutral-500">{{ form.address.billing.line1 }} {{ form.address.billing.line2 }}</div>
        <div class="text-neutral-500">{{ form.address.billing.district }} {{ form.address.billing.city }}</div>
        <div class="text-neutral-500">{{ form.address.billing.province }} {{ form.address.billing.postalCode }}</div>
        <div class="text-neutral-500">{{ form.address.billing.country }}</div>
      </div>
      <div>
        <div class="font-medium">Shipping</div>
        <div class="text-neutral-500">{{ form.address.shipping.line1 }} {{ form.address.shipping.line2 }}</div>
        <div class="text-neutral-500">{{ form.address.shipping.district }} {{ form.address.shipping.city }}</div>
        <div class="text-neutral-500">{{ form.address.shipping.province }} {{ form.address.shipping.postalCode }}</div>
        <div class="text-neutral-500">{{ form.address.shipping.country }}</div>
      </div>
    </div>
  </div>
</template>


