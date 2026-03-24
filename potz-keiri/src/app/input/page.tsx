'use client'

import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'

const activities = [
  { icon: '🍴', iconBg: '#fce4ec', name: 'アトリエ・グリル', date: '昨日 20:45', amount: -21375 },
  { icon: '🚃', iconBg: '#e8eaf6', name: 'グローバルトランジット', date: '昨日 09:20', amount: -6750 },
  { icon: '⚡', iconBg: '#f3e5f5', name: '中央電力', date: '2024年6月24日', amount: -31620 },
  { icon: '💼', iconBg: '#e8f5e9', name: 'テック・シナジー合同会社', date: '2024年6月22日', amount: 525000 },
]

const categories = [
  { label: '住居費', color: '#b90036' },
  { label: 'ライフスタイル', color: '#0d7377' },
  { label: '光熱費', color: '#7c3aed' },
  { label: 'その他', color: '#8e8f8f' },
]

function DonutChart() {
  const segments = [
    { percent: 35, color: '#b90036' },
    { percent: 30, color: '#0d7377' },
    { percent: 20, color: '#7c3aed' },
    { percent: 15, color: '#d1d0cf' },
  ]

  const radius = 70
  const strokeWidth = 14
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180">
        {segments.map((seg, i) => {
          const dash = (seg.percent / 100) * circumference
          const currentOffset = offset
          offset += dash
          return (
            <circle
              key={i}
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke={seg.color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={-currentOffset}
              strokeLinecap="round"
              className="-rotate-90 origin-center"
            />
          )
        })}
      </svg>
      <div className="absolute text-center">
        <p className="font-number text-3xl font-bold">¥642,000</p>
        <p className="text-xs text-on-surface-variant">支出合計</p>
      </div>
    </div>
  )
}

export default function InputPage() {
  return (
    <div>
      <PageHeader title="入力" />

      <div className="px-5 space-y-5 pt-2">
        <div>
          <p className="text-xs text-on-surface-variant">財務状況スナップショット</p>
          <h2 className="text-xl font-bold mt-1">6月の概要</h2>
        </div>

        {/* Donut Chart Card */}
        <Card className="!p-6 flex flex-col items-center">
          <DonutChart />
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4 w-full">
            {categories.map((cat) => (
              <span key={cat.label} className="flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: cat.color }} />
                {cat.label}
              </span>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">最近の活動</h2>
            <button className="text-sm text-primary font-medium">すべて見る</button>
          </div>

          <div className="space-y-3">
            {activities.map((item, i) => (
              <Card key={i} className="!p-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg" style={{ backgroundColor: item.iconBg }}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{item.name}</p>
                    <p className="text-xs text-on-surface-variant">{item.date}</p>
                  </div>
                  <p className={`font-number text-base font-bold whitespace-nowrap ${item.amount < 0 ? 'text-primary' : 'text-teal'}`}>
                    {item.amount < 0 ? '-' : '+'}¥{Math.abs(item.amount).toLocaleString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Camera FAB */}
      <button className="fixed bottom-24 right-[calc(50%-195px)] w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-40">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      </button>
    </div>
  )
}
