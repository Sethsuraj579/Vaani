import { ShieldAlert } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { mockAlerts } from '../data/mock'
import { relTime } from '../lib/format'

const SEVERITY_COLOR = {
  CRITICAL: '#ef4444', HIGH: '#fb923c', SUSPICIOUS: '#fbbf24', LOW: '#38bdf8',
}

export default function Alerts() {
  return (
    <div className="mx-auto flex max-w-275 flex-col gap-5">
      <Card title="Security Alerts" subtitle="Ordered by recency" right={<Badge color="#fb923c">{mockAlerts.length} open</Badge>}>
        <ul className="flex flex-col divide-y divide-line">
          {mockAlerts.map(a => {
            const c = SEVERITY_COLOR[a.severity] ?? '#8e8e8e'
            return (
              <li key={a.id} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                <div className="grid size-9 shrink-0 place-items-center rounded-xl" style={{ background: `${c}1f`, border: `1px solid ${c}40` }}>
                  <ShieldAlert size={15} style={{ color: c }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-medium">{a.title}</p>
                    <Badge color={c}>{a.severity}</Badge>
                    <span className="text-[11px] text-muted">{a.call_id}</span>
                  </div>
                  <p className="mt-1 text-[12px] text-muted">{a.detail}</p>
                </div>
                <span className="shrink-0 text-[11px] text-muted">{relTime(a.at)}</span>
              </li>
            )
          })}
        </ul>
      </Card>
    </div>
  )
}
