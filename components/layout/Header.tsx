'use client'

import { ThemeToggle } from './ThemeToggle'

interface HeaderProps {
  title?: string
  children?: React.ReactNode
}

export function Header({ title, children }: HeaderProps) {
  return (
    <header className="border-b bg-card sticky top-0 z-10">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {title && <h2 className="text-xl font-semibold">{title}</h2>}
          {children}
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
