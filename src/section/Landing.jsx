import { useEffect, useState } from 'react'
import { BackgroundVideo } from '../components/landing/BackgroundVideo'
import { Header }          from '../components/landing/Header'
import { Hero }            from '../components/landing/Hero'
import { Stats }           from '../components/landing/Stats'
import { About }           from '../components/landing/About'
import { MobileMenu }      from '../components/landing/MobileMenu'
import { useRevealOnScroll } from '../hooks/useRevealOnScroll'

import '../styles/landing.css'

export function Landing() {
  const [menuOpen, setMenuOpen] = useState(false)

  useRevealOnScroll()

  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen)
    return () => document.body.classList.remove('menu-open')
  }, [menuOpen])

  return (
    <>
      <BackgroundVideo />

      <div className="page">
        <Header menuOpen={menuOpen} onToggleMenu={() => setMenuOpen((v) => !v)} />
        <Hero />
        <Stats />
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <About />
    </>
  )
}
