import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Header } from '@/components/layout/Header'
import { NoteList } from '@/components/notes/NoteList'
import Link from 'next/link'
import { Plus } from 'lucide-react'

export default async function HomePage() {
  const session = await auth()

  if (!session?.user?.id) {
    return <div>Unauthorized</div>
  }

  const recentNotes = await prisma.note.findMany({
    where: {
      authorId: session.user.id,
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
  })

  return (
    <div>
      <Header title="Home">
        <Link
          href="/notes/new"
          className="ml-auto flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          <Plus className="h-4 w-4" />
          New Note
        </Link>
      </Header>

      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Welcome back!</h2>
          <p className="text-muted-foreground mt-1">
            Here are your recent notes
          </p>
        </div>

        <NoteList
          notes={recentNotes}
          emptyMessage="No notes yet. Create your first note to get started!"
        />

        {recentNotes.length > 0 && (
          <div className="mt-6 text-center">
            <Link
              href="/notes"
              className="text-sm text-primary hover:underline"
            >
              View all notes →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
