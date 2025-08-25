<script setup lang="ts">
import { useFormStore } from '../store/form'
const form = useFormStore()
function start() {
  // Reset to beginning and switch to form view
  form.reset()
  form.view = 'form'
}
</script>

<template>
  <section class="relative isolate overflow-hidden bg-[#EEF5FF]">
    <img src="/src/assets/landing/shapes.svg" alt="" class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-60" />
    <div class="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:py-20 lg:flex lg:items-center lg:gap-10 lg:px-8 lg:py-28">
      <div class="mx-auto max-w-2xl text-center lg:mx-0 lg:flex-auto lg:text-left">
        <h1 class="text-4xl font-bold tracking-tight text-primary sm:text-5xl">
          Manage your subscription in minutes
        </h1>
        <p class="mt-6 text-base leading-7 text-neutral-600 sm:text-lg">
          Choose a plan, pick add-ons, and confirm. Designed with Vue 3, Pinia, and TailwindCSS.
        </p>
        <div class="mt-10 flex items-center justify-center gap-4 lg:justify-start">
          <button type="button" class="btn-accent" @click.prevent="start">Get Started</button>
          <a href="https://www.figma.com/design/ALsxPm3N3baoCFrjz6D0go/Multi-Step-Form?node-id=1-1932&t=xKyBFIUD0oF4JMwn-0" target="_blank" rel="noopener noreferrer" class="btn-secondary">View Design</a>
        </div>
      </div>
      <div class="mt-12 flex justify-center lg:mt-0 lg:flex-auto">
        <div class="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-card anim-glow">
          <img src="/src/assets/landing/hero-device.svg" alt="" class="anim-float" />
          <div class="pointer-events-none absolute -top-6 -left-6 h-16 w-16 rounded-full bg-accent/20 blur-xl"></div>
          <div class="pointer-events-none absolute -bottom-6 -right-6 h-16 w-16 rounded-full bg-[#F98F8F]/20 blur-xl"></div>
        </div>
      </div>
    </div>
  </section>
</template>


