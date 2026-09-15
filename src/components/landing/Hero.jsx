import { Link } from 'react-router-dom'
import { TrustRow } from './TrustRow'

export function Hero() {
  return (
    <main className="hero" id="top">
      <TrustRow />

      <h1 className="headline">
        <span className="line line-1">Stop Voice Clones</span>
        <span className="line line-2">Before They Speak</span>
      </h1>

      <p className="subhead anim" style={{ '--d': '0.28s' }}>
        SentinelVox detects cloned and synthetic speech in real time, verifies speaker
        consistency, and halts high-risk requests before the attacker succeeds.
      </p>

      <Link className="cta anim" to="/app" style={{ '--d': '0.4s' }}>
        Get Started
      </Link>
    </main>
  )
}
