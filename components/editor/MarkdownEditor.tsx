'use client'

import { useState } from 'react'
import { MarkdownPreview } from './MarkdownPreview'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function MarkdownEditor({
  value,
  onChange,
  placeholder = 'Start writing your note...',
}: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="space-y-4">
      <div className="flex gap-2 border-b pb-2">
        <button
          type="button"
          onClick={() => setShowPreview(false)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            !showPreview
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent'
          }`}
        >
          Write
        </button>
        <button
          type="button"
          onClick={() => setShowPreview(true)}
          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
            showPreview
              ? 'bg-primary text-primary-foreground'
              : 'hover:bg-accent'
          }`}
        >
          Preview
        </button>
      </div>

      {showPreview ? (
        <div className="min-h-[400px] p-4 border rounded-md">
          <MarkdownPreview content={value} />
        </div>
      ) : (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full min-h-[400px] p-4 bg-background border rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-y"
        />
      )}

      <p className="text-xs text-muted-foreground">
        Markdown is supported. Use hashtags like #work or #personal to tag your
        notes.
      </p>
    </div>
  )
}
