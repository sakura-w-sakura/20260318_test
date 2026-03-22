'use client'

import { useState } from 'react'
import { Input, Select, Textarea } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { SalesRecord, SalesCategory, PaymentMethod } from '@/types/database'
import { mockSettings } from '@/lib/mock-data'

interface SalesFormProps {
  onSubmit: (sale: Omit<SalesRecord, 'id' | 'created_at' | 'updated_at'>) => void
  onCancel: () => void
  initial?: SalesRecord
}

export function SalesForm({ onSubmit, onCancel, initial }: SalesFormProps) {
  const [form, setForm] = useState({
    project_name: initial?.project_name || '',
    client_name: initial?.client_name || '',
    amount: initial?.amount?.toString() || '',
    category: initial?.category || 'rfid' as SalesCategory,
    invoice_number: initial?.invoice_number || '',
    invoice_date: initial?.invoice_date || new Date().toISOString().split('T')[0],
    payment_due_date: initial?.payment_due_date || '',
    payment_method: initial?.payment_method || 'bank_transfer' as PaymentMethod,
    bank_account: initial?.bank_account || '',
    memo: initial?.memo || '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...form,
      amount: parseInt(form.amount),
      payment_status: 'unpaid',
      created_by: '1',
      month_closed: false,
    })
  }

  const update = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        <Input id="project_name" label="案件名" required value={form.project_name} onChange={e => update('project_name', e.target.value)} placeholder="例: RFIDポーカーシステム 納品" />
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-on-surface-variant">取引先名</label>
          <input
            list="clients"
            required
            value={form.client_name}
            onChange={e => update('client_name', e.target.value)}
            className="w-full px-4 py-3 bg-surface-container-low rounded-2xl text-on-surface placeholder:text-outline transition-all duration-200"
            placeholder="例: 株式会社ABC"
          />
          <datalist id="clients">
            {mockSettings.clients.map(c => <option key={c} value={c} />)}
          </datalist>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input id="amount" label="売上金額" type="number" required value={form.amount} onChange={e => update('amount', e.target.value)} placeholder="例: 1200000" />
        <Select id="category" label="カテゴリ" value={form.category} onChange={e => update('category', e.target.value)} options={[
          { value: 'rfid', label: 'RFID' },
          { value: 'pc', label: 'PC' },
          { value: 'construction', label: '工事' },
          { value: 'other', label: 'その他' },
        ]} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input id="invoice_number" label="請求書番号" required value={form.invoice_number} onChange={e => update('invoice_number', e.target.value)} placeholder="例: INV-2026-007" />
        <Input id="invoice_date" label="請求書発行日" type="date" required value={form.invoice_date} onChange={e => update('invoice_date', e.target.value)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Input id="payment_due_date" label="入金期日" type="date" required value={form.payment_due_date} onChange={e => update('payment_due_date', e.target.value)} />
        <Select id="payment_method" label="請求方法" value={form.payment_method} onChange={e => update('payment_method', e.target.value)} options={[
          { value: 'bank_transfer', label: '銀行振込' },
          { value: 'credit_card', label: 'クレジットカード' },
        ]} />
      </div>

      <Select id="bank_account" label="入金予定口座" value={form.bank_account} onChange={e => update('bank_account', e.target.value)} options={[
        { value: '', label: '選択してください' },
        ...mockSettings.bank_accounts.map(a => ({ value: a, label: a }))
      ]} />

      <Textarea id="memo" label="メモ" value={form.memo} onChange={e => update('memo', e.target.value)} placeholder="備考..." />

      <div className="flex justify-end gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel}>キャンセル</Button>
        <Button type="submit">登録する</Button>
      </div>
    </form>
  )
}
