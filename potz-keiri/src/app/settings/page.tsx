'use client'

import { useState } from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Plus, X, GripVertical, Save } from 'lucide-react'
import { mockSettings, mockChecklistTemplates } from '@/lib/mock-data'
import type { Settings, ChecklistTemplate } from '@/types/database'

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings>(mockSettings)
  const [templates, setTemplates] = useState<ChecklistTemplate[]>(mockChecklistTemplates)
  const [newCategory, setNewCategory] = useState('')
  const [newClient, setNewClient] = useState('')
  const [newAccount, setNewAccount] = useState('')
  const [newTask, setNewTask] = useState('')
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const addCategory = () => {
    if (newCategory.trim()) {
      setSettings(prev => ({ ...prev, expense_categories: [...prev.expense_categories, newCategory.trim()] }))
      setNewCategory('')
    }
  }

  const removeCategory = (idx: number) => {
    setSettings(prev => ({ ...prev, expense_categories: prev.expense_categories.filter((_, i) => i !== idx) }))
  }

  const addClient = () => {
    if (newClient.trim()) {
      setSettings(prev => ({ ...prev, clients: [...prev.clients, newClient.trim()] }))
      setNewClient('')
    }
  }

  const removeClient = (idx: number) => {
    setSettings(prev => ({ ...prev, clients: prev.clients.filter((_, i) => i !== idx) }))
  }

  const addAccount = () => {
    if (newAccount.trim()) {
      setSettings(prev => ({ ...prev, bank_accounts: [...prev.bank_accounts, newAccount.trim()] }))
      setNewAccount('')
    }
  }

  const removeAccount = (idx: number) => {
    setSettings(prev => ({ ...prev, bank_accounts: prev.bank_accounts.filter((_, i) => i !== idx) }))
  }

  const addTask = () => {
    if (newTask.trim()) {
      setTemplates(prev => [...prev, { id: String(Date.now()), title: newTask.trim(), sort_order: prev.length + 1 }])
      setNewTask('')
    }
  }

  const removeTask = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>設定</h1>
          <p className="text-on-surface-variant mt-1">システム設定の管理</p>
        </div>
        <Button onClick={handleSave}>
          <Save size={16} className="mr-2" />
          {saved ? '保存しました' : '保存'}
        </Button>
      </div>

      {/* Tax rate */}
      <Card>
        <CardTitle>納税予測設定</CardTitle>
        <CardContent className="mt-4">
          <div className="max-w-xs">
            <Input
              id="tax_rate"
              label="簡易税率（%）"
              type="number"
              min={0}
              max={100}
              value={String(settings.tax_rate)}
              onChange={e => setSettings(prev => ({ ...prev, tax_rate: parseInt(e.target.value) || 0 }))}
            />
            <p className="text-xs text-on-surface-variant mt-2">概算利益に対して適用する簡易税率です</p>
          </div>
        </CardContent>
      </Card>

      {/* Expense categories */}
      <Card>
        <CardTitle>経費カテゴリ管理</CardTitle>
        <CardContent className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {settings.expense_categories.map((cat, idx) => (
              <div key={idx} className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-low rounded-full text-sm">
                <span>{cat}</span>
                <button onClick={() => removeCategory(idx)} className="p-0.5 hover:bg-surface-container rounded-full">
                  <X size={14} className="text-on-surface-variant" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="new_category"
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              placeholder="新しいカテゴリ"
              className="!py-2"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addCategory())}
            />
            <Button variant="secondary" size="sm" onClick={addCategory}>
              <Plus size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Monthly checklist templates */}
      <Card>
        <CardTitle>月次チェックリスト</CardTitle>
        <CardContent className="mt-4 space-y-2">
          {templates.map(task => (
            <div key={task.id} className="flex items-center gap-3 px-4 py-3 bg-surface-container-low rounded-2xl">
              <GripVertical size={16} className="text-outline cursor-grab" />
              <span className="text-sm flex-1">{task.title}</span>
              <button onClick={() => removeTask(task.id)} className="p-1 hover:bg-surface-container rounded-full">
                <X size={14} className="text-on-surface-variant" />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-3">
            <Input
              id="new_task"
              value={newTask}
              onChange={e => setNewTask(e.target.value)}
              placeholder="新しいタスクを追加"
              className="!py-2"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addTask())}
            />
            <Button variant="secondary" size="sm" onClick={addTask}>
              <Plus size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Client management */}
      <Card>
        <CardTitle>取引先管理</CardTitle>
        <CardContent className="mt-4 space-y-3">
          <div className="flex flex-wrap gap-2">
            {settings.clients.map((client, idx) => (
              <div key={idx} className="flex items-center gap-1 px-3 py-1.5 bg-surface-container-low rounded-full text-sm">
                <span>{client}</span>
                <button onClick={() => removeClient(idx)} className="p-0.5 hover:bg-surface-container rounded-full">
                  <X size={14} className="text-on-surface-variant" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <Input
              id="new_client"
              value={newClient}
              onChange={e => setNewClient(e.target.value)}
              placeholder="新しい取引先"
              className="!py-2"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addClient())}
            />
            <Button variant="secondary" size="sm" onClick={addClient}>
              <Plus size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bank accounts */}
      <Card>
        <CardTitle>銀行口座設定</CardTitle>
        <CardContent className="mt-4 space-y-3">
          {settings.bank_accounts.map((account, idx) => (
            <div key={idx} className="flex items-center justify-between px-4 py-3 bg-surface-container-low rounded-2xl">
              <span className="text-sm">{account}</span>
              <button onClick={() => removeAccount(idx)} className="p-1 hover:bg-surface-container rounded-full">
                <X size={14} className="text-on-surface-variant" />
              </button>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <Input
              id="new_account"
              value={newAccount}
              onChange={e => setNewAccount(e.target.value)}
              placeholder="例: みずほ銀行 渋谷支店 普通 1234567"
              className="!py-2"
              onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), addAccount())}
            />
            <Button variant="secondary" size="sm" onClick={addAccount}>
              <Plus size={14} />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
