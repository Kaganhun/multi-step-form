<script setup lang="ts">
import { useFormStore, ADDON_PRICES } from '../../store/form'

const form = useFormStore()
const billing = () => form.plan?.billing ?? 'monthly'

function toggle(id: 'online' | 'storage' | 'profile') {
  form.toggleAddon(id)
}
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-2xl font-bold text-primary">Pick add-ons</h1>
      <p class="text-sm text-neutral-400">Add-ons help enhance your gaming experience.</p>
    </header>

    <div class="space-y-4">
      <label class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 hover:border-primary" :class="form.addons.find(a=>a.id==='online')?.selected ? 'border-primary bg-primary/5' : 'border-neutral-200 bg-white'">
        <div class="flex items-center gap-4">
          <input type="checkbox" class="h-4 w-4" :checked="form.addons.find(a=>a.id==='online')?.selected" @change="toggle('online')" />
          <div>
            <div class="font-medium text-primary">Online service</div>
            <div class="text-xs text-neutral-400">Access to multiplayer games</div>
          </div>
        </div>
        <div class="text-xs text-primary">+${{ ADDON_PRICES[billing()].online }}/{{ billing()==='monthly'?'mo':'yr' }}</div>
      </label>

      <label class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 hover:border-primary" :class="form.addons.find(a=>a.id==='storage')?.selected ? 'border-primary bg-primary/5' : 'border-neutral-200 bg-white'">
        <div class="flex items-center gap-4">
          <input type="checkbox" class="h-4 w-4" :checked="form.addons.find(a=>a.id==='storage')?.selected" @change="toggle('storage')" />
          <div>
            <div class="font-medium text-primary">Larger storage</div>
            <div class="text-xs text-neutral-400">Extra 1TB of cloud save</div>
          </div>
        </div>
        <div class="text-xs text-primary">+${{ ADDON_PRICES[billing()].storage }}/{{ billing()==='monthly'?'mo':'yr' }}</div>
      </label>

      <label class="flex cursor-pointer items-center justify-between gap-4 rounded-lg border p-4 hover:border-primary" :class="form.addons.find(a=>a.id==='profile')?.selected ? 'border-primary bg-primary/5' : 'border-neutral-200 bg-white'">
        <div class="flex items-center gap-4">
          <input type="checkbox" class="h-4 w-4" :checked="form.addons.find(a=>a.id==='profile')?.selected" @change="toggle('profile')" />
          <div>
            <div class="font-medium text-primary">Customizable profile</div>
            <div class="text-xs text-neutral-400">Custom theme on your profile</div>
          </div>
        </div>
        <div class="text-xs text-primary">+${{ ADDON_PRICES[billing()].profile }}/{{ billing()==='monthly'?'mo':'yr' }}</div>
      </label>
    </div>
  </div>
</template>


