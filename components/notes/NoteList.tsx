'use client'

import { NoteCard } from './NoteCard'
import type { Note } from '@/types'

interface NoteListProps {
  notes: Note[]
  emptyMessage?: string
}

export function NoteList({ notes, emptyMessage = 'No notes found.' }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  )
}
