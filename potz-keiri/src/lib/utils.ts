import { format, parseISO, isAfter } from 'date-fns'
import { ja } from 'date-fns/locale'
import type { PaymentStatus, ExpenseStatus, SalesCategory, ExpenseCategory } from '@/types/database'

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(amount)
}

export function formatNumber(amount: number): string {
  return new Intl.NumberFormat('ja-JP').format(amount)
}

export function formatDate(dateStr: string, fmt: string = 'yyyy/MM/dd'): string {
  return format(parseISO(dateStr), fmt, { locale: ja })
}

export function formatMonth(monthStr: string): string {
  const [year, month] = monthStr.split('-')
  return `${year}年${parseInt(month)}月`
}

export function isOverdue(dueDateStr: string, status: PaymentStatus): boolean {
  if (status === 'paid') return false
  return isAfter(new Date(), parseISO(dueDateStr))
}

export function getCurrentMonth(): string {
  return format(new Date(), 'yyyy-MM')
}

export function getPaymentStatusLabel(status: PaymentStatus): string {
  const labels: Record<PaymentStatus, string> = {
    unpaid: '未入金',
    confirming: '確認中',
    paid: '入金済',
  }
  return labels[status]
}

export function getPaymentStatusClass(status: PaymentStatus): string {
  const classes: Record<PaymentStatus, string> = {
    unpaid: 'status-unpaid',
    confirming: 'status-confirming',
    paid: 'status-paid',
  }
  return classes[status]
}

export function getExpenseStatusLabel(status: ExpenseStatus): string {
  const labels: Record<ExpenseStatus, string> = {
    pending: '申請中',
    approved: '承認済',
    paid: '支払済',
    rejected: '却下',
  }
  return labels[status]
}

export function getExpenseStatusClass(status: ExpenseStatus): string {
  const classes: Record<ExpenseStatus, string> = {
    pending: 'status-pending',
    approved: 'status-approved',
    paid: 'status-paid',
    rejected: 'status-rejected',
  }
  return classes[status]
}

export function getSalesCategoryLabel(cat: SalesCategory): string {
  const labels: Record<SalesCategory, string> = {
    rfid: 'RFID',
    pc: 'PC',
    construction: '工事',
    other: 'その他',
  }
  return labels[cat]
}

export function getExpenseCategoryLabel(cat: ExpenseCategory): string {
  const labels: Record<ExpenseCategory, string> = {
    transportation: '交通費',
    supplies: '備品',
    purchase: '仕入',
    software: 'ソフトウェア',
    entertainment: '接待',
    other: 'その他',
  }
  return labels[cat]
}

export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}
