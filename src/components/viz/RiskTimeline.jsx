import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { clockTime } from '../../lib/format'

export function RiskTimeline({ data = [] }) {
  return (
    <div className="h-52.5 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <defs>
            <linearGradient id="riskFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#ef4444" stopOpacity={0.45} />
              <stop offset="55%"  stopColor="#fbbf24" stopOpacity={0.22} />
              <stop offset="100%" stopColor="#10b981" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
          <XAxis
            dataKey="t" tickFormatter={(v) => clockTime(new Date(v).toISOString())}
            stroke="rgba(255,255,255,0.25)" tick={{ fontSize: 10 }} minTickGap={40}
          />
          <YAxis domain={[0, 100]} stroke="rgba(255,255,255,0.25)" tick={{ fontSize: 10 }} width={34} />
          <Tooltip
            contentStyle={{ background: '#121214', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
            labelFormatter={(v) => clockTime(new Date(v).toISOString())}
            formatter={(v, n) => [Number(v).toFixed(1), n === 'risk' ? 'Risk' : n]}
          />
          <Area type="monotone" dataKey="risk" stroke="#ffffff" strokeWidth={1.8} fill="url(#riskFill)" isAnimationActive={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}