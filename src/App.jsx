import { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import LiveCall from './pages/LiveCall'
import Alerts from './pages/Alerts'
import History from './pages/History'
import Blockchain from './pages/Blockchain'

const metrics = [
  ['<', '120', '0', 'ms', 'Inference Time'],
  ['%', '99.99', '2', '%', 'Platform Uptime'],
  ['*', '24', '0', '/7', 'Autonomous Runtime'],
  ['#', '2.4', '1', 'M', 'Context Windows'],
]

function Landing() {
  useEffect(() => {
    const menuToggle = document.querySelector('.menu-toggle')
    const mobileMenu = document.querySelector('.mobile-menu')
    const overlay = document.querySelector('.menu-overlay')
    const setMenu = (open) => {
      menuToggle.setAttribute('aria-expanded', String(open))
      menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
      mobileMenu.hidden = !open
      overlay.hidden = !open
    }
    const toggleMenu = () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true')
    const closeMenu = () => setMenu(false)
    menuToggle.addEventListener('click', toggleMenu)
    overlay.addEventListener('click', closeMenu)
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu))
    const onKeyDown = (event) => event.key === 'Escape' && closeMenu()
    const onResize = () => window.innerWidth > 720 && closeMenu()
    document.addEventListener('keydown', onKeyDown)
    window.addEventListener('resize', onResize)

    let counted = false
    const observer = new IntersectionObserver((entries) => {
      if (counted || !entries.some((entry) => entry.isIntersecting)) return
      counted = true
      document.querySelectorAll('.stat-value').forEach((stat, index) => {
        const target = Number(stat.dataset.target)
        const decimals = Number(stat.dataset.decimals)
        const started = performance.now() + 480 + index * 90
        const tick = (now) => {
          if (now < started) return requestAnimationFrame(tick)
          const progress = Math.min((now - started) / (1500 + index * 80), 1)
          stat.textContent = `${(target * (1 - ((1 - progress) ** 3))).toFixed(decimals)}${stat.dataset.suffix}`
          if (progress < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      })
      observer.disconnect()
    }, { threshold: 0.25 })
    observer.observe(document.querySelector('.stats'))

    return () => {
      menuToggle.removeEventListener('click', toggleMenu)
      overlay.removeEventListener('click', closeMenu)
      document.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('resize', onResize)
      observer.disconnect()
    }
  }, [])

  return <>
    <main className="page landing-page">
      <div className="bg" aria-hidden="true"><video className="bg-video" autoPlay muted loop playsInline><source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260809_012548_ef22562c-c0ae-4816-ad9d-f8922af4e6a7.mp4" type="video/mp4" /></video></div>
      <header className="header anim" style={{ '--d': '0s' }}><a className="logo" href="#home" aria-label="SentinelVox home"><img src="/assets/logo.webp" alt="" width="52" height="52" /></a><nav className="desktop-nav" aria-label="Primary navigation"><a className="active" href="#home">Home</a><a href="#about">About</a><a href="#dashboard">Dashboard</a></nav><a className="sign-in desktop-sign-in" href="/dashboard">Open console</a><button className="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu"><span></span><span></span><span></span></button></header>
      <section className="hero landing-section" id="home"><div className="trust trust-plain anim" style={{ '--d': '.05s' }}><span className="trust-pill">Smart India Hackathon 2026 · SIH26104</span></div><h1 className="headline"><span>SentinelVox</span></h1><p className="subhead anim" style={{ '--d': '.28s' }}>Real-time voice security that detects cloned speech, understands intent and stops high-risk actions.</p><div className="hero-actions"><a className="cta anim" style={{ '--d': '.4s' }} href="#about">Explore SentinelVox</a><a className="text-link" href="#dashboard">View dashboard <span aria-hidden="true">↗</span></a></div></section>
      <section className="content-section about-section landing-section" id="about"><div className="section-kicker">SIH26104 / Blockchain &amp; Cybersecurity</div><div className="section-heading"><h2>Security for the voice between you and the action.</h2><p>SentinelVox is an AI-powered security middleware for voice communication. It combines acoustic evidence, speaker identity and conversational intent into one adaptive decision.</p></div><div className="about-grid"><article className="about-panel"><span className="panel-index">01</span><h3>Detect the attack</h3><p>Short audio windows are preprocessed and evaluated for synthetic speech, speaker mismatch and suspicious requests in near real time.</p></article><article className="about-panel"><span className="panel-index">02</span><h3>Decide with context</h3><p>A dynamic risk engine applies temporal evidence and confidence-aware policy to allow, monitor, verify, hold or block.</p></article><article className="about-panel"><span className="panel-index">03</span><h3>Prove what happened</h3><p>Important security events are recorded as tamper-evident audit data through Hyperledger Fabric. Raw voice stays off-chain.</p></article></div><div className="project-strip"><strong>Problem statement</strong><span>26104</span><strong>Prototype focus</strong><span>Voice-cloning impersonation prevention</span><strong>Data strategy</strong><span>Kaggle-based rapid prototype</span></div></section>
      <section className="content-section dashboard-section landing-section" id="dashboard"><div className="section-kicker">Live security overview</div><div className="dashboard-heading"><div><h2>See risk before it becomes permission.</h2><p>Monitor deepfake probability, speaker consistency, context risk and decision history from the SentinelVox console.</p></div><a className="cta" href="/dashboard">Open full dashboard</a></div><div className="dashboard-preview"><div className="preview-main"><div className="preview-label">Current call risk</div><div className="preview-score">88.4<span>/100</span></div><div className="risk-line"><span style={{ width: '88.4%' }}></span></div><div className="preview-decision">VERIFY <span>High risk signal detected</span></div></div><div className="preview-metrics"><div><span>Deepfake score</span><strong>94%</strong></div><div><span>Speaker mismatch</span><strong>78%</strong></div><div><span>Context risk</span><strong>90%</strong></div><div><span>Confidence</span><strong>93%</strong></div></div></div></section>
      <footer className="stats" aria-label="Platform metrics">{metrics.map(([icon, target, decimals, suffix, label], index) => <div className="stat anim" style={{ '--d': `${.5 + index * .08}s` }} key={label}><span className="stat-icon">{icon}</span><span className="stat-value" data-target={target} data-decimals={decimals} data-suffix={suffix}>0{suffix}</span><span className="stat-label">{label}</span></div>)}</footer>
    </main>
    <div className="menu-overlay" hidden></div><nav className="mobile-menu" id="mobile-menu" aria-label="Mobile navigation" hidden><a className="active" href="#home">Home</a><a href="#about">About</a><a href="#dashboard">Dashboard</a><a className="sign-in" href="/dashboard">Open console</a></nav>
  </>
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route element={<AppShell />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="live" element={<LiveCall />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="history" element={<History />} />
          <Route path="blockchain" element={<Blockchain />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
