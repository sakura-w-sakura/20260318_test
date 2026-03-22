import { cn } from '@/lib/utils'
import type { ReactNode, HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  variant?: 'elevated' | 'flat' | 'interactive'
}

export function Card({ children, variant = 'elevated', className, ...props }: CardProps) {
  const base = 'rounded-3xl'

  const variants = {
    elevated: 'bg-surface-container-lowest shadow-ambient p-6',
    flat: 'bg-surface-container-low p-6',
    interactive: 'bg-surface-container-lowest shadow-ambient p-6 transition-lift cursor-pointer',
  }

  return (
    <div className={cn(base, variants[variant], className)} {...props}>
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-semibold text-on-surface', className)}>{children}</h3>
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>
}
