import clsx from 'clsx'

export function Card({ title, subtitle, right, className, children }) {
  return (
    <section className={clsx(
      'console-card rounded-2xl border border-line bg-surface-2/60 backdrop-blur-sm',
      'p-5 flex flex-col gap-4', className
    )}>
      {(title || right) && (
        <header className="console-card-header flex items-start justify-between gap-3">
          <div className="console-card-heading">
            {title && <h3 className="console-card-title text-[13px] font-semibold tracking-wide text-white/90 uppercase">{title}</h3>}
            {subtitle && <p className="text-[11.5px] text-muted mt-1">{subtitle}</p>}
          </div>
          {right && <div className="console-card-status">{right}</div>}
        </header>
      )}
      {children}
    </section>
  )
}
