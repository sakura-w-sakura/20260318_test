'use client'

import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export function Input({ label, error, className, id, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-on-surface-variant">{label}</label>}
      <input
        id={id}
        className={cn(
          'w-full px-4 py-3 bg-surface-container-low rounded-2xl text-on-surface placeholder:text-outline transition-all duration-200',
          error && 'ring-2 ring-error/20',
          className
        )}
        {...props}
      />
      {error && <span className="text-xs text-error">{error}</span>}
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  options: { value: string; label: string }[]
}

export function Select({ label, options, className, id, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-on-surface-variant">{label}</label>}
      <select
        id={id}
        className={cn(
          'w-full px-4 py-3 bg-surface-container-low rounded-2xl text-on-surface transition-all duration-200 appearance-none cursor-pointer',
          className
        )}
        {...props}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  )
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
}

export function Textarea({ label, className, id, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && <label htmlFor={id} className="text-sm font-medium text-on-surface-variant">{label}</label>}
      <textarea
        id={id}
        className={cn(
          'w-full px-4 py-3 bg-surface-container-low rounded-2xl text-on-surface placeholder:text-outline transition-all duration-200 resize-none',
          className
        )}
        rows={3}
        {...props}
      />
    </div>
  )
}
