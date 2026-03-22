'use client'

import { useAuth } from '@/lib/auth-context'
import { Sidebar } from './sidebar'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'
import type { ReactNode } from 'react'

export function AppLayout({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!user && pathname !== '/login') {
      router.push('/login')
    }
  }, [user, pathname, router])

  if (pathname === '/login') {
    return <>{children}</>
  }

  if (!user) return null

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <main className="flex-1 ml-64 p-8 max-w-[1400px]">
        {children}
      </main>
    </div>
  )
}
