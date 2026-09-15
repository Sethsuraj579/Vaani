import { Activity, ShieldAlert, BellRing } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { StatTile } from '../components/ui/StatTile'
import { RiskGauge } from '../components/viz/RiskGauge'
import { SignalBars } from '../components/viz/SignalBars'
import { RiskTimeline } from '../components/viz/RiskTimeline'
import { DecisionPill } from '../components/viz/DecisionPill'
import { useLiveRisk } from '../hooks/useLiveRisk'
import { INTENT_POLICY } from '../lib/risk'
import { mockAlerts, mockBlockchainEvents } from '../data/mock'
import { relTime, shortHash } from '../lib/format'

export default function Dashboard() {
  const { risk, raw, level, signals, timeline, callId } = useLiveRisk({
    callId: 'CALL-1001',
    useMock: true,
  })

  const intentRisk = INTENT_POLICY[signals.intent] ?? 0
  const recentAlerts = mockAlerts.slice(0, 4)
  const recentEvents = mockBlockchainEvents.slice(0, 3)

  return (
    <div className="mx-auto flex max-w-350 flex-col gap-5">

      {/* Row 1 — headline metrics */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatTile label="Active Session"   value={1}  hint={callId} accent="#ffffff" />
        <StatTile label="Inference Time"   value={120} suffix="ms"  accent="#38bdf8" hint="per 2–3 s window" />
        <StatTile label="Platform Uptime"  value={99.99} decimals={2} suffix="%" accent="#10b981" hint="rolling 30 d" />
        <StatTile label="Blockchain Txns"  value={mockBlockchainEvents.length} accent="#fbbf24" hint="confirmed on Fabric" />
      </div>

      {/* Row 2 — gauge + signals */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,420px)_minmax(0,1fr)]">
        <Card
          title="Live Risk Meter"
          subtitle="Weighted fusion · R = 0.50D + 0.30S + 0.20C"
          right={<DecisionPill level={level} />}
        >
          <div className="flex flex-col items-center gap-4">
            <RiskGauge value={risk} level={level} />
            <div className="grid w-full grid-cols-3 gap-2 text-center">
              <div className="rounded-xl border border-line bg-surface/60 py-2.5">
                <p className="text-[10.5px] uppercase tracking-wider text-muted">Raw</p>
                <p className="tabular mt-0.5 text-[15px] font-semibold">{raw.toFixed(1)}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface/60 py-2.5">
                <p className="text-[10.5px] uppercase tracking-wider text-muted">Smoothed</p>
                <p className="tabular mt-0.5 text-[15px] font-semibold">{risk.toFixed(1)}</p>
              </div>
              <div className="rounded-xl border border-line bg-surface/60 py-2.5">
                <p className="text-[10.5px] uppercase tracking-wider text-muted">Confidence</p>
                <p className="tabular mt-0.5 text-[15px] font-semibold">{signals.confidence.toFixed(0)}%</p>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col gap-5">
          <Card
            title="Signal Breakdown"
            subtitle="Independent detectors feeding the risk engine"
            right={<Badge color="#38bdf8" dot>LIVE</Badge>}
          >
            <SignalBars signals={signals} />
          </Card>

          <Card
            title="Context & Intent"
            subtitle="ASR-derived request classification (§15)"
            right={<Badge color={intentRisk >= 80 ? '#ef4444' : intentRisk >= 60 ? '#fb923c' : '#10b981'}>
              {intentRisk} risk
            </Badge>}
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-lg border border-line bg-surface/70 px-2.5 py-1.5 text-[12px] font-medium tracking-wide">
                {signals.intent.replaceAll('_', ' ')}
              </span>
              <span className="text-[11.5px] text-muted">
                Policy weight {intentRisk}/100 · design parameter, calibrate with experiments
              </span>
            </div>
          </Card>
        </div>
      </div>

      {/* Row 3 — timeline */}
      <Card
        title="Risk Timeline"
        subtitle="Temporal aggregation across 2–3 second windows"
        right={<Badge color="#8e8e8e"><Activity size={11} /> {timeline.length} windows</Badge>}
      >
        <RiskTimeline data={timeline} />
      </Card>

      {/* Row 4 — alerts + audit */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <Card
          title="Security Alerts"
          subtitle="Recent high-severity events"
          right={<Badge color="#fb923c"><BellRing size={11} /> {recentAlerts.length}</Badge>}
        >
          <ul className="flex flex-col divide-y divide-line">
            {recentAlerts.map(a => {
              const c = a.severity === 'CRITICAL' ? '#ef4444'
                      : a.severity === 'HIGH' ? '#fb923c'
                      : a.severity === 'SUSPICIOUS' ? '#fbbf24' : '#38bdf8'
              return (
                <li key={a.id} className="flex items-start gap-3 py-3 first:pt-0 last:pb-0">
                  <ShieldAlert size={15} style={{ color: c }} className="mt-0.5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-[13px] font-medium">{a.title}</p>
                      <Badge color={c}>{a.severity}</Badge>
                    </div>
                    <p className="mt-0.5 truncate text-[11.5px] text-muted">{a.detail}</p>
                  </div>
                  <span className="shrink-0 text-[11px] text-muted">{relTime(a.at)}</span>
                </li>
              )
            })}
          </ul>
        </Card>

        <Card
          title="Blockchain Audit Status"
          subtitle="Hyperledger Fabric · tamper-evident log"
          right={<Badge color="#10b981" dot>ONLINE</Badge>}
        >
          <ul className="flex flex-col divide-y divide-line">
            {recentEvents.map(e => (
              <li key={e.event_id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="text-[12.5px] font-medium">{e.event_id} · {e.decision}</p>
                  <p className="mt-0.5 tabular text-[11px] text-muted">
                    hash {shortHash(e.audio_hash)} · block {e.block}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="tabular text-[13px] font-semibold">{e.risk_score.toFixed(1)}</p>
                  <p className="text-[10.5px] text-muted">{relTime(e.timestamp)}</p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      <p className="pb-2 text-center text-[11px] text-muted">
        Design parameters shown are illustrative. Report only measured accuracy, EER, latency, CPU and RAM after running experiments.
      </p>
    </div>
  )
}
