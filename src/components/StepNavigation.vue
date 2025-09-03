<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore } from '../store/form'
import { useUiStore } from '../store/ui'
import Spinner from './ui/Spinner.vue'
import { validatePersonal, validatePlan, validateAddress } from '../utils/validation'

const form = useFormStore()
const ui = useUiStore()

const canGoBack = computed(() => form.currentStepIndex > 0)

async function onNext() {
  if (form.step === 'personal') {
    const errors = validatePersonal(form.personal)
    if (errors.name || errors.email || errors.phone) {
      // Emit an event that StepPersonal listens to, or set a local flag in store
      // For simplicity, StepPersonal handles validation display itself via store mutation below
      form.setPersonal({ ...form.personal })
      return
    }
  }
  if (form.step === 'plan') {
    const error = validatePlan(form.plan)
    if (error) return
  }
  if (form.step === 'addons') {
    // Require at least one address field to be started is not typical; we validate at summary instead.
  }
  if (form.step === 'summary') {
    const billingErr = validateAddress(form.address.billing)
    const shippingErr = form.address.sameAsBilling ? {} : validateAddress(form.address.shipping)
    const hasErrors = Object.keys(billingErr).length > 0 || Object.keys(shippingErr).length > 0
    if (hasErrors) {
      ui.pushToast({ type: 'error', title: 'Incomplete address', message: 'Please fill required address fields before confirming.' })
      return
    }
  }
  if (form.step !== 'summary') {
    form.goNext()
    return
  }

  // Submit
  try {
    ui.setLoading(true)
    await new Promise((res) => setTimeout(res, 1200))
    ui.pushToast({ type: 'success', title: 'All set!', message: 'Your subscription is confirmed.', timeoutMs: 3000 })
    form.goTo('thankyou')
  } catch (e) {
    ui.pushToast({ type: 'error', title: 'Submission failed', message: 'Please try again in a moment.' })
  } finally {
    ui.setLoading(false)
  }
}

function onBack() {
  form.goBack()
}
</script>

<template>
  <div class="flex items-center justify-between rounded-xl bg-white p-4 shadow md:bg-transparent md:p-0 md:shadow-none">
    <button class="btn-secondary" :disabled="ui.isLoading" v-if="canGoBack" @click="onBack">Go Back</button>
    <div class="ml-auto">
      <button v-if="form.step !== 'summary'" class="btn-accent disabled:opacity-60" :disabled="ui.isLoading" @click="onNext">
        <span v-if="ui.isLoading" class="inline-flex items-center gap-2"><Spinner :size="16" /> Loading...</span>
        <span v-else>Next Step</span>
      </button>
      <button v-else class="btn-accent disabled:opacity-60" :disabled="ui.isLoading" @click="onNext">
        <span v-if="ui.isLoading" class="inline-flex items-center gap-2"><Spinner :size="16" /> Submitting...</span>
        <span v-else>Confirm</span>
      </button>
    </div>
  </div>
</template>


