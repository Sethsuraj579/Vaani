const ROWS = [
  { key: 'deepfake',  label: 'Deepfake Probability', weight: '0.50' },
  { key: 'speaker',   label: 'Speaker Mismatch',     weight: '0.30' },
  { key: 'context',   label: 'Context Risk',         weight: '0.20' },
]

export function SignalBars({ signals }) {
  return (
    <div className="flex flex-col gap-3.5">
      {ROWS.map(({ key, label, weight }) => {
        const v = Math.max(0, Math.min(100, signals[key] ?? 0))
        const color = v >= 90 ? '#ef4444' : v >= 76 ? '#fb923c' : v >= 56 ? '#fbbf24' : v >= 31 ? '#38bdf8' : '#10b981'
        return (
          <div key={key}>
            <div className="flex items-baseline justify-between text-[12px]">
              <span className="text-white/80">{label}</span>
              <span className="tabular text-muted">
                <span className="text-white/90 font-semibold">{v.toFixed(1)}</span>
                <span className="ml-2 opacity-60">w {weight}</span>
              </span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/6">
              <div
                className="h-full rounded-full"
                style={{ width: `${v}%`, background: color, transition: 'width 600ms cubic-bezier(.22,1,.36,1), background 400ms' }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
