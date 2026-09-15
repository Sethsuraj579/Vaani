import { NavLink, Link } from 'react-router-dom'
import { LayoutDashboard, PhoneCall, BellRing, History, Link2 } from 'lucide-react'
import clsx from 'clsx'

const NAV = [
  { to: '/dashboard',        label: 'Dashboard',  Icon: LayoutDashboard, end: true },
  { to: '/live',              label: 'Live Call',  Icon: PhoneCall },
  { to: '/alerts',            label: 'Alerts',     Icon: BellRing },
  { to: '/history',           label: 'History',    Icon: History },
  { to: '/blockchain',        label: 'Audit Chain',Icon: Link2 },
]

export function Sidebar() {
  return (
    <aside className="hidden lg:flex w-57 shrink-0 flex-col border-r border-line bg-surface/70 px-3 py-5">
      <Link to="/" className="flex items-center gap-2.5 px-2 pb-6">
        <div className="grid size-9 place-items-center rounded-full bg-white text-black font-bold">S</div>
        <div className="leading-tight">
          <p className="text-[13.5px] font-semibold tracking-tight">SentinelVox</p>
          <p className="text-[10.5px] text-muted">Voice Security</p>
        </div>
      </Link>

      <nav className="flex flex-col gap-1">
        {NAV.map(({ to, label, Icon, end }) => (
          <NavLink
            key={to} to={to} end={end}
            className={({ isActive }) => clsx(
              'flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition-colors',
              isActive
                ? 'bg-pill text-white'
                : 'text-muted hover:text-white hover:bg-white/5'
            )}
          >
            <Icon size={16} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-xl border border-line bg-surface-2/60 p-3">
        <p className="text-[10.5px] uppercase tracking-wider text-muted">Model</p>
        <p className="mt-1 text-[12.5px] font-medium">model-v1</p>
        <p className="mt-2 text-[10.5px] text-muted">
          Fabric audit: <span className="text-safe">online</span>
        </p>
      </div>
    </aside>
  )
}
