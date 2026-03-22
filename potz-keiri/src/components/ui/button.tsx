'use client'

import { cn } from '@/lib/utils'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({ variant = 'primary', size = 'md', className, children, ...props }: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'gradient-primary text-white rounded-full hover:opacity-90 active:scale-[0.98]',
    secondary: 'bg-surface-container-highest text-on-surface rounded-full hover:bg-surface-container-high active:scale-[0.98]',
    tertiary: 'bg-transparent text-primary font-semibold hover:bg-surface-container-low rounded-full',
    danger: 'bg-error text-white rounded-full hover:opacity-90 active:scale-[0.98]',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  }

  return (
    <button className={cn(base, variants[variant], sizes[size], className)} {...props}>
      {children}
    </button>
  )
}
