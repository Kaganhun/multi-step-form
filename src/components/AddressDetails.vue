<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useFormStore } from '../store/form'
import { useLocations } from '../composables/useLocations'

defineProps<{ title?: string }>()
const form = useFormStore()
const { trProvinces, trDistricts, fetchTrProvinces, fetchTrDistricts, validatePostalCode } = useLocations()

const postalValid = ref<boolean | null>(null)

onMounted(async () => { await fetchTrProvinces() })

watch(() => form.address.billing.province, (pid) => {
  if (pid) fetchTrDistricts(Number(pid))
})

async function onPostalBlur(part: 'billing' | 'shipping') {
  const a = form.address[part]
  postalValid.value = await validatePostalCode(a.postalCode)
}

function onSameAsBillingToggle() {
  form.setSameAsBilling(!form.address.sameAsBilling)
}
</script>

<template>
  <section class="space-y-4">
    <header>
      <h2 class="text-xl font-semibold text-primary">{{ title ?? 'Address Details' }}</h2>
      <p class="text-sm text-neutral-400">Provide your billing and shipping address. You can copy billing to shipping.</p>
    </header>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Billing Address -->
      <div class="space-y-4">
        <h3 class="text-sm font-bold uppercase tracking-wide text-neutral-600">Billing Address</h3>
        <input type="hidden" v-model="form.address.billing.country" />
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class="text-sm font-medium">Province (TR)</label>
            <select class="input" v-model="form.address.billing.province">
              <option value="" disabled>Select province</option>
              <option v-for="p in trProvinces" :key="p.id" :value="p.id">{{ p.name }}</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">District (TR)</label>
            <select class="input" v-model="form.address.billing.district">
              <option value="" disabled>Select district</option>
              <option v-for="d in trDistricts[Number(form.address.billing.province)||0]" :key="d?.id" :value="d?.name">{{ d?.name }}</option>
            </select>
          </div>
        </div>
        <div>
          <label class="text-sm font-medium">City</label>
          <input class="input" v-model="form.address.billing.city" placeholder="City" />
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class="text-sm font-medium">Address Line 1</label>
            <input class="input" v-model="form.address.billing.line1" placeholder="Street, number" />
          </div>
          <div>
            <label class="text-sm font-medium">Address Line 2</label>
            <input class="input" v-model="form.address.billing.line2" placeholder="Apt, suite (optional)" />
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-2">
          <div>
            <label class="text-sm font-medium">Postal Code</label>
            <input class="input" v-model="form.address.billing.postalCode" @blur="onPostalBlur('billing')" placeholder="e.g., 34000" />
            <p v-if="postalValid === false" class="error-text">Invalid postal code</p>
          </div>
          <div>
            <label class="text-sm font-medium">Address Type</label>
            <select class="input" v-model="form.address.billing.type">
              <option value="home">Home</option>
              <option value="work">Work</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Shipping Address -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold uppercase tracking-wide text-neutral-600">Shipping Address</h3>
          <label class="inline-flex items-center gap-2 text-sm">
            <input type="checkbox" :checked="form.address.sameAsBilling" @change="onSameAsBillingToggle" />
            Same as billing address
          </label>
        </div>
        <div class="opacity-100" :class="{ 'pointer-events-none opacity-60': form.address.sameAsBilling }">
          <input type="hidden" v-model="form.address.shipping.country" />
          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class="text-sm font-medium">Province (TR)</label>
              <select class="input" v-model="form.address.shipping.province">
                <option value="" disabled>Select province</option>
                <option v-for="p in trProvinces" :key="p.id" :value="p.id">{{ p.name }}</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium">District (TR)</label>
              <select class="input" v-model="form.address.shipping.district">
                <option value="" disabled>Select district</option>
                <option v-for="d in trDistricts[Number(form.address.shipping.province)||0]" :key="d?.id" :value="d?.name">{{ d?.name }}</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-sm font-medium">City</label>
            <input class="input" v-model="form.address.shipping.city" placeholder="City" />
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class="text-sm font-medium">Address Line 1</label>
              <input class="input" v-model="form.address.shipping.line1" placeholder="Street, number" />
            </div>
            <div>
              <label class="text-sm font-medium">Address Line 2</label>
              <input class="input" v-model="form.address.shipping.line2" placeholder="Apt, suite (optional)" />
            </div>
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <div>
              <label class="text-sm font-medium">Postal Code</label>
              <input class="input" v-model="form.address.shipping.postalCode" @blur="onPostalBlur('shipping')" placeholder="e.g., 34000" />
            </div>
            <div>
              <label class="text-sm font-medium">Address Type</label>
              <select class="input" v-model="form.address.shipping.type">
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


