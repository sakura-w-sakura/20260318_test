'use client'

import { useState } from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  TrendingUp, TrendingDown, AlertTriangle, Receipt,
  CheckCircle2, Circle, ArrowRight, Clock
} from 'lucide-react'
import { mockSales, mockExpenses, mockChecklist } from '@/lib/mock-data'
import { formatCurrency, formatDate, isOverdue, getPaymentStatusLabel, getPaymentStatusClass, getCurrentMonth, cn } from '@/lib/utils'
import Link from 'next/link'

export default function DashboardPage() {
  const [checklist, setChecklist] = useState(mockChecklist)
  const currentMonth = getCurrentMonth()

  // KPI calculations
  const thisMonthSales = mockSales.filter(s => s.invoice_date.startsWith(currentMonth.substring(0, 7)))
  const totalSales = thisMonthSales.reduce((sum, s) => sum + s.amount, 0)
  const salesCount = thisMonthSales.length

  const lastMonth = '2026-02'
  const lastMonthSales = mockSales.filter(s => s.invoice_date.startsWith(lastMonth))
  const lastMonthTotal = lastMonthSales.reduce((sum, s) => sum + s.amount, 0)
  const salesDiff = lastMonthTotal > 0 ? ((totalSales - lastMonthTotal) / lastMonthTotal * 100) : 0

  const unpaidSales = mockSales.filter(s => s.payment_status !== 'paid')
  const unpaidTotal = unpaidSales.reduce((sum, s) => sum + s.amount, 0)
  const overdueCount = unpaidSales.filter(s => isOverdue(s.payment_due_date, s.payment_status)).length

  const thisMonthExpenses = mockExpenses.filter(e => e.date.startsWith(currentMonth.substring(0, 7)))
  const totalExpenses = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0)
  const pendingExpenses = mockExpenses.filter(e => e.status === 'pending')

  const toggleChecklist = (id: string) => {
    setChecklist(prev => prev.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const completedCount = checklist.filter(i => i.completed).length

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
          ダッシュボード
        </h1>
        <p className="text-on-surface-variant mt-1">
          {new Date().toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Sales KPI */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant font-medium">今月の売上</span>
              <div className="w-10 h-10 bg-[#d4edda] rounded-2xl flex items-center justify-center">
                <TrendingUp size={18} className="text-success" />
              </div>
            </div>
            <p className="text-3xl font-bold font-number tracking-tight">
              {formatCurrency(totalSales)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={cn(
                'text-xs font-semibold flex items-center gap-1',
                salesDiff >= 0 ? 'text-success' : 'text-error'
              )}>
                {salesDiff >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(salesDiff).toFixed(1)}%
              </span>
              <span className="text-xs text-on-surface-variant">前月比</span>
              <span className="text-xs text-on-surface-variant ml-auto">{salesCount}件</span>
            </div>
          </CardContent>
        </Card>

        {/* Unpaid KPI */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant font-medium">未入金</span>
              <div className="w-10 h-10 bg-[#fde8ec] rounded-2xl flex items-center justify-center">
                <AlertTriangle size={18} className="text-error" />
              </div>
            </div>
            <p className="text-3xl font-bold font-number tracking-tight">
              {formatCurrency(unpaidTotal)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-on-surface-variant">{unpaidSales.length}件</span>
              {overdueCount > 0 && (
                <Badge variant="error">{overdueCount}件 期日超過</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Expenses KPI */}
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant font-medium">今月の経費</span>
              <div className="w-10 h-10 bg-[#fef3cd] rounded-2xl flex items-center justify-center">
                <Receipt size={18} className="text-warning" />
              </div>
            </div>
            <p className="text-3xl font-bold font-number tracking-tight">
              {formatCurrency(totalExpenses)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs text-on-surface-variant">{thisMonthExpenses.length}件</span>
              {pendingExpenses.length > 0 && (
                <Badge variant="warning">{pendingExpenses.length}件 承認待ち</Badge>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle section: Checklist + Unpaid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly Checklist */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <CardTitle>月次チェックリスト</CardTitle>
            <span className="text-sm text-on-surface-variant font-number">
              {completedCount}/{checklist.length}
            </span>
          </div>
          <CardContent>
            {/* Progress bar */}
            <div className="w-full h-2 bg-surface-container-low rounded-full mb-5 overflow-hidden">
              <div
                className="h-full gradient-primary rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / checklist.length) * 100}%` }}
              />
            </div>
            <ul className="space-y-1">
              {checklist.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => toggleChecklist(item.id)}
                    className={cn(
                      'w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200',
                      item.completed
                        ? 'bg-surface-container-low text-on-surface-variant'
                        : 'hover:bg-surface-container-low'
                    )}
                  >
                    {item.completed
                      ? <CheckCircle2 size={20} className="text-success shrink-0" />
                      : <Circle size={20} className="text-outline shrink-0" />
                    }
                    <span className={cn('text-sm', item.completed && 'line-through')}>
                      {item.title}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Unpaid Sales */}
        <Card>
          <div className="flex items-center justify-between mb-5">
            <CardTitle>未入金案件</CardTitle>
            <Link href="/sales" className="text-sm text-primary hover:underline flex items-center gap-1">
              すべて見る <ArrowRight size={14} />
            </Link>
          </div>
          <CardContent>
            <ul className="space-y-3">
              {unpaidSales.slice(0, 5).map(sale => (
                <li key={sale.id} className="flex items-center justify-between px-4 py-3 bg-surface-container-low rounded-2xl">
                  <div className="min-w-0">
                    <p className="text-sm font-medium truncate">{sale.project_name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-on-surface-variant">{sale.client_name}</span>
                      {isOverdue(sale.payment_due_date, sale.payment_status) && (
                        <span className="flex items-center gap-1 text-xs text-error">
                          <Clock size={10} />
                          期日超過
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-bold font-number">{formatCurrency(sale.amount)}</p>
                    <Badge variant={sale.payment_status === 'unpaid' ? 'error' : 'warning'} className="mt-1">
                      {getPaymentStatusLabel(sale.payment_status)}
                    </Badge>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Bottom section: Pending expenses */}
      {pendingExpenses.length > 0 && (
        <Card>
          <div className="flex items-center justify-between mb-5">
            <CardTitle>承認待ち経費</CardTitle>
            <Link href="/expenses" className="text-sm text-primary hover:underline flex items-center gap-1">
              すべて見る <ArrowRight size={14} />
            </Link>
          </div>
          <CardContent>
            <div className="space-y-3">
              {pendingExpenses.map(exp => (
                <div key={exp.id} className="flex items-center justify-between px-4 py-3 bg-surface-container-low rounded-2xl">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{exp.purpose}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-on-surface-variant">{exp.applicant_name}</span>
                      <span className="text-xs text-on-surface-variant">{formatDate(exp.date)}</span>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="text-sm font-bold font-number">{formatCurrency(exp.amount)}</p>
                    <Badge variant="warning" className="mt-1">承認待ち</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
