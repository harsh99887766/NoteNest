import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { extractTags } from '@/lib/utils'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()
    const note = await prisma.note.findUnique({
      where: { id: params.id },
      include: { tags: true },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    // Check access permissions
    if (!note.isPublic && (!session?.user || note.authorId !== session.user.id)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json(note)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch note' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const note = await prisma.note.findUnique({
      where: { id: params.id },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    if (note.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const { title, content, isPublic, tags } = body

    // Extract hashtags from content if content is provided
    let allTags: string[] = tags || []
    if (content) {
      const extractedTags = extractTags(content)
      allTags = [...new Set([...extractedTags, ...(tags || [])])]
    }

    // Update tags if provided
    let tagConnections
    if (allTags.length > 0) {
      tagConnections = await Promise.all(
        allTags.map(async (tagName) => {
          const tag = await prisma.tag.upsert({
            where: { name: tagName },
            create: { name: tagName },
            update: {},
          })
          return { id: tag.id }
        })
      )
    }

    const updatedNote = await prisma.note.update({
      where: { id: params.id },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(typeof isPublic === 'boolean' && { isPublic }),
        ...(tagConnections && {
          tags: {
            set: [],
            connect: tagConnections,
          },
        }),
      },
      include: {
        tags: true,
      },
    })

    return NextResponse.json(updatedNote)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update note' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const note = await prisma.note.findUnique({
      where: { id: params.id },
    })

    if (!note) {
      return NextResponse.json({ error: 'Note not found' }, { status: 404 })
    }

    if (note.authorId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    await prisma.note.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ message: 'Note deleted successfully' })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete note' },
      { status: 500 }
    )
  }
}
