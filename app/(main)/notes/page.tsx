import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { Header } from '@/components/layout/Header'
import { NoteList } from '@/components/notes/NoteList'

export default async function NotesPage() {
  const session = await auth()

  const notes = await prisma.note.findMany({
    where: {
      authorId: session!.user!.id,
    },
    include: {
      tags: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div>
      <Header title="All Notes" />

      <div className="p-6">
        <NoteList notes={notes} emptyMessage="No notes found." />
      </div>
    </div>
  )
}
