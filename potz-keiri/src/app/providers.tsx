'use client'

import { AuthProvider } from '@/lib/auth-context'
import { AppLayout } from '@/components/layout/app-layout'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AppLayout>
        {children}
      </AppLayout>
    </AuthProvider>
  )
}
