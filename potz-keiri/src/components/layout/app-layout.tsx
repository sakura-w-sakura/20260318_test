'use client'

import { useAuth } from '@/lib/auth-context'
import { BottomNav } from './bottom-nav'
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
    <div className="min-h-screen bg-surface flex justify-center">
      <div className="w-full max-w-[430px] relative pb-20">
        <main>
          {children}
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
