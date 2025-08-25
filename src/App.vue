<script setup lang="ts">
import Stepper from './components/Stepper.vue'
import StepNavigation from './components/StepNavigation.vue'
import StepPersonal from './components/steps/StepPersonal.vue'
import StepPlan from './components/steps/StepPlan.vue'
import StepAddons from './components/steps/StepAddons.vue'
import StepSummary from './components/steps/StepSummary.vue'
import StepThankYou from './components/steps/StepThankYou.vue'
import { useFormStore } from './store/form'

const form = useFormStore()
</script>

<template>
  <div class="min-h-full w-full bg-[#EEF5FF]">
    <div class="mx-auto max-w-6xl p-0 md:p-10">
      <div class="bg-white md:rounded-2xl md:p-8 md:shadow-2xl md:shadow-primary/10">
        <div class="grid grid-rows-[auto_1fr_auto] gap-0 md:grid-cols-[320px_1fr] md:grid-rows-[1fr_auto] md:gap-6">
          <!-- Sidebar / Top Stepper -->
          <aside class="overflow-hidden rounded-xl md:rounded-2xl">
            <div class="relative h-40 bg-gradient-to-br from-accent to-[#6259FF] md:h-full">
              <div class="absolute inset-0 p-4 md:p-6">
                <Stepper />
              </div>
              <!-- decorative shapes bottom-left -->
              <div class="pointer-events-none absolute -bottom-16 -left-12 h-48 w-48 rounded-full bg-[#FFAF7E] opacity-90"></div>
              <div class="pointer-events-none absolute -bottom-10 left-40 h-40 w-40 rounded-tl-[48px] rounded-tr-[48px] rounded-bl-[160px] rounded-br-[160px] bg-[#F98F8F] opacity-90"></div>
            </div>
          </aside>

          <!-- Form Content -->
          <main class="relative -mt-8 z-10 mx-4 rounded-xl bg-white p-6 shadow md:static md:mx-0 md:rounded-xl md:p-10 md:shadow-none">
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
          <footer class="sticky bottom-0 z-20 bg-white p-4 md:static md:col-span-2 md:bg-transparent md:p-0" v-if="form.step !== 'thankyou'">
            <div class="mx-4 md:mx-0">
              <StepNavigation />
            </div>
          </footer>
        </div>
      </div>
    </div>
  </div>
  
</template>

