'use client'

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { NoteList } from '@/components/notes/NoteList'
import { Search } from 'lucide-react'
import type { Note } from '@/types'

export default function SearchPage() {
  const [query, setQuery] = useState('')
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const searchNotes = async () => {
      if (!query.trim()) {
        setNotes([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch(
          `/api/notes?search=${encodeURIComponent(query)}`
        )
        if (response.ok) {
          const data = await response.json()
          setNotes(data)
        }
      } catch (error) {
        console.error('Search failed:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(searchNotes, 300)
    return () => clearTimeout(debounce)
  }, [query])

  return (
    <div>
      <Header title="Search" />

      <div className="p-6">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search notes by title or content..."
              className="w-full pl-10 pr-4 py-3 bg-background border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Searching...</p>
        ) : query.trim() ? (
          <NoteList
            notes={notes}
            emptyMessage={`No notes found for "${query}"`}
          />
        ) : (
          <p className="text-center text-muted-foreground">
            Start typing to search your notes
          </p>
        )}
      </div>
    </div>
  )
}
