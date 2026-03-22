'use client'

import { useState } from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Modal } from '@/components/ui/modal'
import { Lock, Unlock, AlertTriangle, CheckCircle2 } from 'lucide-react'
import { mockMonthlyClosings, mockSales, mockExpenses } from '@/lib/mock-data'
import { formatCurrency, formatMonth, formatDate, cn } from '@/lib/utils'
import type { MonthlyClosing } from '@/types/database'

export default function MonthlyClosingPage() {
  const [closings, setClosings] = useState<MonthlyClosing[]>(mockMonthlyClosings)
  const [confirmAction, setConfirmAction] = useState<{ month: string; action: 'close' | 'reopen' } | null>(null)

  const handleClose = (month: string) => {
    setClosings(prev => prev.map(c =>
      c.month === month ? { ...c, closed: true, closed_by: '1', closed_at: new Date().toISOString() } : c
    ))
    setConfirmAction(null)
  }

  const handleReopen = (month: string) => {
    setClosings(prev => prev.map(c =>
      c.month === month ? { ...c, closed: false, closed_by: undefined, closed_at: undefined } : c
    ))
    setConfirmAction(null)
  }

  const getMonthSummary = (month: string) => {
    const sales = mockSales.filter(s => s.invoice_date.startsWith(month))
    const expenses = mockExpenses.filter(e => e.date.startsWith(month) && (e.status === 'approved' || e.status === 'paid'))
    const totalSales = sales.reduce((sum, s) => sum + s.amount, 0)
    const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0)
    const pendingExpenses = mockExpenses.filter(e => e.date.startsWith(month) && e.status === 'pending').length
    const unpaidSales = sales.filter(s => s.payment_status !== 'paid').length
    return { totalSales, totalExpenses, profit: totalSales - totalExpenses, salesCount: sales.length, expenseCount: expenses.length, pendingExpenses, unpaidSales }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>月次締め管理</h1>
        <p className="text-on-surface-variant mt-1">月単位でデータを確定し編集をロック</p>
      </div>

      <div className="space-y-4">
        {closings.sort((a, b) => b.month.localeCompare(a.month)).map(closing => {
          const summary = getMonthSummary(closing.month)
          const hasWarnings = summary.pendingExpenses > 0 || summary.unpaidSales > 0

          return (
            <Card key={closing.month} className={cn(closing.closed && 'bg-surface-container-low')}>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className={cn(
                    'w-12 h-12 rounded-2xl flex items-center justify-center',
                    closing.closed ? 'bg-[#d4edda]' : 'bg-surface-container'
                  )}>
                    {closing.closed ? <Lock size={20} className="text-success" /> : <Unlock size={20} className="text-on-surface-variant" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{formatMonth(closing.month)}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant={closing.closed ? 'success' : 'default'}>
                        {closing.closed ? '締め済み' : '未締め'}
                      </Badge>
                      {closing.closed_at && (
                        <span className="text-xs text-on-surface-variant">
                          {formatDate(closing.closed_at, 'yyyy/MM/dd HH:mm')} に締め
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {!closing.closed && hasWarnings && (
                    <div className="flex items-center gap-1 text-xs text-warning">
                      <AlertTriangle size={14} />
                      {summary.pendingExpenses > 0 && <span>承認待ち{summary.pendingExpenses}件</span>}
                      {summary.unpaidSales > 0 && <span>未入金{summary.unpaidSales}件</span>}
                    </div>
                  )}
                  {closing.closed ? (
                    <Button variant="secondary" size="sm" onClick={() => setConfirmAction({ month: closing.month, action: 'reopen' })}>
                      <Unlock size={14} className="mr-1" /> 再開放
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => setConfirmAction({ month: closing.month, action: 'close' })}>
                      <Lock size={14} className="mr-1" /> 月次締め
                    </Button>
                  )}
                </div>
              </div>

              {/* Summary */}
              <div className="grid grid-cols-4 gap-4 mt-5 pt-5" style={{ borderTop: '1px solid rgba(196,196,196,0.15)' }}>
                <div>
                  <p className="text-xs text-on-surface-variant">売上</p>
                  <p className="text-sm font-bold font-number mt-1">{formatCurrency(summary.totalSales)}</p>
                  <p className="text-xs text-on-surface-variant">{summary.salesCount}件</p>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">経費</p>
                  <p className="text-sm font-bold font-number mt-1">{formatCurrency(summary.totalExpenses)}</p>
                  <p className="text-xs text-on-surface-variant">{summary.expenseCount}件</p>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">概算利益</p>
                  <p className={cn('text-sm font-bold font-number mt-1', summary.profit >= 0 ? 'text-success' : 'text-error')}>
                    {formatCurrency(summary.profit)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-on-surface-variant">ステータス</p>
                  <div className="flex items-center gap-1 mt-1">
                    {summary.pendingExpenses > 0 && <Badge variant="warning" className="text-[10px]">承認待ち{summary.pendingExpenses}</Badge>}
                    {summary.unpaidSales > 0 && <Badge variant="error" className="text-[10px]">未入金{summary.unpaidSales}</Badge>}
                    {summary.pendingExpenses === 0 && summary.unpaidSales === 0 && <Badge variant="success" className="text-[10px]">問題なし</Badge>}
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Confirm modal */}
      <Modal
        open={!!confirmAction}
        onClose={() => setConfirmAction(null)}
        title={confirmAction?.action === 'close' ? '月次締め確認' : '再開放確認'}
        size="sm"
      >
        {confirmAction && (
          <div className="space-y-4">
            <p className="text-sm text-on-surface-variant">
              {confirmAction.action === 'close'
                ? `${formatMonth(confirmAction.month)}のデータを締めますか？締め後はデータの編集ができなくなります。`
                : `${formatMonth(confirmAction.month)}の締めを解除しますか？データの編集が可能になります。`
              }
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="secondary" onClick={() => setConfirmAction(null)}>キャンセル</Button>
              <Button
                variant={confirmAction.action === 'close' ? 'primary' : 'danger'}
                onClick={() => confirmAction.action === 'close' ? handleClose(confirmAction.month) : handleReopen(confirmAction.month)}
              >
                {confirmAction.action === 'close' ? '締める' : '再開放する'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
