import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { NAV_LINKS } from '../../constants'

export function MobileMenu({ open, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    const onResize = () => { if (window.innerWidth > 720) onClose() }
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [onClose])

  if (!open) return null

  return (
    <>
      <div className="overlay" onClick={onClose} />
      <div className="sheet" id="mobile-menu" role="dialog" aria-modal="true">
        {NAV_LINKS.map((l) => (
          <a
            key={l.href}
            className={`sheet-link ${l.active ? 'is-active' : ''}`}
            href={l.href}
            onClick={onClose}
          >
            {l.label}
          </a>
        ))}
        <Link className="sheet-signin" to="/app" onClick={onClose}>Sign in</Link>
      </div>
    </>
  )
}
