import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../constants'

export function Header({ menuOpen, onToggleMenu }) {
  return (
    <header className="header anim" style={{ '--d': '0s' }}>
      <a className="logo" href="#top" aria-label="SentinelVox home">
        <img src="/assets/logo.webp" alt="" width="52" height="52" />
      </a>

      <nav className="nav-pill" aria-label="Primary">
        {NAV_LINKS.map((l) => (
          <a key={l.href} className={`nav-link ${l.active ? 'is-active' : ''}`} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <Link className="signin" to="/app">Sign in</Link>

      <button
        type="button"
        className={`burger ${menuOpen ? 'is-open' : ''}`}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        aria-controls="mobile-menu"
        onClick={onToggleMenu}
      >
        <span /><span /><span />
      </button>
    </header>
  )
}
