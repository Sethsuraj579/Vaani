import { useEffect, useRef, useState } from 'react'
import { fuseRisk, smooth, levelFor } from '../lib/risk'
import { simulateWindow } from '../data/mock'

const WINDOW_MS = 2000

export function useLiveRisk({ callId, useMock = true }) {
  const [signals, setSignals] = useState({
    deepfake: 12, speaker: 8, context: 5, confidence: 90,
    intent: 'NORMAL_CONVERSATION',
  })
  const [timeline, setTimeline] = useState([])
  const [connected, setConnected] = useState(useMock)
  const prevRef = useRef(null)
  const tickRef = useRef(0)

  // ---- real socket attempt ----
  useEffect(() => {
    if (useMock) return
    const url = `${location.protocol === 'https:' ? 'wss' : 'ws'}://${location.host}/ws/call/${callId}`
    const ws = new WebSocket(url)
    ws.onopen = () => setConnected(true)
    ws.onclose = () => setConnected(false)
    ws.onmessage = (e) => {
      try {
        const m = JSON.parse(e.data)
        setSignals(s => ({ ...s, ...m }))
      } catch { /* ignore malformed frame */ }
    }
    return () => ws.close()
  }, [callId, useMock])

  // ---- mock simulator ----
  useEffect(() => {
    if (!useMock) return
    const id = setInterval(() => {
      tickRef.current += 1
      setSignals(s => ({ ...s, ...simulateWindow(tickRef.current, s) }))
    }, WINDOW_MS)
    return () => { clearInterval(id); setConnected(false) }
  }, [useMock])

  // ---- risk fusion + temporal smoothing ----
  useEffect(() => {
    const fused = fuseRisk(signals)
    const next = smooth(prevRef.current, fused, 0.35)
    prevRef.current = next

    setTimeline(t => [...t.slice(-59), {
      t: Date.now(),
      risk: Number(next.toFixed(1)),
      deepfake: Number(signals.deepfake.toFixed(1)),
      speaker: Number(signals.speaker.toFixed(1)),
      context: Number(signals.context.toFixed(1)),
    }])
  }, [signals])

  const raw = fuseRisk(signals)
  const smoothed = timeline.length > 0 ? timeline[timeline.length - 1].risk : 0
  const level = levelFor(smoothed)

  return {
    signals, raw, risk: smoothed, level,
    timeline, connected, callId,
  }
}
