'use client'

interface SliderInputProps {
  value: number
  min: number
  max: number
  step?: number
  onChange: (value: number) => void
}

export function SliderInput({ value, min, max, step = 1, onChange }: SliderInputProps) {
  const percent = ((value - min) / (max - min)) * 100

  return (
    <div className="relative w-full">
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="slider-input w-full"
        style={{
          background: `linear-gradient(to right, #b90036 0%, #b90036 ${percent}%, #e5e7eb ${percent}%, #e5e7eb 100%)`,
        }}
      />
    </div>
  )
}
