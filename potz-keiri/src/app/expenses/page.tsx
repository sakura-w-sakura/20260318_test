'use client'

import { useState, useMemo } from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Download, Filter, Check, X, Eye } from 'lucide-react'
import { mockExpenses } from '@/lib/mock-data'
import {
  formatCurrency, formatDate, getExpenseStatusLabel,
  getExpenseCategoryLabel, cn
} from '@/lib/utils'
import type { ExpenseRecord, ExpenseStatus } from '@/types/database'
import Papa from 'papaparse'

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(mockExpenses)
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedExpense, setSelectedExpense] = useState<ExpenseRecord | null>(null)

  const filtered = useMemo(() => {
    if (statusFilter === 'all') return expenses
    return expenses.filter(e => e.status === statusFilter)
  }, [expenses, statusFilter])

  const handleApprove = (id: string) => {
    setExpenses(prev => prev.map(e =>
      e.id === id ? {
        ...e,
        status: 'approved' as ExpenseStatus,
        payment_status: 'waiting' as const,
        approved_by: '1',
        approved_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } : e
    ))
    setSelectedExpense(null)
  }

  const handleReject = (id: string) => {
    setExpenses(prev => prev.map(e =>
      e.id === id ? {
        ...e,
        status: 'rejected' as ExpenseStatus,
        updated_at: new Date().toISOString(),
      } : e
    ))
    setSelectedExpense(null)
  }

  const handleMarkPaid = (id: string) => {
    setExpenses(prev => prev.map(e =>
      e.id === id ? {
        ...e,
        status: 'paid' as ExpenseStatus,
        payment_status: 'paid' as const,
        payment_date: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      } : e
    ))
  }

  const handleExportCSV = () => {
    const approved = expenses.filter(e => e.status === 'approved' || e.status === 'paid')
    const csvData = approved.map(e => ({
      日付: e.date,
      申請者: e.applicant_name,
      カテゴリ: getExpenseCategoryLabel(e.category),
      金額: e.amount,
      使用目的: e.purpose,
      関連案件: e.related_project || '',
      利用者同行者: e.attendees || '',
      税理士メモ: e.tax_memo || '',
      ステータス: getExpenseStatusLabel(e.status),
      支払日: e.payment_date || '',
    }))
    const csv = Papa.unparse(csvData)
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `経費一覧_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const statusBadgeVariant = (status: ExpenseStatus) => {
    const map: Record<ExpenseStatus, 'warning' | 'info' | 'success' | 'error'> = {
      pending: 'warning', approved: 'info', paid: 'success', rejected: 'error',
    }
    return map[status]
  }

  const pendingCount = expenses.filter(e => e.status === 'pending').length
  const totalApproved = expenses.filter(e => e.status === 'approved' || e.status === 'paid').reduce((sum, e) => sum + e.amount, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>経費精算</h1>
          <p className="text-on-surface-variant mt-1">経費の承認と管理</p>
        </div>
        <Button variant="secondary" onClick={handleExportCSV}>
          <Download size={16} className="mr-2" /> CSV出力（承認済み）
        </Button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <Card variant="flat">
          <p className="text-sm text-on-surface-variant mb-1">承認待ち</p>
          <p className="text-2xl font-bold font-number">{pendingCount}<span className="text-sm font-normal ml-1">件</span></p>
        </Card>
        <Card variant="flat">
          <p className="text-sm text-on-surface-variant mb-1">今月承認済み合計</p>
          <p className="text-2xl font-bold font-number">{formatCurrency(totalApproved)}</p>
        </Card>
        <Card variant="flat">
          <p className="text-sm text-on-surface-variant mb-1">申請総件数</p>
          <p className="text-2xl font-bold font-number">{expenses.length}<span className="text-sm font-normal ml-1">件</span></p>
        </Card>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-4">
        <Filter size={16} className="text-on-surface-variant" />
        <Select
          options={[
            { value: 'all', label: 'すべて' },
            { value: 'pending', label: '申請中' },
            { value: 'approved', label: '承認済' },
            { value: 'paid', label: '支払済' },
            { value: 'rejected', label: '却下' },
          ]}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="!py-2 !rounded-xl text-sm"
        />
      </div>

      {/* Expense list */}
      <div className="space-y-3">
        {filtered.map(exp => (
          <Card key={exp.id} className="!p-0">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className={cn(
                  'w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold shrink-0',
                  exp.status === 'pending' && 'bg-[#fef3cd] text-warning',
                  exp.status === 'approved' && 'bg-[#d6e4ff] text-info',
                  exp.status === 'paid' && 'bg-[#d4edda] text-success',
                  exp.status === 'rejected' && 'bg-[#fde8ec] text-error',
                )}>
                  {formatCurrency(exp.amount).replace('￥', '¥')}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{exp.purpose}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-on-surface-variant">{exp.applicant_name}</span>
                    <span className="text-xs text-on-surface-variant">{formatDate(exp.date)}</span>
                    <Badge>{getExpenseCategoryLabel(exp.category)}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <Badge variant={statusBadgeVariant(exp.status)}>
                  {getExpenseStatusLabel(exp.status)}
                </Badge>
                {exp.status === 'pending' && (
                  <>
                    <Button size="sm" onClick={() => handleApprove(exp.id)}>
                      <Check size={14} className="mr-1" /> 承認
                    </Button>
                    <Button size="sm" variant="danger" onClick={() => handleReject(exp.id)}>
                      <X size={14} className="mr-1" /> 却下
                    </Button>
                  </>
                )}
                {exp.status === 'approved' && exp.payment_status === 'waiting' && (
                  <Button size="sm" variant="secondary" onClick={() => handleMarkPaid(exp.id)}>
                    支払済にする
                  </Button>
                )}
                <button
                  onClick={() => setSelectedExpense(exp)}
                  className="p-2 rounded-full hover:bg-surface-container-low transition-colors"
                >
                  <Eye size={16} className="text-on-surface-variant" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Detail modal */}
      <Modal open={!!selectedExpense} onClose={() => setSelectedExpense(null)} title="経費詳細">
        {selectedExpense && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-on-surface-variant">使用目的</p><p className="text-sm font-medium mt-1">{selectedExpense.purpose}</p></div>
              <div><p className="text-xs text-on-surface-variant">金額</p><p className="text-sm font-bold font-number mt-1">{formatCurrency(selectedExpense.amount)}</p></div>
              <div><p className="text-xs text-on-surface-variant">カテゴリ</p><p className="text-sm mt-1">{getExpenseCategoryLabel(selectedExpense.category)}</p></div>
              <div><p className="text-xs text-on-surface-variant">日付</p><p className="text-sm mt-1">{formatDate(selectedExpense.date)}</p></div>
              <div><p className="text-xs text-on-surface-variant">申請者</p><p className="text-sm mt-1">{selectedExpense.applicant_name}</p></div>
              <div><p className="text-xs text-on-surface-variant">ステータス</p><Badge variant={statusBadgeVariant(selectedExpense.status)} className="mt-1">{getExpenseStatusLabel(selectedExpense.status)}</Badge></div>
            </div>
            {selectedExpense.related_project && (
              <div><p className="text-xs text-on-surface-variant">関連案件</p><p className="text-sm mt-1">{selectedExpense.related_project}</p></div>
            )}
            {selectedExpense.attendees && (
              <div><p className="text-xs text-on-surface-variant">利用者・同行者</p><p className="text-sm mt-1">{selectedExpense.attendees}</p></div>
            )}
            {selectedExpense.tax_memo && (
              <div><p className="text-xs text-on-surface-variant">税理士メモ</p><p className="text-sm mt-1">{selectedExpense.tax_memo}</p></div>
            )}
            {selectedExpense.status === 'pending' && (
              <div className="flex justify-end gap-3 pt-4">
                <Button variant="danger" onClick={() => handleReject(selectedExpense.id)}>却下</Button>
                <Button onClick={() => handleApprove(selectedExpense.id)}>承認</Button>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
