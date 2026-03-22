'use client'

import { useEffect, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg'
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-on-surface/20 backdrop-blur-sm" onClick={onClose} />
      <div className={cn(
        'relative w-full bg-surface-container-lowest rounded-3xl shadow-ambient p-6 max-h-[90vh] overflow-y-auto',
        sizes[size]
      )}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold font-[var(--font-display)]">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors"
          >
            <X size={20} className="text-on-surface-variant" />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
