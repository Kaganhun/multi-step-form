<script setup lang="ts">
import { computed } from 'vue'
import { useFormStore } from '../store/form'
import { validatePersonal, validatePlan } from '../utils/validation'

const form = useFormStore()

const canGoBack = computed(() => form.currentStepIndex > 0)

function onNext() {
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
  form.goNext()
}

function onBack() {
  form.goBack()
}
</script>

<template>
  <div class="flex items-center justify-between rounded-xl bg-white p-4 shadow md:bg-transparent md:p-0 md:shadow-none">
    <button class="btn-secondary" v-if="canGoBack" @click="onBack">Go Back</button>
    <div class="ml-auto">
      <button v-if="form.step !== 'summary'" class="btn-accent" @click="onNext">Next Step</button>
      <button v-else class="btn-accent" @click="form.goTo('thankyou')">Confirm</button>
    </div>
  </div>
</template>


