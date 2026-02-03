import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function extractTags(content: string): string[] {
  const tagRegex = /#(\w+)/g
  const tags = content.match(tagRegex)
  return tags ? [...new Set(tags.map(tag => tag.slice(1).toLowerCase()))] : []
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
