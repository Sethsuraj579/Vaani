import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { mockCalls } from '../data/mock'
import { levelFor } from '../lib/risk'
import { relTime } from '../lib/format'

export default function History() {
  return (
    <div className="mx-auto flex max-w-300 flex-col gap-5">
      <Card title="Call & Session History" subtitle="Operational records mirrored from PostgreSQL">
        <div className="overflow-x-auto">
          <table className="w-full min-w-190 text-left text-[12.5px]">
            <thead>
              <tr className="text-[10.5px] uppercase tracking-wider text-muted">
                <th className="pb-3 font-medium">Call ID</th>
                <th className="pb-3 font-medium">Started</th>
                <th className="pb-3 font-medium">Intent</th>
                <th className="pb-3 font-medium text-right">Risk</th>
                <th className="pb-3 font-medium text-right">Confidence</th>
                <th className="pb-3 pl-6 font-medium">Decision</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {mockCalls.map(c => {
                const lv = levelFor(c.risk_score)
                return (
                  <tr key={c.call_id} className="hover:bg-white/2">
                    <td className="py-3 font-medium">{c.call_id}</td>
                    <td className="py-3 text-muted">{relTime(c.started_at)}</td>
                    <td className="py-3 text-muted">{c.context_intent.replaceAll('_', ' ')}</td>
                    <td className="tabular py-3 text-right font-semibold" style={{ color: lv.color }}>
                      {c.risk_score.toFixed(1)}
                    </td>
                    <td className="tabular py-3 text-right text-muted">{c.confidence}%</td>
                    <td className="py-3 pl-6"><Badge color={lv.color}>{lv.decision}</Badge></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
