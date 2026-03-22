'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'

export default function Home() {
  const router = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      if (user.role === 'part_time') {
        router.push('/expenses/submit')
      } else {
        router.push('/dashboard')
      }
    } else {
      router.push('/login')
    }
  }, [user, router])

  return null
}
