'use client'

import { useMemo } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card, CardTitle, CardContent } from '@/components/ui/card'
import type { SalesRecord } from '@/types/database'
import { getSalesCategoryLabel, formatCurrency } from '@/lib/utils'

const CATEGORY_COLORS: Record<string, string> = {
  rfid: '#b90036',
  pc: '#ff7481',
  construction: '#d4a017',
  other: '#8e8f8f',
}

interface SalesChartProps {
  sales: SalesRecord[]
}

export function SalesChart({ sales }: SalesChartProps) {
  const monthlyData = useMemo(() => {
    const map = new Map<string, number>()
    sales.forEach(s => {
      const month = s.invoice_date.substring(0, 7)
      map.set(month, (map.get(month) || 0) + s.amount)
    })
    return Array.from(map.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-6)
      .map(([month, amount]) => ({
        month: `${parseInt(month.split('-')[1])}月`,
        amount,
      }))
  }, [sales])

  const categoryData = useMemo(() => {
    const currentMonth = new Date().toISOString().substring(0, 7)
    const thisMonth = sales.filter(s => s.invoice_date.startsWith(currentMonth))
    const map = new Map<string, number>()
    thisMonth.forEach(s => {
      map.set(s.category, (map.get(s.category) || 0) + s.amount)
    })
    return Array.from(map.entries()).map(([category, amount]) => ({
      name: getSalesCategoryLabel(category as any),
      value: amount,
      color: CATEGORY_COLORS[category] || '#8e8f8f',
    }))
  }, [sales])

  const formatYAxis = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`
    return String(value)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      {/* Monthly bar chart */}
      <Card className="lg:col-span-2">
        <CardTitle className="mb-4">月別売上推移</CardTitle>
        <CardContent>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e9e8e7" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#6b6c6c' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#6b6c6c' }} axisLine={false} tickLine={false} tickFormatter={formatYAxis} />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value))}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 40px rgba(46,47,47,0.08)' }}
                />
                <Bar dataKey="amount" fill="#b90036" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Category pie chart */}
      <Card>
        <CardTitle className="mb-4">カテゴリ別売上</CardTitle>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%" cy="50%"
                  innerRadius={50} outerRadius={80}
                  dataKey="value"
                  paddingAngle={4}
                >
                  {categoryData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-3">
            {categoryData.map(cat => (
              <div key={cat.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                  <span>{cat.name}</span>
                </div>
                <span className="font-number font-semibold">{formatCurrency(cat.value)}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
