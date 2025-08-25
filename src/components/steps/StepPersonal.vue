<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useFormStore } from '../../store/form'
import { validatePersonal } from '../../utils/validation'

const form = useFormStore()
const local = reactive({ ...form.personal })
const errors = ref({ name: '', email: '', phone: '' })

function validate() {
  errors.value = validatePersonal(local)
  return !(errors.value.name || errors.value.email || errors.value.phone)
}

watch(local, () => {
  // Live update store so summary reflects changes and nav validation works
  form.setPersonal(local)
  validate()
}, { deep: true })

</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-3xl font-bold text-primary">Personal info</h1>
      <p class="mt-1 text-sm text-neutral-400">Please provide your name, email address, and phone number.</p>
    </header>

    <div class="grid gap-5">
      <div>
        <label class="mb-2 block text-sm font-medium">Name</label>
        <input class="input" v-model="local.name" placeholder="e.g. Stephen King" />
        <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium">Email Address</label>
        <input class="input" v-model="local.email" placeholder="e.g. stephen@king.com" />
        <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
      </div>
      <div>
        <label class="mb-2 block text-sm font-medium">Phone Number</label>
        <input class="input" v-model="local.phone" placeholder="e.g. +1 234 567 890" />
        <p v-if="errors.phone" class="error-text">{{ errors.phone }}</p>
      </div>
    </div>
  </div>
</template>


