'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/layout/page-header'
import { HeroCard } from '@/components/ui/hero-card'
import { Card } from '@/components/ui/card'
import { SliderInput } from '@/components/ui/slider-input'

export default function ForecastPage() {
  const [income, setIncome] = useState(6500000)
  const [ideco, setIdeco] = useState(276000)
  const [furusato, setFurusato] = useState(80000)
  const [shoukibo, setShoukibo] = useState(true)
  const [shoukiboAmount] = useState(70000)

  const taxSaving = 142500

  return (
    <div>
      <PageHeader title="税金シミュレーター" />

      <div className="px-5 space-y-5 pt-4">
        {/* Hero: Tax Saving Estimate */}
        <HeroCard>
          <p className="text-sm text-white/80">節税見込み額</p>
          <div className="flex items-baseline gap-1 mt-2">
            <p className="font-number text-5xl font-semibold tracking-tight">¥{taxSaving.toLocaleString()}</p>
            <span className="text-lg text-white/80">/年</span>
          </div>
          <p className="text-sm text-white/70 mt-2">現在の入力内容に基づくと、これらの最適化により納税負担を大幅に軽減できる可能性があります。</p>
        </HeroCard>

        {/* Annual Income */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-base font-bold">年収</p>
            <p className="font-number text-xl font-semibold text-primary">¥{income.toLocaleString()}</p>
          </div>
          <SliderInput value={income} min={2000000} max={20000000} step={100000} onChange={setIncome} />
          <div className="flex justify-between mt-1">
            <span className="text-xs text-on-surface-variant">最小 ¥200万</span>
            <span className="text-xs text-on-surface-variant">最大 ¥2000万</span>
          </div>
        </div>

        {/* iDeCo */}
        <Card className="!p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#fff0f2] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b90036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
                <path d="M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">iDeCo</p>
              <p className="text-xs text-on-surface-variant">個人型確定拠出年金</p>
            </div>
            <p className="font-number text-lg font-semibold text-primary">¥{ideco.toLocaleString()}</p>
          </div>
          <SliderInput value={ideco} min={0} max={816000} step={1000} onChange={setIdeco} />
          <p className="text-xs text-on-surface-variant mt-4 leading-relaxed">
            掛金は全額所得控除の対象です。将来に備えるほど、現在の税金を抑えることができます。
          </p>
        </Card>

        {/* Furusato Nozei */}
        <Card className="!p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-[#fef3cd] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d4a017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 7h-3a2 2 0 0 1-2-2V2" />
                <path d="M16 2H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">ふるさと納税</p>
              <p className="text-xs text-on-surface-variant">自治体への寄附金</p>
            </div>
            <p className="font-number text-lg font-semibold text-primary">¥{furusato.toLocaleString()}</p>
          </div>
          <SliderInput value={furusato} min={0} max={300000} step={1000} onChange={setFurusato} />
          <p className="text-xs text-on-surface-variant mt-4 leading-relaxed">
            実質負担2,000円で地方自治体を応援し、返礼品を受け取ることができます。
          </p>
        </Card>

        {/* Shoukibo Kigyou Kyousai */}
        <Card className="!p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#fff0f2] flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#b90036" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="7" width="20" height="14" rx="2" />
                <path d="M16 7V5a4 4 0 0 0-8 0v2" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">小規模企業共済</p>
              <p className="text-xs text-on-surface-variant">経営者のための退職金制度</p>
            </div>
            <button
              onClick={() => setShoukibo(!shoukibo)}
              className={`toggle-switch ${shoukibo ? 'active' : ''}`}
            />
          </div>
          {shoukibo && (
            <div className="flex items-center justify-between mt-4 pt-4" style={{ borderTop: '1px solid #f2f0f0' }}>
              <p className="text-sm text-on-surface-variant">月額掛金</p>
              <p className="font-number text-lg font-semibold">¥{shoukiboAmount.toLocaleString()}</p>
            </div>
          )}
        </Card>

        {/* Tax Advice */}
        <Card className="!p-5">
          <div className="flex items-start gap-2">
            <span className="text-lg">💡</span>
            <div>
              <p className="font-bold text-sm mb-2">節税のアドバイス</p>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                あなたの現在の所得税率は <span className="font-semibold text-primary">20%</span> です。iDeCoの掛金を月5,000円増やすだけで、将来に備えながらより効率的な節税効果が得られます。
              </p>
            </div>
          </div>
        </Card>

        <div className="h-4" />
      </div>
    </div>
  )
}
