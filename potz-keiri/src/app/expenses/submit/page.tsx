'use client'

import { useState } from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input, Select, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Camera, Upload, CheckCircle2, Clock, XCircle } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { mockExpenses } from '@/lib/mock-data'
import { formatCurrency, formatDate, getExpenseCategoryLabel, getExpenseStatusLabel } from '@/lib/utils'
import type { ExpenseRecord, ExpenseCategory } from '@/types/database'

export default function ExpenseSubmitPage() {
  const { user } = useAuth()
  const [expenses, setExpenses] = useState<ExpenseRecord[]>(
    mockExpenses.filter(e => e.applicant_id === user?.id || user?.role === 'admin')
  )
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    amount: '',
    category: 'transportation' as ExpenseCategory,
    date: new Date().toISOString().split('T')[0],
    purpose: '',
    related_project: '',
    attendees: '',
    tax_memo: '',
  })

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newExpense: ExpenseRecord = {
      id: String(Date.now()),
      applicant_id: user?.id || '',
      applicant_name: user?.name || '',
      amount: parseInt(form.amount),
      category: form.category,
      date: form.date,
      purpose: form.purpose,
      related_project: form.related_project || undefined,
      attendees: form.attendees || undefined,
      tax_memo: form.tax_memo || undefined,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      month_closed: false,
    }
    setExpenses(prev => [newExpense, ...prev])
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setShowForm(false)
      setForm({ amount: '', category: 'transportation', date: new Date().toISOString().split('T')[0], purpose: '', related_project: '', attendees: '', tax_memo: '' })
    }, 2000)
  }

  const statusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={16} className="text-warning" />
      case 'approved': case 'paid': return <CheckCircle2 size={16} className="text-success" />
      case 'rejected': return <XCircle size={16} className="text-error" />
      default: return null
    }
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>経費申請</h1>
          <p className="text-on-surface-variant mt-1">領収書の撮影・経費の申請</p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Upload size={16} className="mr-2" /> 新規申請
          </Button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <Card>
          {submitted ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="text-success mx-auto mb-3" />
              <p className="text-lg font-semibold">申請が完了しました</p>
              <p className="text-sm text-on-surface-variant mt-1">承認をお待ちください</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <CardTitle>新規経費申請</CardTitle>

              {/* Receipt upload area */}
              <div className="flex items-center justify-center w-full h-32 bg-surface-container-low rounded-2xl cursor-pointer hover:bg-surface-container transition-colors">
                <div className="text-center">
                  <Camera size={24} className="text-on-surface-variant mx-auto mb-2" />
                  <p className="text-sm text-on-surface-variant">領収書を撮影またはアップロード</p>
                  <p className="text-xs text-outline mt-1">クリックまたはドラッグ</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Input id="amount" label="金額" type="number" required value={form.amount} onChange={e => update('amount', e.target.value)} placeholder="例: 1200" />
                <Select id="category" label="カテゴリ" value={form.category} onChange={e => update('category', e.target.value)} options={[
                  { value: 'transportation', label: '交通費' },
                  { value: 'supplies', label: '備品' },
                  { value: 'purchase', label: '仕入' },
                  { value: 'software', label: 'ソフトウェア' },
                  { value: 'entertainment', label: '接待' },
                  { value: 'other', label: 'その他' },
                ]} />
              </div>

              <Input id="date" label="日付" type="date" required value={form.date} onChange={e => update('date', e.target.value)} />
              <Input id="purpose" label="使用目的" required value={form.purpose} onChange={e => update('purpose', e.target.value)} placeholder="例: クライアント訪問交通費" />
              <Input id="related_project" label="関連案件（任意）" value={form.related_project} onChange={e => update('related_project', e.target.value)} placeholder="例: RFIDポーカーシステム 納品" />
              <Input id="attendees" label="利用者・同行者（任意）" value={form.attendees} onChange={e => update('attendees', e.target.value)} placeholder="例: 代表取締役, ABC田中様" />
              <Textarea id="tax_memo" label="税理士メモ（任意）" value={form.tax_memo} onChange={e => update('tax_memo', e.target.value)} placeholder="税理士との照合時に使用するメモ..." />

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="secondary" onClick={() => setShowForm(false)}>キャンセル</Button>
                <Button type="submit">申請する</Button>
              </div>
            </form>
          )}
        </Card>
      )}

      {/* My expenses list */}
      <div>
        <h2 className="text-lg font-semibold mb-4">申請履歴</h2>
        <div className="space-y-2">
          {expenses.map(exp => (
            <Card key={exp.id} variant="flat" className="!p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {statusIcon(exp.status)}
                  <div>
                    <p className="text-sm font-medium">{exp.purpose}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-on-surface-variant">{formatDate(exp.date)}</span>
                      <Badge>{getExpenseCategoryLabel(exp.category)}</Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold font-number">{formatCurrency(exp.amount)}</p>
                  <span className="text-xs text-on-surface-variant">{getExpenseStatusLabel(exp.status)}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
