import { defineStore } from 'pinia'

export type ToastType = 'success' | 'error' | 'info'

export interface ToastItem {
  id: string
  type: ToastType
  title?: string
  message: string
  timeoutMs?: number
}

export interface UiState {
  isLoading: boolean
  toasts: ToastItem[]
}

export const useUiStore = defineStore('ui', {
  state: (): UiState => ({
    isLoading: false,
    toasts: [],
  }),
  actions: {
    setLoading(value: boolean): void {
      this.isLoading = value
    },
    pushToast(toast: Omit<ToastItem, 'id'>): string {
      const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
      this.toasts.push({ id, ...toast })
      if (toast.timeoutMs && toast.timeoutMs > 0) {
        setTimeout(() => this.removeToast(id), toast.timeoutMs)
      }
      return id
    },
    removeToast(id: string): void {
      this.toasts = this.toasts.filter((t: ToastItem) => t.id !== id)
    },
    clearToasts(): void {
      this.toasts = []
    },
  },
})


