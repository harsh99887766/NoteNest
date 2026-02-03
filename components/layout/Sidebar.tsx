'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, FileText, Search, Plus, Tag, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  onLogout?: () => void
}

export function Sidebar({ onLogout }: SidebarProps) {
  const pathname = usePathname()

  const links = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/notes', icon: FileText, label: 'All Notes' },
    { href: '/notes/new', icon: Plus, label: 'New Note' },
    { href: '/search', icon: Search, label: 'Search' },
  ]

  return (
    <aside className="w-64 border-r bg-card h-screen sticky top-0 flex flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">Notlify</h1>
        <p className="text-sm text-muted-foreground mt-1">Your daily notes</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-accent hover:text-accent-foreground'
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          )
        })}
      </nav>

      {onLogout && (
        <div className="p-4 border-t">
          <button
            onClick={onLogout}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium w-full hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      )}
    </aside>
  )
}
