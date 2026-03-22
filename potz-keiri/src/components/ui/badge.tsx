import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info'
  className?: string
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  const variants = {
    default: 'bg-surface-container-high text-on-surface-variant',
    success: 'bg-[#d4edda] text-success',
    warning: 'bg-[#fef3cd] text-warning',
    error: 'bg-[#fde8ec] text-error',
    info: 'bg-[#d6e4ff] text-info',
  }

  return (
    <span className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
