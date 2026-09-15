import { useCountUp } from '../../hooks/useCountUp'

const STATS = [
  { icon: '<', target: 120,   suffix: 'ms', decimals: 0, label: 'Inference Time',    delay: 0.50, countDelay: 480 },
  { icon: '%', target: 99.99, suffix: '%',  decimals: 2, label: 'Platform Uptime',    delay: 0.58, countDelay: 570 },
  { icon: '*', target: 24,    suffix: '/7', decimals: 0, label: 'Autonomous Runtime', delay: 0.66, countDelay: 660 },
  { icon: '#', target: 2.4,   suffix: 'M',  decimals: 1, label: 'Context Windows',    delay: 0.74, countDelay: 750 },
]

function Stat({ icon, target, suffix, decimals, label, delay, countDelay }) {
  const value = useCountUp(target, { duration: 1500, decimals, startDelay: countDelay })
  return (
    <div className="stat anim" style={{ '--d': `${delay}s` }}>
      <span className="stat-icon" aria-hidden="true">{icon}</span>
      <span className="stat-value">
        {value.toFixed(decimals)}{suffix}
      </span>
      <span className="stat-label">{label}</span>
    </div>
  )
}

export function Stats() {
  return (
    <footer className="stats">
      {STATS.map((s) => <Stat key={s.label} {...s} />)}
    </footer>
  )
}
