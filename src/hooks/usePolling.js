import { useEffect, useRef, useState } from 'react'

export function usePolling(fetcher, { interval = 5000, enabled = true } = {}) {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)
  const saved = useRef(fetcher)

  useEffect(() => {
    saved.current = fetcher
  }, [fetcher])

  useEffect(() => {
    if (!enabled) return
    let alive = true
    let timer

    const run = async () => {
      try {
        const out = await saved.current()
        if (alive) { setData(out); setError(null) }
      } catch (e) {
        if (alive) setError(e)
      } finally {
        if (alive) setLoading(false)
        timer = setTimeout(run, interval)
      }
    }
    run()

    return () => { alive = false; clearTimeout(timer) }
  }, [interval, enabled])

  return { data, error, loading }
}
