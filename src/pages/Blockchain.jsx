import { Link2, CheckCircle2 } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Badge } from '../components/ui/Badge'
import { mockBlockchainEvents } from '../data/mock'
import { shortHash, relTime } from '../lib/format'

export default function Blockchain() {
  return (
    <div className="mx-auto flex max-w-300 flex-col gap-5">
      <Card
        title="Hyperledger Fabric Audit Trail"
        subtitle="Raw audio is never written on-chain — only metadata and hashes."
        right={<Badge color="#10b981" dot>CHANNEL HEALTHY</Badge>}
      >
        <ul className="flex flex-col gap-3">
          {mockBlockchainEvents.map(e => (
            <li key={e.event_id} className="rounded-2xl border border-line bg-surface/60 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="grid size-8 place-items-center rounded-lg bg-safe/15 border border-safe/35">
                    <Link2 size={14} className="text-safe" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold">{e.event_id}</p>
                    <p className="text-[11px] text-muted">{e.call_id} · {relTime(e.timestamp)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge color="#10b981"><CheckCircle2 size={11} /> {e.status}</Badge>
                  <Badge color="#8e8e8e">block {e.block}</Badge>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[
                  ['Risk',      e.risk_score.toFixed(1)],
                  ['Deepfake',  e.deepfake_score],
                  ['Speaker',   e.speaker_mismatch],
                  ['Context',   e.context_score],
                ].map(([k, v]) => (
                  <div key={k} className="rounded-xl border border-line bg-surface-2/60 px-3 py-2">
                    <p className="text-[10px] uppercase tracking-wider text-muted">{k}</p>
                    <p className="tabular mt-0.5 text-[15px] font-semibold">{v}</p>
                  </div>
                ))}
              </div>

              <dl className="mt-4 grid grid-cols-1 gap-x-6 gap-y-1.5 text-[11.5px] sm:grid-cols-2">
                <div className="flex justify-between gap-3"><dt className="text-muted">Decision</dt><dd className="font-medium">{e.decision}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Model</dt><dd className="font-medium">{e.model_version}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Tx</dt><dd className="tabular font-medium">{e.tx_id}</dd></div>
                <div className="flex justify-between gap-3"><dt className="text-muted">Audio hash</dt><dd className="tabular font-medium">{shortHash(e.audio_hash, 10, 8)}</dd></div>
              </dl>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}
