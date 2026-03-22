'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Profile, UserRole } from '@/types/database'
import { mockUsers } from '@/lib/mock-data'

interface AuthContextType {
  user: Profile | null
  login: (email: string, password: string) => boolean
  logout: () => void
  isAdmin: boolean
  isDirector: boolean
  isPartTime: boolean
  canViewFinancials: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)

  const login = useCallback((email: string, _password: string) => {
    const found = mockUsers.find(u => u.email === email)
    if (found) {
      setUser(found)
      return true
    }
    return false
  }, [])

  const logout = useCallback(() => {
    setUser(null)
  }, [])

  const role = user?.role
  const isAdmin = role === 'admin'
  const isDirector = role === 'director'
  const isPartTime = role === 'part_time'
  const canViewFinancials = role === 'admin' || role === 'director'

  return (
    <AuthContext.Provider value={{ user, login, logout, isAdmin, isDirector, isPartTime, canViewFinancials }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
