import { Radio } from 'lucide-react'
import { DecisionPill } from '../viz/DecisionPill'

export function Topbar({ connected, level, callId }) {
  return (
    <header className="flex items-center justify-between gap-4 border-b border-line bg-surface/70 px-5 py-3.5 backdrop-blur">
      <div className="flex items-center gap-3">
        <span className="console-topbar-title text-[13.5px] font-semibold tracking-tight">Security Operations Console</span>
        <span className="hidden sm:inline text-[11.5px] text-muted">
          Smart India Hackathon 2026 · PS 26104
        </span>
      </div>

      <div className="flex items-center gap-3">
        {callId && (
          <span className="hidden md:inline text-[11.5px] text-muted">
            Session <span className="text-white/85 font-medium">{callId}</span>
          </span>
        )}
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium border ${
          connected
            ? 'border-safe/40 bg-safe/10 text-safe'
            : 'border-critical/40 bg-critical/10 text-critical'
        }`}>
          <Radio size={11} className={connected ? 'animate-pulse' : ''} />
          {connected ? 'Streaming' : 'Offline'}
        </span>
        {level && <DecisionPill level={level} />}
      </div>
    </header>
  )
}
