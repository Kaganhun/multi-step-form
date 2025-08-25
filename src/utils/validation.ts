import type { PersonalInfo, Plan } from '../store/form'

function isValidEmail(email: string): boolean {
  // Robust but pragmatic email check
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email.trim())
}

function isValidPhone(phone: string): boolean {
  // Accept digits, spaces, dashes, parentheses, and optional leading +
  // Require 10-15 digits total after stripping non-digits
  const digits = phone.replace(/[^0-9]/g, '')
  if (digits.length < 10 || digits.length > 15) return false
  // Optional: basic E.164 pattern when starting with +
  const e164Like = /^\+?[1-9]\d{7,14}$/
  return e164Like.test(phone.replace(/[\s()-]/g, ''))
}

export function validatePersonal(info: PersonalInfo): Record<keyof PersonalInfo, string> {
  const errors: Record<keyof PersonalInfo, string> = { name: '', email: '', phone: '' }
  if (!info.name.trim()) errors.name = 'Name is required'
  if (!info.email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(info.email)) {
    errors.email = 'Enter a valid email (e.g. name@domain.com)'
  }
  if (!info.phone.trim()) {
    errors.phone = 'Phone is required'
  } else if (!isValidPhone(info.phone)) {
    errors.phone = 'Enter a valid phone number (10-15 digits)'
  }
  return errors
}

export function validatePlan(plan: Plan | null): string {
  if (!plan) return 'Please select a plan'
  return ''
}


