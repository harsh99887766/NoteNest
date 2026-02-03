import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { MarkdownPreview } from '@/components/editor/MarkdownPreview'
import { TagBadge } from '@/components/notes/TagBadge'
import { formatDate } from '@/lib/utils'
import { Globe, Lock } from 'lucide-react'

export default async function NotePage({
  params,
}: {
  params: { id: string }
}) {
  const session = await auth()

  const note = await prisma.note.findUnique({
    where: { id: params.id },
    include: { tags: true },
  })

  if (!note || note.authorId !== session!.user!.id) {
    notFound()
  }

  return (
    <div>
      <Header title="Note" />

      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-3xl font-bold">{note.title}</h1>
            {note.isPublic ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
                Public
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4" />
                Private
              </div>
            )}
          </div>

          <div className="text-sm text-muted-foreground">
            {formatDate(note.createdAt)}
            {note.updatedAt > note.createdAt && ' (edited)'}
          </div>

          {note.tags && note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {note.tags.map((tag) => (
                <TagBadge key={tag.id} tag={tag} />
              ))}
            </div>
          )}
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <MarkdownPreview content={note.content} />
        </div>
      </div>
    </div>
  )
}
