import { useEffect } from 'react'

export function useRevealOnScroll(rootMargin = '-10% 0px -10% 0px') {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    if (!('IntersectionObserver' in window) || els.length === 0) {
      els.forEach((el) => el.classList.add('in'))
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15, rootMargin }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [rootMargin])
}
