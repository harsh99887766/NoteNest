export interface Note {
  id: string
  title: string
  content: string
  isPublic: boolean
  authorId: string
  createdAt: Date
  updatedAt: Date
  tags: Tag[]
}

export interface Tag {
  id: string
  name: string
}

export interface User {
  id: string
  email: string
  name?: string | null
}

export interface CreateNoteInput {
  title: string
  content: string
  isPublic: boolean
  tags: string[]
}

export interface UpdateNoteInput {
  title?: string
  content?: string
  isPublic?: boolean
  tags?: string[]
}
