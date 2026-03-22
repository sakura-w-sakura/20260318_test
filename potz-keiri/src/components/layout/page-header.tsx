'use client'

export function PageHeader({ title }: { title: string }) {
  return (
    <header className="flex items-center justify-between px-5 pt-4 pb-2">
      <div className="w-10 h-10 rounded-full bg-[#f5d5c8] flex items-center justify-center overflow-hidden">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="8" r="4" fill="#d4956b" />
          <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" fill="#d4956b" />
        </svg>
      </div>
      <h1 className="text-lg font-bold text-primary">{title}</h1>
      <button className="w-10 h-10 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2e2f2f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      </button>
    </header>
  )
}
