'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard, TrendingUp, Receipt, FileBarChart,
  CalendarCheck, History, Settings, LogOut, ChevronLeft, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/lib/auth-context'
import { useState } from 'react'

const navItems = [
  { href: '/dashboard', label: 'ダッシュボード', icon: LayoutDashboard, roles: ['admin', 'director'] },
  { href: '/sales', label: '売上管理', icon: TrendingUp, roles: ['admin', 'director'] },
  { href: '/expenses', label: '経費精算', icon: Receipt, roles: ['admin', 'director', 'part_time'] },
  { href: '/forecast', label: '概算利益', icon: FileBarChart, roles: ['admin', 'director'] },
  { href: '/monthly-closing', label: '月次締め', icon: CalendarCheck, roles: ['admin'] },
  { href: '/history', label: '操作履歴', icon: History, roles: ['admin'] },
  { href: '/settings', label: '設定', icon: Settings, roles: ['admin'] },
]

export function Sidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  if (!user) return null

  const filteredItems = navItems.filter(item => item.roles.includes(user.role))

  return (
    <aside className={cn(
      'fixed left-0 top-0 h-screen bg-surface-container-lowest shadow-ambient z-40 flex flex-col transition-all duration-300',
      collapsed ? 'w-20' : 'w-64'
    )}>
      {/* Brand */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 gradient-primary rounded-2xl flex items-center justify-center text-white font-bold text-lg shrink-0">
          P
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-semibold text-on-surface text-base tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
              POTZ KEIRI
            </h1>
            <p className="text-xs text-on-surface-variant">経理補完ツール</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 mt-4">
        <ul className="space-y-1">
          {filteredItems.map(item => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-secondary-container text-on-secondary-container'
                      : 'text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface'
                  )}
                >
                  <item.icon size={20} className="shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* User info & collapse */}
      <div className="p-3 space-y-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center p-2 rounded-2xl hover:bg-surface-container-low transition-colors text-on-surface-variant"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {!collapsed && (
          <div className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl">
            <div className="w-8 h-8 bg-surface-container-highest rounded-full flex items-center justify-center text-xs font-semibold">
              {user.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-on-surface truncate">{user.name}</p>
              <p className="text-xs text-on-surface-variant truncate">{user.email}</p>
            </div>
            <button
              onClick={logout}
              className="p-1.5 rounded-full hover:bg-surface-container transition-colors"
              title="ログアウト"
            >
              <LogOut size={16} className="text-on-surface-variant" />
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}
