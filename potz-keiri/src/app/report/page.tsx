'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { HeroCard } from '@/components/ui/hero-card'

const months = ['1月', '2月', '3月', '4月', '5月']

const expenses = [
  { icon: '🍴', label: '食費・ライフスタイル', percent: 42, color: '#0d7377' },
  { icon: '🏠', label: '家賃・光熱費', percent: 31, color: '#7c3aed' },
  { icon: '🚃', label: '交通費', percent: 18, color: '#b90036' },
]

function IncomeExpenseChart() {
  // Simplified line chart representation
  const incomePoints = [30, 35, 40, 55, 80]
  const expensePoints = [25, 28, 32, 30, 35]
  const maxVal = 100
  const width = 300
  const height = 160
  const padding = 20

  const toPath = (points: number[]) => {
    return points.map((p, i) => {
      const x = padding + (i / (points.length - 1)) * (width - padding * 2)
      const y = height - padding - (p / maxVal) * (height - padding * 2)
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    }).join(' ')
  }

  return (
    <svg viewBox={`0 0 ${width} ${height + 30}`} className="w-full">
      {/* Grid lines */}
      {[0, 1, 2, 3].map(i => (
        <line key={i} x1={padding} y1={padding + i * 35} x2={width - padding} y2={padding + i * 35} stroke="#f2f0f0" strokeWidth="1" />
      ))}
      {/* Expense line (dashed gray) */}
      <path d={toPath(expensePoints)} fill="none" stroke="#c4c4c4" strokeWidth="2" strokeDasharray="6 4" />
      {/* Income area fill */}
      <path d={`${toPath(incomePoints)} L ${width - padding} ${height - padding} L ${padding} ${height - padding} Z`} fill="rgba(185, 0, 54, 0.06)" />
      {/* Income line (solid red) */}
      <path d={toPath(incomePoints)} fill="none" stroke="#b90036" strokeWidth="2.5" />
      {/* Month labels */}
      {months.map((m, i) => (
        <text key={m} x={padding + (i / (months.length - 1)) * (width - padding * 2)} y={height + 15} textAnchor="middle" className="text-[11px] fill-on-surface-variant">{m}</text>
      ))}
    </svg>
  )
}

function CashFlowBars() {
  const weeks = [
    { label: '第1週', heights: [60, 45] },
    { label: '第2週', heights: [55, 50] },
    { label: '第3週', heights: [70, 40] },
  ]

  return (
    <div className="flex items-end justify-center gap-6 h-28">
      {weeks.map((week) => (
        <div key={week.label} className="flex flex-col items-center gap-1">
          <div className="flex items-end gap-1">
            {week.heights.map((h, i) => (
              <div key={i} className="w-5 rounded-t-md" style={{ height: h, background: i === 0 ? 'rgba(185, 0, 54, 0.15)' : 'rgba(185, 0, 54, 0.3)' }} />
            ))}
          </div>
          <span className="text-[10px] text-on-surface-variant mt-1">{week.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function ReportPage() {
  const [tab, setTab] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div>
      <PageHeader title="レポート" />

      <div className="px-5 space-y-5 pt-4">
        {/* Tab Switcher */}
        <div className="flex items-center justify-center gap-1 bg-surface-container-low rounded-full p-1 w-48 mx-auto">
          <button
            onClick={() => setTab('monthly')}
            className={`flex-1 text-sm font-medium py-1.5 rounded-full transition-colors ${tab === 'monthly' ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            月次
          </button>
          <button
            onClick={() => setTab('yearly')}
            className={`flex-1 text-sm font-medium py-1.5 rounded-full transition-colors ${tab === 'yearly' ? 'text-primary' : 'text-on-surface-variant'}`}
          >
            年次
          </button>
        </div>

        {/* Income/Expense Chart */}
        <Card className="!p-5">
          <div className="flex items-center justify-between mb-1">
            <p className="text-xs text-on-surface-variant">財務状況</p>
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-primary" /> 収入
              </span>
              <span className="flex items-center gap-1 text-[10px] text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-outline-variant" /> 支出
              </span>
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2">収支推移</h3>
          <IncomeExpenseChart />
        </Card>

        {/* Achievement Card */}
        <HeroCard>
          <div className="flex items-start gap-2 mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>
          <p className="text-lg font-semibold leading-snug">昨年と比較して、今月は¥20,000多く節約できました！</p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-white/20 text-xs font-medium">成長マインドセット</span>
        </HeroCard>

        {/* Top Expenses */}
        <Card className="!p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold">主な支出</h3>
            <button className="text-on-surface-variant">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="5" cy="12" r="2" />
                <circle cx="12" cy="12" r="2" />
                <circle cx="19" cy="12" r="2" />
              </svg>
            </button>
          </div>
          <div className="space-y-4">
            {expenses.map((exp) => (
              <div key={exp.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="flex items-center gap-2 text-sm">
                    <span>{exp.icon}</span>
                    {exp.label}
                  </span>
                  <span className="text-sm font-semibold">{exp.percent}%</span>
                </div>
                <div className="w-full h-2 bg-surface-container-low rounded-full">
                  <div className="h-full rounded-full" style={{ width: `${exp.percent}%`, backgroundColor: exp.color }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Cash Flow Stability */}
        <Card className="!p-5">
          <h3 className="text-base font-bold mb-4">キャッシュフロー安定性</h3>
          <CashFlowBars />
        </Card>

        <div className="h-4" />
      </div>
    </div>
  )
}
