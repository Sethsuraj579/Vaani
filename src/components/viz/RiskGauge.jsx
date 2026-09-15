const START = -120
const END   =  120

function polar(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]
}
function arc(cx, cy, r, a0, a1) {
  const [x1, y1] = polar(cx, cy, r, a0)
  const [x2, y2] = polar(cx, cy, r, a1)
  const large = a1 - a0 > 180 ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
}

export function RiskGauge({ value = 0, level, size = 240 }) {
  const pct = Math.max(0, Math.min(100, value))
  const cx = size / 2, cy = size / 2, r = size / 2 - 22
  const color = level?.color ?? '#ffffff'

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-0">
        <path d={arc(cx, cy, r, START, END)} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="13" strokeLinecap="round" />
        <path
          d={arc(cx, cy, r, START, END)}
          fill="none" stroke={color} strokeWidth="13" strokeLinecap="round"
          pathLength="100"
          strokeDasharray={`${pct} 100`}
          style={{ transition: 'stroke-dasharray 600ms cubic-bezier(.22,1,.36,1), stroke 400ms', filter: `drop-shadow(0 0 10px ${color}55)` }}
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center -mt-3">
        <span className="tabular text-[46px] font-semibold leading-none" style={{ color }}>
          {pct.toFixed(1)}
        </span>
        <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Risk Score
        </span>
        {level && (
          <span className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color }}>
            {level.key}
          </span>
        )}
      </div>
    </div>
  )
}
