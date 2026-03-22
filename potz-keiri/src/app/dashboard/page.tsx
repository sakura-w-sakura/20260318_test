'use client'

import { PageHeader } from '@/components/layout/page-header'
import { HeroCard } from '@/components/ui/hero-card'
import { Card } from '@/components/ui/card'
import { ProgressRing } from '@/components/ui/progress-ring'

export default function HomePage() {
  return (
    <div>
      <PageHeader title="ホーム" />

      <div className="px-5 space-y-5 pt-4">
        {/* Tax Forecast Hero */}
        <HeroCard>
          <div className="flex items-start justify-between">
            <p className="text-sm text-white/80">2024年度 納税予測</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
              <polyline points="7 17 17 7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </div>
          <p className="font-number text-5xl font-semibold mt-3 tracking-tight">¥1,245,800</p>
          <p className="text-sm text-white/70 mt-2">現在のペースに基づく概算納税額</p>
        </HeroCard>

        {/* Monthly Profit Card */}
        <Card className="!p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-on-surface-variant">6月の利益</p>
              <p className="font-number text-3xl font-semibold mt-1">¥428,000</p>
            </div>
            <div className="flex items-end gap-1 h-10">
              <div className="w-3 h-5 rounded-sm bg-teal opacity-60" />
              <div className="w-3 h-7 rounded-sm bg-teal opacity-80" />
              <div className="w-3 h-4 rounded-sm bg-teal opacity-60" />
              <div className="w-3 h-10 rounded-sm bg-primary" />
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-teal" />
              収入
            </span>
            <span className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <span className="w-2 h-2 rounded-full bg-primary" />
              支出
            </span>
          </div>
        </Card>

        {/* Action Cards */}
        <Card variant="interactive" className="!p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#e0f5f5] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0d7377" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="16" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">新規入力</p>
              <p className="text-xs text-on-surface-variant">取引を記録する</p>
            </div>
          </div>
        </Card>

        <Card variant="interactive" className="!p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f0e8ff] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
              </svg>
            </div>
            <div>
              <p className="font-semibold text-sm">シミュレーション</p>
              <p className="text-xs text-on-surface-variant">シナリオを実行</p>
            </div>
          </div>
        </Card>

        {/* Tax Saving Missions */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold">節税ミッション</h2>
            <button className="text-sm text-primary font-medium">すべて見る</button>
          </div>

          <div className="space-y-3">
            <Card className="!p-4">
              <div className="flex items-center gap-4">
                <ProgressRing percent={70} color="#0d7377" label="70%" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">iDeCo 拠出</p>
                  <p className="text-xs text-on-surface-variant">目標: ¥276,000 / 年</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c4c4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Card>

            <Card className="!p-4">
              <div className="flex items-center gap-4">
                <ProgressRing percent={30} color="#7c3aed" label="30%" />
                <div className="flex-1">
                  <p className="font-semibold text-sm">ふるさと納税</p>
                  <p className="text-xs text-on-surface-variant">目標: ¥150,000 / 年</p>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c4c4c4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </Card>
          </div>
        </div>

        <div className="h-4" />
      </div>
    </div>
  )
}
