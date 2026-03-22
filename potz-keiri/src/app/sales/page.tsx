'use client'

import { useState, useMemo } from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/input'
import { Modal } from '@/components/ui/modal'
import { Plus, Download, Filter, Clock, ArrowUpDown } from 'lucide-react'
import { mockSales } from '@/lib/mock-data'
import {
  formatCurrency, formatDate, isOverdue,
  getPaymentStatusLabel, getSalesCategoryLabel, cn
} from '@/lib/utils'
import type { SalesRecord, PaymentStatus, SalesCategory } from '@/types/database'
import { SalesForm } from './sales-form'
import { SalesChart } from './sales-chart'
import Papa from 'papaparse'

export default function SalesPage() {
  const [sales, setSales] = useState<SalesRecord[]>(mockSales)
  const [monthFilter, setMonthFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [showForm, setShowForm] = useState(false)
  const [editingSale, setEditingSale] = useState<SalesRecord | null>(null)
  const [sortField, setSortField] = useState<'date' | 'amount'>('date')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')

  const filteredSales = useMemo(() => {
    let result = [...sales]
    if (monthFilter !== 'all') {
      result = result.filter(s => s.invoice_date.startsWith(monthFilter))
    }
    if (statusFilter !== 'all') {
      result = result.filter(s => s.payment_status === statusFilter)
    }
    result.sort((a, b) => {
      const valA = sortField === 'date' ? a.invoice_date : a.amount
      const valB = sortField === 'date' ? b.invoice_date : b.amount
      if (sortDir === 'asc') return valA < valB ? -1 : 1
      return valA > valB ? -1 : 1
    })
    return result
  }, [sales, monthFilter, statusFilter, sortField, sortDir])

  const totalFiltered = filteredSales.reduce((sum, s) => sum + s.amount, 0)

  const handleStatusChange = (id: string, status: PaymentStatus) => {
    setSales(prev => prev.map(s =>
      s.id === id ? { ...s, payment_status: status, paid_date: status === 'paid' ? new Date().toISOString().split('T')[0] : s.paid_date, updated_at: new Date().toISOString() } : s
    ))
  }

  const handleAddSale = (sale: Omit<SalesRecord, 'id' | 'created_at' | 'updated_at'>) => {
    const newSale: SalesRecord = {
      ...sale,
      id: String(sales.length + 1),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }
    setSales(prev => [...prev, newSale])
    setShowForm(false)
  }

  const handleExportCSV = () => {
    const csvData = filteredSales.map(s => ({
      案件名: s.project_name,
      取引先: s.client_name,
      金額: s.amount,
      カテゴリ: getSalesCategoryLabel(s.category),
      請求書番号: s.invoice_number,
      請求日: s.invoice_date,
      入金期日: s.payment_due_date,
      ステータス: getPaymentStatusLabel(s.payment_status),
      入金日: s.paid_date || '',
      メモ: s.memo || '',
    }))
    const csv = Papa.unparse(csvData)
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `売上一覧_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const statusBadgeVariant = (status: PaymentStatus) => {
    const map: Record<PaymentStatus, 'error' | 'warning' | 'success'> = {
      unpaid: 'error', confirming: 'warning', paid: 'success',
    }
    return map[status]
  }

  const months = [...new Set(sales.map(s => s.invoice_date.substring(0, 7)))].sort().reverse()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>売上管理</h1>
          <p className="text-on-surface-variant mt-1">案件と入金ステータスの管理</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={handleExportCSV}>
            <Download size={16} className="mr-2" /> CSV出力
          </Button>
          <Button onClick={() => { setEditingSale(null); setShowForm(true) }}>
            <Plus size={16} className="mr-2" /> 案件登録
          </Button>
        </div>
      </div>

      {/* Chart */}
      <SalesChart sales={sales} />

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-on-surface-variant" />
          <Select
            options={[
              { value: 'all', label: 'すべての月' },
              ...months.map(m => ({ value: m, label: `${m.split('-')[0]}年${parseInt(m.split('-')[1])}月` }))
            ]}
            value={monthFilter}
            onChange={e => setMonthFilter(e.target.value)}
            className="!py-2 !rounded-xl text-sm"
          />
        </div>
        <Select
          options={[
            { value: 'all', label: 'すべてのステータス' },
            { value: 'unpaid', label: '未入金' },
            { value: 'confirming', label: '確認中' },
            { value: 'paid', label: '入金済' },
          ]}
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="!py-2 !rounded-xl text-sm"
        />
        <div className="ml-auto text-sm text-on-surface-variant">
          {filteredSales.length}件 / 合計 <span className="font-number font-bold text-on-surface">{formatCurrency(totalFiltered)}</span>
        </div>
      </div>

      {/* Sales list */}
      <Card className="!p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="text-left px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">案件名</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">取引先</th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">カテゴリ</th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => { setSortField('amount'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}>
                  <span className="inline-flex items-center gap-1">金額 <ArrowUpDown size={12} /></span>
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider cursor-pointer select-none"
                  onClick={() => { setSortField('date'); setSortDir(d => d === 'asc' ? 'desc' : 'asc') }}>
                  <span className="inline-flex items-center gap-1">入金期日 <ArrowUpDown size={12} /></span>
                </th>
                <th className="text-center px-6 py-4 text-xs font-semibold text-on-surface-variant uppercase tracking-wider">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales.map(sale => (
                <tr key={sale.id} className="hover:bg-surface-container-low/50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium">{sale.project_name}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{sale.invoice_number}</p>
                  </td>
                  <td className="px-6 py-4 text-sm">{sale.client_name}</td>
                  <td className="px-6 py-4">
                    <Badge>{getSalesCategoryLabel(sale.category)}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="font-number font-bold text-sm">{formatCurrency(sale.amount)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{formatDate(sale.payment_due_date)}</span>
                      {isOverdue(sale.payment_due_date, sale.payment_status) && (
                        <Clock size={14} className="text-error" />
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <select
                      value={sale.payment_status}
                      onChange={e => handleStatusChange(sale.id, e.target.value as PaymentStatus)}
                      className={cn(
                        'text-xs font-semibold px-3 py-1.5 rounded-full border-0 cursor-pointer',
                        sale.payment_status === 'unpaid' && 'bg-[#fde8ec] text-error',
                        sale.payment_status === 'confirming' && 'bg-[#fef3cd] text-warning',
                        sale.payment_status === 'paid' && 'bg-[#d4edda] text-success',
                      )}
                      disabled={sale.month_closed}
                    >
                      <option value="unpaid">未入金</option>
                      <option value="confirming">確認中</option>
                      <option value="paid">入金済</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add/Edit Modal */}
      <Modal open={showForm} onClose={() => setShowForm(false)} title="案件登録" size="lg">
        <SalesForm onSubmit={handleAddSale} onCancel={() => setShowForm(false)} />
      </Modal>
    </div>
  )
}
