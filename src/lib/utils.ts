import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse a date string in multiple common formats.
 * Prefers explicit ISO (YYYY-MM-DD) and BR Forms dates (DD/MM/YYYY).
 * Avoids `new Date('12/03/2026')` which engines treat as MM/DD and corrupt BR data.
 */
export function parseDate(value: string): Date | null {
  if (!value || !value.trim()) return null

  const trimmed = value.trim()

  // Explicit ISO-8601 / RFC-like: 2026-03-12 or 2026-03-12T14:30:00
  const isoMatch = trimmed.match(
    /^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2})(?::(\d{2}))?(?:\.\d+)?(?:Z|[+-]\d{2}:?\d{2})?)?$/
  )
  if (isoMatch) {
    const [, year, month, day, hours, minutes, seconds] = isoMatch
    const d = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours || '0', 10),
      parseInt(minutes || '0', 10),
      parseInt(seconds || '0', 10)
    )
    if (!isNaN(d.getTime())) return d
  }

  // YYYY/MM/DD or YYYY.MM.DD
  const ymdMatch = trimmed.match(
    /^(\d{4})[/\.](\d{1,2})[/\.](\d{1,2})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
  )
  if (ymdMatch) {
    const [, year, month, day, hours, minutes, seconds] = ymdMatch
    const d = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours || '0', 10),
      parseInt(minutes || '0', 10),
      parseInt(seconds || '0', 10)
    )
    if (!isNaN(d.getTime())) return d
  }

  // BR / Google Forms default: DD/MM/YYYY [HH:MM:SS]
  const brDateTimeMatch = trimmed.match(
    /^(\d{1,2})[/\-.](\d{1,2})[/\-.](\d{4})(?:\s+(\d{1,2}):(\d{2})(?::(\d{2}))?)?$/
  )
  if (brDateTimeMatch) {
    const [, day, month, year, hours, minutes, seconds] = brDateTimeMatch
    const d = new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      parseInt(hours || '0', 10),
      parseInt(minutes || '0', 10),
      parseInt(seconds || '0', 10)
    )
    // Reject impossible calendar values (e.g. day 32 rolled over)
    if (
      !isNaN(d.getTime()) &&
      d.getFullYear() === parseInt(year, 10) &&
      d.getMonth() === parseInt(month, 10) - 1 &&
      d.getDate() === parseInt(day, 10)
    ) {
      return d
    }
  }

  return null
}

/**
 * Format a date as DD/MM/YYYY
 */
export function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

/**
 * Format a date as YYYY-MM-DD for chart grouping
 */
export function formatDateISO(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

/**
 * Format a date as "DD MMM" for chart labels (e.g., "15 Mar")
 */
export function formatDateShort(dateStr: string): string {
  const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
  const [, month, day] = dateStr.split('-')
  return `${parseInt(day)} ${months[parseInt(month) - 1]}`
}

/**
 * Format percentage
 */
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`
}

/**
 * Generate a simple unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Capitalize first letter of a string
 */
export function capitalize(str: string): string {
  if (!str) return str
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/**
 * Check if a date is within the current week (last 7 days)
 */
export function isThisWeek(date: Date): boolean {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  return date >= weekAgo && date <= now
}
