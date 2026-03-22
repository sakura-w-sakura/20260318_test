'use client'

import { useMemo } from 'react'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Line, ComposedChart, Area } from 'recharts'
import { TrendingUp, AlertTriangle, Wallet, Calculator } from 'lucide-react'
import { mockSales, mockExpenses, mockSettings } from '@/lib/mock-data'
import { formatCurrency, cn } from '@/lib/utils'

export default function ForecastPage() {
  const taxRate = mockSettings.tax_rate

  // 月次データ集計
  const monthlyData = useMemo(() => {
    const months = ['2025-08', '2025-09', '2025-10', '2025-11', '2025-12', '2026-01', '2026-02', '2026-03']
    return months.map(month => {
      const sales = mockSales
        .filter(s => s.invoice_date.startsWith(month))
        .reduce((sum, s) => sum + s.amount, 0)
      const expenses = mockExpenses
        .filter(e => e.date.startsWith(month) && (e.status === 'approved' || e.status === 'paid'))
        .reduce((sum, e) => sum + e.amount, 0)
      const profit = sales - expenses
      return {
        month: `${parseInt(month.split('-')[1])}月`,
        売上: sales,
        経費: expenses,
        利益: profit,
      }
    })
  }, [])

  // 今期累計（8月〜7月）
  const totalSales = mockSales.reduce((sum, s) => sum + s.amount, 0)
  const totalExpenses = mockExpenses
    .filter(e => e.status === 'approved' || e.status === 'paid')
    .reduce((sum, e) => sum + e.amount, 0)
  const estimatedProfit = totalSales - totalExpenses
  const estimatedTax = Math.round(estimatedProfit * (taxRate / 100))
  const estimatedCash = estimatedProfit - estimatedTax

  // 今月
  const currentMonth = '2026-03'
  const thisMonthSales = mockSales.filter(s => s.invoice_date.startsWith(currentMonth)).reduce((sum, s) => sum + s.amount, 0)
  const thisMonthExpenses = mockExpenses.filter(e => e.date.startsWith(currentMonth) && (e.status === 'approved' || e.status === 'paid')).reduce((sum, e) => sum + e.amount, 0)
  const thisMonthProfit = thisMonthSales - thisMonthExpenses

  // 利益アラート（100万円超でアラート）
  const profitAlert = estimatedProfit > 1000000

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>概算利益・納税予測</h1>
        <p className="text-on-surface-variant mt-1">今期の利益概算と納税予測（決算月：7月）</p>
      </div>

      {profitAlert && (
        <div className="flex items-center gap-3 px-5 py-4 bg-[#fef3cd] rounded-2xl">
          <AlertTriangle size={20} className="text-warning shrink-0" />
          <div>
            <p className="text-sm font-semibold text-warning">利益アラート</p>
            <p className="text-xs text-on-surface-variant mt-0.5">
              概算利益が100万円を超えています。税理士との相談を検討してください。
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant">今期累計売上</span>
              <div className="w-10 h-10 bg-[#d4edda] rounded-2xl flex items-center justify-center">
                <TrendingUp size={18} className="text-success" />
              </div>
            </div>
            <p className="text-2xl font-bold font-number">{formatCurrency(totalSales)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant">今期累計経費</span>
              <div className="w-10 h-10 bg-[#fef3cd] rounded-2xl flex items-center justify-center">
                <Calculator size={18} className="text-warning" />
              </div>
            </div>
            <p className="text-2xl font-bold font-number">{formatCurrency(totalExpenses)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant">概算利益</span>
              <div className={cn('w-10 h-10 rounded-2xl flex items-center justify-center', estimatedProfit >= 0 ? 'bg-[#d4edda]' : 'bg-[#fde8ec]')}>
                <TrendingUp size={18} className={estimatedProfit >= 0 ? 'text-success' : 'text-error'} />
              </div>
            </div>
            <p className={cn('text-2xl font-bold font-number', estimatedProfit < 0 && 'text-error')}>
              {formatCurrency(estimatedProfit)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-on-surface-variant">納税予測額</span>
              <div className="w-10 h-10 bg-[#fde8ec] rounded-2xl flex items-center justify-center">
                <Wallet size={18} className="text-error" />
              </div>
            </div>
            <p className="text-2xl font-bold font-number">{formatCurrency(estimatedTax)}</p>
            <p className="text-xs text-on-surface-variant mt-1">税率 {taxRate}%（簡易計算）</p>
          </CardContent>
        </Card>
      </div>

      {/* 手元キャッシュ予測 */}
      <Card className="bg-surface-container-lowest">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-on-surface-variant mb-1">手元キャッシュ予測</p>
            <p className="text-3xl font-bold font-number">{formatCurrency(estimatedCash)}</p>
            <p className="text-xs text-on-surface-variant mt-2">概算利益 − 納税予測額 = 実質的な手元資金の目安</p>
          </div>
          <div className="text-right">
            <Badge variant={estimatedCash > 0 ? 'success' : 'error'}>
              {estimatedCash > 0 ? 'プラス' : 'マイナス'}
            </Badge>
          </div>
        </div>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Monthly P&L chart */}
        <Card>
          <CardTitle className="mb-4">月次 売上・経費・利益推移</CardTitle>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e9e8e7" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b6c6c' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: '#6b6c6c' }} axisLine={false} tickLine={false}
                    tickFormatter={(v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${(v / 1000).toFixed(0)}K` : String(v)} />
                  <Tooltip
                    formatter={(value) => formatCurrency(Number(value))}
                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 40px rgba(46,47,47,0.08)' }}
                  />
                  <Bar dataKey="売上" fill="#b90036" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="経費" fill="#ff7481" radius={[6, 6, 0, 0]} />
                  <Line type="monotone" dataKey="利益" stroke="#2d8a4e" strokeWidth={2} dot={{ fill: '#2d8a4e', r: 4 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly profit table */}
        <Card>
          <CardTitle className="mb-4">月次利益一覧</CardTitle>
          <CardContent>
            <div className="space-y-2">
              {monthlyData.filter(d => d.売上 > 0 || d.経費 > 0).map(d => (
                <div key={d.month} className="flex items-center justify-between px-4 py-3 bg-surface-container-low rounded-2xl">
                  <span className="text-sm font-medium">{d.month}</span>
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-on-surface-variant">売上 <span className="font-number font-bold text-on-surface">{formatCurrency(d.売上)}</span></span>
                    <span className="text-on-surface-variant">経費 <span className="font-number font-bold text-on-surface">{formatCurrency(d.経費)}</span></span>
                    <span className={cn('font-number font-bold', d.利益 >= 0 ? 'text-success' : 'text-error')}>
                      {formatCurrency(d.利益)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Disclaimer */}
      <div className="text-center py-4">
        <p className="text-xs text-outline">
          ※ 本画面の数値は概算であり、厳密な会計処理は含みません。最終的な納税額は税理士にご確認ください。
        </p>
      </div>
    </div>
  )
}
