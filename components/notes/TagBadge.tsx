'use client'

import Link from 'next/link'
import type { Tag } from '@/types'

interface TagBadgeProps {
  tag: Tag
  clickable?: boolean
}

export function TagBadge({ tag, clickable = true }: TagBadgeProps) {
  const badge = (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
      #{tag.name}
    </span>
  )

  if (!clickable) {
    return badge
  }

  return (
    <Link href={`/tags/${tag.name}`} onClick={(e) => e.stopPropagation()}>
      {badge}
    </Link>
  )
}
