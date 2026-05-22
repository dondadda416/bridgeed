import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Format a number as CAD currency */
export function formatCAD(cents: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: 0,
  }).format(cents / 100)
}

/** Map a numeric grade to a letter grade pill colour class */
export function gradeColour(pct: number): string {
  if (pct >= 80) return 'grade-a'
  if (pct >= 70) return 'grade-b'
  if (pct >= 60) return 'grade-c'
  return 'grade-d'
}

/** Format a Date to a human-readable short date */
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}
