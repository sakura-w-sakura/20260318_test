interface ProgressRingProps {
  percent: number
  size?: number
  strokeWidth?: number
  color?: string
  bgColor?: string
  label?: string
}

export function ProgressRing({
  percent,
  size = 56,
  strokeWidth = 4,
  color = '#0d7377',
  bgColor = '#e5e7eb',
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke={bgColor} strokeWidth={strokeWidth} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <span className="absolute text-xs font-bold text-on-surface">{label}</span>
      )}
    </div>
  )
}
