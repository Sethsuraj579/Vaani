import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { RiskGauge } from '../components/viz/RiskGauge'
import { SignalBars } from '../components/viz/SignalBars'
import { RiskTimeline } from '../components/viz/RiskTimeline'
import { DecisionPill } from '../components/viz/DecisionPill'
import { useLiveRisk } from '../hooks/useLiveRisk'

export default function LiveCall() {
  const { risk, level, signals, timeline, connected, callId } = useLiveRisk({
    callId: 'CALL-1001',
    useMock: true,
  })

  return (
    <div className="mx-auto flex max-w-300 flex-col gap-5">
      <Card
        title={`Live Session · ${callId}`}
        subtitle="Audio stream → 2–3 s window → inference → risk update → decision"
        right={<Badge color={connected ? '#10b981' : '#ef4444'} dot>{connected ? 'STREAMING' : 'OFFLINE'}</Badge>}
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_minmax(0,1fr)]">
          <div className="flex justify-center"><RiskGauge value={risk} level={level} size={260} /></div>
          <div className="flex flex-col gap-5">
            <SignalBars signals={signals} />
            <div className="rounded-xl border border-line bg-surface/60 p-3.5">
              <p className="text-[11px] uppercase tracking-wider text-muted">Recommended action</p>
              <p className="mt-1 text-[13.5px] font-medium">{level.action}</p>
              <p className="mt-1.5 text-[11.5px] text-muted">
                Independent verification only — a second voice challenge must not be the sole factor.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <DecisionPill level={level} size="lg" />
              <span className="text-[11.5px] text-muted">Confidence {signals.confidence.toFixed(0)}%</span>
            </div>
          </div>
        </div>
      </Card>

      <Card title="Rolling Risk Timeline" subtitle="Last 60 windows">
        <RiskTimeline data={timeline} />
      </Card>
    </div>
  )
}
