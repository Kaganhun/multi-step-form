import { defineStore } from 'pinia'

export type Theme = 'light' | 'dark'

function applyTheme(theme: Theme): void {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
}

export const useThemeStore = defineStore('theme', {
  state: () => ({ theme: 'light' as Theme }),
  actions: {
    init(): void {
      const saved = (localStorage.getItem('theme') as Theme | null)
      const preferred: Theme = saved ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      this.theme = preferred
      applyTheme(preferred)
    },
    toggle(): void {
      this.set(this.theme === 'dark' ? 'light' : 'dark')
    },
    set(theme: Theme): void {
      this.theme = theme
      localStorage.setItem('theme', theme)
      applyTheme(theme)
    },
  },
})


