import { useEffect, useRef, useState } from 'react'

export function useCountUp(target, { duration = 1500, decimals = 0, startDelay = 0 } = {}) {
  const [value, setValue] = useState(0)
  const started = useRef(false)

  useEffect(() => {
    let raf
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
    const start = performance.now() + startDelay

    const tick = (now) => {
      const t = Math.max(0, Math.min(1, (now - start) / duration))
      setValue(easeOutCubic(t) * target)
      if (t < 1) raf = requestAnimationFrame(tick)
    }

    if (!started.current) {
      started.current = true
      raf = requestAnimationFrame(tick)
    }
    return () => cancelAnimationFrame(raf)
  }, [target, duration, startDelay])

  return Number(value.toFixed(decimals))
}
