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

const form = useFormStore()
</script>

<template>
  <div class="min-h-full w-full bg-[#EEF5FF]" v-if="form.view === 'landing'">
    <Landing />
  </div>
  <div class="min-h-full w-full bg-[#EEF5FF]" v-else>
    <div class="mx-auto max-w-full p-0 sm:p-4 lg:max-w-6xl lg:p-10 xl:max-w-7xl">
      <div class="bg-white lg:rounded-2xl lg:p-8 lg:shadow-2xl lg:shadow-primary/10">
        <div class="grid grid-rows-[auto_1fr_auto] gap-0 lg:grid-cols-[320px_1fr] lg:grid-rows-[1fr_auto] lg:gap-6">
          <!-- Sidebar / Top Stepper -->
          <aside class="overflow-hidden rounded-xl md:rounded-2xl">
            <div class="relative h-40 bg-gradient-to-br from-accent to-[#6259FF] lg:h-full lg:min-h-[640px]">
              <div class="absolute inset-0 p-3 sm:p-4 lg:p-6">
                <Stepper />
              </div>
              <!-- decorative shapes bottom-left -->
              <div class="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-[#FFAF7E] opacity-90"></div>
              <div class="pointer-events-none absolute -bottom-10 left-40 h-40 w-40 rounded-tl-[48px] rounded-tr-[48px] rounded-bl-[160px] rounded-br-[160px] bg-[#F98F8F] opacity-90"></div>
            </div>
          </aside>

          <!-- Form Content -->
          <main class="relative -mt-10 sm:-mt-8 z-10 mx-3 sm:mx-4 rounded-xl bg-white p-5 sm:p-6 shadow lg:static lg:mx-0 lg:rounded-xl lg:p-10 lg:shadow-none">
            <component
              :is="
                form.step === 'personal' ? StepPersonal :
                form.step === 'plan' ? StepPlan :
                form.step === 'addons' ? StepAddons :
                form.step === 'summary' ? StepSummary :
                StepThankYou
              "
            />
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
  </div>
  
</template>

