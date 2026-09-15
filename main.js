const menuToggle = document.querySelector('.menu-toggle')
const mobileMenu = document.querySelector('.mobile-menu')
const overlay = document.querySelector('.menu-overlay')

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu')
  mobileMenu.hidden = !open
  overlay.hidden = !open
  document.body.classList.toggle('menu-open', open)
}

menuToggle.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'))
overlay.addEventListener('click', () => setMenu(false))
mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)))
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false)
})
window.addEventListener('resize', () => {
  if (window.innerWidth > 720) setMenu(false)
})

const easeOutCubic = (value) => 1 - ((1 - value) ** 3)
const stats = document.querySelectorAll('.stat-value')
let counted = false

function countStats() {
  if (counted) return
  counted = true
  stats.forEach((stat, index) => {
    const target = Number(stat.dataset.target)
    const decimals = Number(stat.dataset.decimals)
    const suffix = stat.dataset.suffix
    const duration = 1500 + index * 80
    const started = performance.now() + 480 + index * 90

    function tick(now) {
      if (now < started) {
        requestAnimationFrame(tick)
        return
      }
      const progress = Math.min((now - started) / duration, 1)
      stat.textContent = `${(target * easeOutCubic(progress)).toFixed(decimals)}${suffix}`
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  })
}

const statsObserver = new IntersectionObserver((entries) => {
  if (entries.some((entry) => entry.isIntersecting)) {
    countStats()
    statsObserver.disconnect()
  }
}, { threshold: 0.25 })

statsObserver.observe(document.querySelector('.stats'))
