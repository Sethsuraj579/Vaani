export function DecisionPill({ level, size = 'md' }) {
  const pad = size === 'lg' ? 'px-4 py-2 text-[13px]' : 'px-3 py-1.5 text-[11.5px]'
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-semibold uppercase tracking-[0.14em] ${pad}`}
      style={{ background: `${level.color}1f`, color: level.color, border: `1px solid ${level.color}59` }}
    >
      <span className="size-1.5 rounded-full" style={{ background: level.color }} />
      {level.decision}
    </span>
  )
}
