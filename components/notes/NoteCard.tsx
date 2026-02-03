'use client'

import Link from 'next/link'
import { formatDate } from '@/lib/utils'
import { TagBadge } from './TagBadge'
import { Lock, Globe } from 'lucide-react'
import type { Note } from '@/types'

interface NoteCardProps {
  note: Note
}

export function NoteCard({ note }: NoteCardProps) {
  const preview = note.content.slice(0, 150) + (note.content.length > 150 ? '...' : '')

  return (
    <Link href={`/notes/${note.id}`}>
      <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg font-semibold line-clamp-1">{note.title}</h3>
          {note.isPublic ? (
            <Globe className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          ) : (
            <Lock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          )}
        </div>

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {preview}
        </p>

        {note.tags && note.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {note.tags.slice(0, 3).map((tag) => (
              <TagBadge key={tag.id} tag={tag} />
            ))}
            {note.tags.length > 3 && (
              <span className="text-xs text-muted-foreground">
                +{note.tags.length - 3} more
              </span>
            )}
          </div>
        )}

        <div className="text-xs text-muted-foreground mt-3">
          {formatDate(note.createdAt)}
        </div>
      </div>
    </Link>
  )
}
