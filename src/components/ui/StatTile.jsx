export function StatTile({ label, value, suffix = '', decimals = 0, accent = '#ffffff', hint }) {
  return (
    <div className="console-stat rounded-2xl border border-line bg-surface-2/60 px-4 py-3.5">
      <p className="text-[11px] uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1.5 tabular text-[26px] font-semibold leading-none" style={{ color: accent }}>
        {Number(value).toFixed(decimals)}
        <span className="ml-0.5 text-[15px] font-medium opacity-70">{suffix}</span>
      </p>
      {hint && <p className="mt-1 text-[11px] text-muted">{hint}</p>}
    </div>
  )
}
