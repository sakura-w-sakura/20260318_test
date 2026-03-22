'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    const success = login(email, password)
    if (success) {
      router.push('/dashboard')
    } else {
      setError('メールアドレスが見つかりません')
    }
  }

  const quickLogin = (email: string) => {
    login(email, 'demo')
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="text-center mb-10">
          <div className="w-16 h-16 gradient-primary rounded-3xl flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
            P
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
            POTZ KEIRI
          </h1>
          <p className="text-on-surface-variant mt-1">社内経理補完ツール</p>
        </div>

        {/* Login form */}
        <div className="bg-surface-container-lowest rounded-3xl shadow-ambient p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              id="email"
              label="メールアドレス"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
            />
            <Input
              id="password"
              label="パスワード"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="パスワード"
            />
            {error && <p className="text-sm text-error">{error}</p>}
            <Button type="submit" className="w-full" size="lg">
              ログイン
            </Button>
          </form>
        </div>

        {/* Quick login for demo */}
        <div className="mt-8 bg-surface-container-low rounded-3xl p-6">
          <p className="text-xs text-on-surface-variant mb-3 text-center">デモ用クイックログイン</p>
          <div className="space-y-2">
            <button
              onClick={() => quickLogin('ceo@potz.co.jp')}
              className="w-full px-4 py-3 bg-surface-container-lowest rounded-2xl text-left hover:bg-surface-container transition-colors"
            >
              <span className="text-sm font-medium">代表取締役（管理者）</span>
              <span className="text-xs text-on-surface-variant ml-2">ceo@potz.co.jp</span>
            </button>
            <button
              onClick={() => quickLogin('director@potz.co.jp')}
              className="w-full px-4 py-3 bg-surface-container-lowest rounded-2xl text-left hover:bg-surface-container transition-colors"
            >
              <span className="text-sm font-medium">取締役</span>
              <span className="text-xs text-on-surface-variant ml-2">director@potz.co.jp</span>
            </button>
            <button
              onClick={() => quickLogin('part@potz.co.jp')}
              className="w-full px-4 py-3 bg-surface-container-lowest rounded-2xl text-left hover:bg-surface-container transition-colors"
            >
              <span className="text-sm font-medium">パートタイム</span>
              <span className="text-xs text-on-surface-variant ml-2">part@potz.co.jp</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
