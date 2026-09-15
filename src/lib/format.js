export const pct  = (n, d = 1) => `${Number(n).toFixed(d)}%`
export const num  = (n, d = 0) => Number(n).toFixed(d)

export function shortHash(h, head = 6, tail = 4) {
  if (!h) return '—'
  return `${h.slice(0, head)}…${h.slice(-tail)}`
}

export function clockTime(iso) {
  return new Date(iso).toLocaleTimeString([], {
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
}

export function relTime(iso) {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000
  if (diff < 60) return `${Math.floor(diff)}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}
