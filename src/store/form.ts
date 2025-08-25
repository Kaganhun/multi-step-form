import { defineStore } from 'pinia'

export type Step = 'personal' | 'plan' | 'addons' | 'summary' | 'thankyou'

export interface PersonalInfo {
  name: string
  email: string
  phone: string
}

export interface Plan {
  id: 'arcade' | 'advanced' | 'pro'
  billing: 'monthly' | 'yearly'
}

export interface Addon {
  id: 'online' | 'storage' | 'profile'
  selected: boolean
}

export interface FormState {
  step: Step
  personal: PersonalInfo
  plan: Plan | null
  addons: Addon[]
}

export const PLAN_PRICES = {
  monthly: { arcade: 9, advanced: 12, pro: 15 },
  yearly: { arcade: 90, advanced: 120, pro: 150 },
} as const

export const ADDON_PRICES = {
  monthly: { online: 1, storage: 2, profile: 2 },
  yearly: { online: 10, storage: 20, profile: 20 },
} as const

const steps: Step[] = ['personal', 'plan', 'addons', 'summary', 'thankyou']

export const useFormStore = defineStore('form', {
  state: (): FormState => ({
    step: 'personal',
    personal: { name: '', email: '', phone: '' },
    plan: null,
    addons: [
      { id: 'online', selected: false },
      { id: 'storage', selected: false },
      { id: 'profile', selected: false },
    ],
  }),
  getters: {
    currentStepIndex: (state) => steps.indexOf(state.step),
    isLastStep(): boolean {
      return this.currentStepIndex === steps.length - 1
    },
    totalPrice(state): number {
      const billing = state.plan?.billing ?? 'monthly'
      const planPrice = state.plan ? PLAN_PRICES[billing][state.plan.id] : 0
      const addonsPrice = state.addons
        .filter((a) => a.selected)
        .reduce((sum, a) => sum + ADDON_PRICES[billing][a.id], 0)
      return planPrice + addonsPrice
    },
  },
  actions: {
    goNext(): void {
      const nextIndex = Math.min(this.currentStepIndex + 1, steps.length - 1)
      this.step = steps[nextIndex]
    },
    goBack(): void {
      const prevIndex = Math.max(this.currentStepIndex - 1, 0)
      this.step = steps[prevIndex]
    },
    goTo(step: Step): void {
      this.step = step
    },
    setPersonal(payload: PersonalInfo): void {
      this.personal = { ...payload }
    },
    setPlan(payload: Plan): void {
      this.plan = { ...payload }
    },
    toggleAddon(id: Addon['id']): void {
      this.addons = this.addons.map((a) => (a.id === id ? { ...a, selected: !a.selected } : a))
    },
    reset(): void {
      this.step = 'personal'
      this.personal = { name: '', email: '', phone: '' }
      this.plan = null
      this.addons = this.addons.map((a) => ({ ...a, selected: false }))
    },
  },
})


