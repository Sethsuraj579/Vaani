import clsx from 'clsx'

export function Badge({ children, color = '#8e8e8e', dot = false, className }) {
  return (
    <span
      className={clsx('console-badge inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide', className)}
      style={{ background: `${color}1f`, color, border: `1px solid ${color}40` }}
    >
      {dot && <span className="size-1.5 rounded-full" style={{ background: color }} />}
      {children}
    </span>
  )
}
