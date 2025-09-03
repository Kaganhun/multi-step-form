
<script setup lang="ts">
import Stepper from './components/Stepper.vue'
import StepNavigation from './components/StepNavigation.vue'
import StepPersonal from './components/steps/StepPersonal.vue'
import StepPlan from './components/steps/StepPlan.vue'
import StepAddons from './components/steps/StepAddons.vue'
import StepSummary from './components/steps/StepSummary.vue'
import StepThankYou from './components/steps/StepThankYou.vue'
import Landing from './components/Landing.vue'
import { useFormStore } from './store/form'
import ToastContainer from './components/ui/ToastContainer.vue'
import LoadingOverlay from './components/ui/LoadingOverlay.vue'
import ThemeToggle from './components/ui/ThemeToggle.vue'
import { computed } from 'vue'

const form = useFormStore()
const transitionName = computed(() => form.transitionDirection === 'forward' ? 'slide-fwd' : 'slide-back')
</script>

<template>
  <div class="min-h-full w-full bg-[#EEF5FF]" v-if="form.view === 'landing'">
    <Landing />
  </div>
  <div class="min-h-full w-full bg-[#EEF5FF]" v-else>
    <div class="mx-auto max-w-full p-0 sm:p-4 lg:max-w-6xl lg:p-10 xl:max-w-7xl">
      <div class="bg-white dark:bg-neutral-900 dark:text-neutral-100 lg:rounded-2xl lg:p-8 lg:shadow-2xl lg:shadow-primary/10">
        <div class="grid grid-rows-[auto_1fr_auto] gap-0 lg:grid-cols-[320px_1fr] lg:grid-rows-[1fr_auto] lg:gap-6">
          <!-- Sidebar / Top Stepper -->
          <aside class="overflow-hidden rounded-xl md:rounded-2xl">
            <div class="relative h-40 lg:h-full lg:min-h-[640px] bg-[url('/src/assets/sidebar.svg')] bg-contain bg-left-top bg-no-repeat">
              <div class="absolute inset-0 p-3 sm:p-4 lg:p-6">
                <div class="flex items-center justify-between">
                  <Stepper />
                </div>
              </div>
            </div>
          </aside>

          <!-- Form Content -->
          <main class="relative -mt-10 sm:-mt-8 z-10 mx-3 sm:mx-4 rounded-xl bg-white dark:bg-neutral-800 p-5 sm:p-6 shadow lg:static lg:mx-0 lg:rounded-xl lg:p-10 lg:shadow-none">
            <transition :name="transitionName" mode="out-in">
              <component
                :is="
                  form.step === 'personal' ? StepPersonal :
                  form.step === 'plan' ? StepPlan :
                  form.step === 'addons' ? StepAddons :
                  form.step === 'summary' ? StepSummary :
                  StepThankYou
                "
                :key="form.step"
              />
            </transition>
          </main>

          <!-- Navigation -->
          <footer class="sticky bottom-0 z-20 bg-white p-4 lg:static lg:col-span-2 lg:bg-transparent lg:p-0" v-if="form.step !== 'thankyou'">
            <div class="mx-3 sm:mx-4 lg:mx-0">
              <StepNavigation />
            </div>
          </footer>
        </div>
      </div>
    </div>
    <ToastContainer />
    <LoadingOverlay />
    <div class="fixed right-4 top-4 z-[110]"><ThemeToggle /></div>
  </div>
  
</template>

