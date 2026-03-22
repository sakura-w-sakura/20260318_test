import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface HeroCardProps {
  children: ReactNode
  className?: string
}

export function HeroCard({ children, className }: HeroCardProps) {
  return (
    <div className={cn(
      'rounded-3xl p-6 text-white gradient-primary relative overflow-hidden',
      className
    )}>
      {children}
    </div>
  )
}
