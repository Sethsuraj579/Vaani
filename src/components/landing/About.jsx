const CARDS = [
  {
    icon: 'fa-wave-square',
    title: 'Deepfake Detection',
    text: 'Estimates whether incoming speech is synthetic or manipulated, and normalizes the spoof probability into a deepfake risk score.',
  },
  {
    icon: 'fa-fingerprint',
    title: 'Speaker Verification',
    text: "Compares the incoming speaker's embedding against a trusted reference to catch impersonation — or flags the signal as unavailable when no reference exists.",
  },
  {
    icon: 'fa-comment-dots',
    title: 'Context & Intent Analysis',
    text: 'Converts speech to text and classifies the request — OTP, password, financial transfer, privileged access — into a policy-weighted context risk.',
  },
  {
    icon: 'fa-link',
    title: 'Tamper-Evident Audit',
    text: 'Records security events and cryptographic hashes on Hyperledger Fabric. Raw voice never touches the chain — only minimal metadata.',
  },
]

const PIPELINE = [
  'Incoming Call',
  'Audio Preprocessing',
  'AI Detection Signals',
  'Dynamic Risk Engine',
  'Decision & Audit',
]

const CHIPS = [
  { cls: 'chip-safe', label: '0–30 · Allow' },
  { cls: 'chip-low',  label: '31–55 · Monitor' },
  { cls: 'chip-sus',  label: '56–75 · Verify' },
  { cls: 'chip-high', label: '76–90 · Hold' },
  { cls: 'chip-crit', label: '91–100 · Block' },
]

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-inner">
        <header className="about-head">
          <p className="about-eyebrow reveal">// About the Project</p>
          <h2 className="about-title reveal" id="about-title">
            Voice security middleware for the age of <span className="about-em">synthetic media</span>.
          </h2>
          <p className="about-lede reveal">
            SentinelVox is a real-time AI-powered voice security system. It detects synthetic
            and cloned speech, verifies speaker identity, reads conversational intent, and
            prevents high-risk actions through adaptive verification — while keeping raw
            voice data off-chain and recording important events on a tamper-evident
            Hyperledger Fabric ledger.
          </p>
          <p className="about-meta reveal">
            Smart India Hackathon 2026 · Problem Statement 26104 · Theme: Blockchain &amp; Cybersecurity
          </p>
        </header>

        <div className="about-grid">
          {CARDS.map((c) => (
            <article key={c.title} className="about-card reveal">
              <span className="about-icon" aria-hidden="true">
                <i className={`fa-solid ${c.icon}`} />
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>

        <div className="about-pipe">
          <p className="about-eyebrow reveal">// Pipeline</p>

          <ol className="pipe reveal">
            {PIPELINE.map((step, i) => (
              <li key={step}>
                <span className="pipe-num">{String(i + 1).padStart(2, '0')}</span>
                {step}
              </li>
            ))}
          </ol>

          <div className="about-formula reveal">
            <p className="formula-row">
              <span className="formula-tag">Risk Fusion</span>
              <code>R = 0.50D + 0.30S + 0.20C</code>
            </p>
            <p className="formula-note">
              D · Deepfake risk · S · Speaker mismatch · C · Context risk. Weights are initial
              design parameters — to be calibrated with experiments.
            </p>
          </div>

          <div className="about-decisions reveal">
            {CHIPS.map((c) => (
              <span key={c.label} className={`chip ${c.cls}`}>{c.label}</span>
            ))}
          </div>
        </div>

        <footer className="about-foot reveal">
          <p>
            <i className="fa-solid fa-circle-info" aria-hidden="true" />
            Only measured accuracy, EER, latency, CPU and RAM are reported after real
            experiments. Numbers shown are design parameters.
          </p>
        </footer>
      </div>
    </section>
  )
}
