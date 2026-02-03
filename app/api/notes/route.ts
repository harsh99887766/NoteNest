import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { extractTags } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    const searchParams = request.nextUrl.searchParams
    const tag = searchParams.get('tag')
    const search = searchParams.get('search')

    let notes

    if (session?.user) {
      // Authenticated user - show their notes
      notes = await prisma.note.findMany({
        where: {
          authorId: session.user.id,
          ...(tag && {
            tags: {
              some: {
                name: tag,
              },
            },
          }),
          ...(search && {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }),
        },
        include: {
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    } else {
      // Unauthenticated - show only public notes
      notes = await prisma.note.findMany({
        where: {
          isPublic: true,
          ...(tag && {
            tags: {
              some: {
                name: tag,
              },
            },
          }),
          ...(search && {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { content: { contains: search, mode: 'insensitive' } },
            ],
          }),
        },
        include: {
          tags: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })
    }

    return NextResponse.json(notes)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch notes' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { title, content, isPublic, tags } = body

    // Extract hashtags from content
    const extractedTags = extractTags(content)
    const allTags = [...new Set([...extractedTags, ...(tags || [])])]

    // Create or connect tags
    const tagConnections = await Promise.all(
      allTags.map(async (tagName) => {
        const tag = await prisma.tag.upsert({
          where: { name: tagName },
          create: { name: tagName },
          update: {},
        })
        return { id: tag.id }
      })
    )

    const note = await prisma.note.create({
      data: {
        title,
        content,
        isPublic: isPublic || false,
        authorId: session.user.id,
        tags: {
          connect: tagConnections,
        },
      },
      include: {
        tags: true,
      },
    })

    return NextResponse.json(note, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create note' },
      { status: 500 }
    )
  }
}
