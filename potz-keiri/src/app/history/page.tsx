'use client'

import { useState, useMemo } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select } from '@/components/ui/input'
import { Filter, Plus, Edit3, Check, Lock, Trash2, Eye } from 'lucide-react'
import { mockAuditLogs } from '@/lib/mock-data'
import { formatDate, cn } from '@/lib/utils'
import type { AuditLog } from '@/types/database'

const actionIcons: Record<string, typeof Plus> = {
  create: Plus,
  update: Edit3,
  approve: Check,
  close: Lock,
  delete: Trash2,
}

const actionLabels: Record<string, string> = {
  create: '作成',
  update: '更新',
  approve: '承認',
  close: '締め',
  delete: '削除',
}

const entityLabels: Record<string, string> = {
  sales: '売上',
  expense: '経費',
  monthly_closing: '月次締め',
  settings: '設定',
}

export default function HistoryPage() {
  const [entityFilter, setEntityFilter] = useState<string>('all')
  const [actionFilter, setActionFilter] = useState<string>('all')

  const filtered = useMemo(() => {
    let result = [...mockAuditLogs]
    if (entityFilter !== 'all') result = result.filter(l => l.entity_type === entityFilter)
    if (actionFilter !== 'all') result = result.filter(l => l.action === actionFilter)
    return result.sort((a, b) => b.created_at.localeCompare(a.created_at))
  }, [entityFilter, actionFilter])

  const actionBadgeVariant = (action: string) => {
    const map: Record<string, 'success' | 'info' | 'warning' | 'error' | 'default'> = {
      create: 'success', update: 'info', approve: 'success', close: 'warning', delete: 'error',
    }
    return map[action] || 'default'
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>操作履歴</h1>
        <p className="text-on-surface-variant mt-1">データの変更履歴と監査ログ</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <Filter size={16} className="text-on-surface-variant" />
        <Select
          options={[
            { value: 'all', label: 'すべてのデータ' },
            { value: 'sales', label: '売上' },
            { value: 'expense', label: '経費' },
            { value: 'monthly_closing', label: '月次締め' },
          ]}
          value={entityFilter}
          onChange={e => setEntityFilter(e.target.value)}
          className="!py-2 !rounded-xl text-sm"
        />
        <Select
          options={[
            { value: 'all', label: 'すべてのアクション' },
            { value: 'create', label: '作成' },
            { value: 'update', label: '更新' },
            { value: 'approve', label: '承認' },
            { value: 'close', label: '締め' },
          ]}
          value={actionFilter}
          onChange={e => setActionFilter(e.target.value)}
          className="!py-2 !rounded-xl text-sm"
        />
        <span className="text-sm text-on-surface-variant ml-auto">{filtered.length}件</span>
      </div>

      {/* Timeline */}
      <div className="space-y-3">
        {filtered.map(log => {
          const Icon = actionIcons[log.action] || Eye
          return (
            <Card key={log.id} variant="flat" className="!p-4">
              <div className="flex items-start gap-4">
                <div className={cn(
                  'w-10 h-10 rounded-2xl flex items-center justify-center shrink-0',
                  log.action === 'create' && 'bg-[#d4edda]',
                  log.action === 'update' && 'bg-[#d6e4ff]',
                  log.action === 'approve' && 'bg-[#d4edda]',
                  log.action === 'close' && 'bg-[#fef3cd]',
                  log.action === 'delete' && 'bg-[#fde8ec]',
                )}>
                  <Icon size={16} className={cn(
                    log.action === 'create' && 'text-success',
                    log.action === 'update' && 'text-info',
                    log.action === 'approve' && 'text-success',
                    log.action === 'close' && 'text-warning',
                    log.action === 'delete' && 'text-error',
                  )} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm">{log.details}</p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-xs text-on-surface-variant">{log.user_name}</span>
                    <span className="text-xs text-on-surface-variant">{formatDate(log.created_at, 'yyyy/MM/dd HH:mm')}</span>
                    <Badge variant={actionBadgeVariant(log.action)}>{actionLabels[log.action]}</Badge>
                    <Badge>{entityLabels[log.entity_type] || log.entity_type}</Badge>
                  </div>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
