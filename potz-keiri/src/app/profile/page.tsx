'use client'

import { PageHeader } from '@/components/layout/page-header'
import { Card } from '@/components/ui/card'
import { HeroCard } from '@/components/ui/hero-card'

const steps = [
  { title: '帳簿の最終確認', desc: '全ての取引が正しく記帳されているか確認します。', status: 'done' as const },
  { title: '決算書類の作成', desc: '貸借対照表、損益計算書を自動生成します。', status: 'done' as const },
  { title: '申告書の作成', desc: '法人税・地方税の申告データを準備しています。', status: 'active' as const },
  { title: '送信・納付', desc: 'e-Tax連携による電子申告と税金の納付を行います。', status: 'pending' as const },
]

function StatusBadge({ status }: { status: 'done' | 'active' | 'pending' }) {
  if (status === 'done') return <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant">完了</span>
  if (status === 'active') return <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary text-white">進行中</span>
  return <span className="text-[10px] px-2 py-0.5 rounded-full bg-surface-container-low text-on-surface-variant">未着手</span>
}

export default function ProfilePage() {
  return (
    <div>
      <PageHeader title="プロフィール" />

      <div className="px-5 space-y-5 pt-4">
        <div>
          <h2 className="text-xl font-bold">決算・申告</h2>
          <p className="text-sm text-on-surface-variant mt-1">2023年度の確定申告プロセスを完了しましょう。</p>
        </div>

        {/* Progress Card */}
        <Card className="!p-5">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-primary tracking-wider">PROGRESS</span>
            <span className="text-3xl font-bold">75%</span>
          </div>
          <div className="w-full h-2.5 bg-surface-container-low rounded-full overflow-hidden">
            <div className="h-full rounded-full gradient-primary" style={{ width: '75%' }} />
          </div>
          <div className="flex items-center gap-2 mt-3">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p className="text-xs text-on-surface-variant">あと一つのステップで申告準備が完了します。</p>
          </div>
        </Card>

        {/* Deadline Hero */}
        <HeroCard className="text-center py-8">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <p className="text-sm text-white/80 mt-2">期限まで</p>
          <p className="text-4xl font-bold mt-1">14 Days</p>
        </HeroCard>

        {/* Filing Steps Timeline */}
        <div>
          <h3 className="text-base font-bold mb-4">申告ステップ</h3>
          <div className="relative pl-8">
            {/* Vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-surface-container-high" />

            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {/* Dot */}
                  <div className={`absolute -left-5 top-3 w-3 h-3 rounded-full border-2 ${
                    step.status === 'done' ? 'bg-primary border-primary' :
                    step.status === 'active' ? 'bg-white border-primary' :
                    'bg-white border-outline-variant'
                  }`} />

                  <Card className={`!p-4 ${step.status === 'active' ? '!bg-[#fff0f2]' : ''}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className={`text-sm ${step.status === 'active' ? 'font-bold' : 'font-semibold'}`}>{step.title}</p>
                        <p className="text-xs text-on-surface-variant mt-1">{step.desc}</p>
                      </div>
                      <StatusBadge status={step.status} />
                    </div>
                    {step.status === 'active' && (
                      <button className="mt-3 w-full py-2.5 rounded-xl gradient-primary text-white text-sm font-semibold flex items-center justify-center gap-1">
                        作成を再開する
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </button>
                    )}
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Expert Support */}
        <Card className="!p-5">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fff0f2] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b90036" strokeWidth="2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm">専門家によるサポートが必要ですか？</p>
              <p className="text-xs text-on-surface-variant mt-1">税理士があなたの申告内容をダブルチェックします。</p>
            </div>
          </div>
          <button className="mt-4 w-full py-2.5 rounded-xl bg-surface-container-low text-sm font-semibold text-on-surface">
            相談を予約
          </button>
        </Card>

        <div className="h-4" />
      </div>
    </div>
  )
}
