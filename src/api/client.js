const BASE = import.meta.env.VITE_API_BASE ?? '/api/v1'

async function request(path, opts = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...(opts.headers || {}) },
    ...opts,
  })
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
  return res.status === 204 ? null : res.json()
}

export const api = {
  startCall:            (body) => request('/call/start', { method: 'POST', body: JSON.stringify(body) }),
  streamAudio:          (body) => request('/audio/stream', { method: 'POST', body: JSON.stringify(body) }),
  analyzeVerification:  (body) => request('/verification/analyze', { method: 'POST', body: JSON.stringify(body) }),

  getRisk:              (id) => request(`/call/${id}/risk`),
  getStatus:            (id) => request(`/call/${id}/status`),
  getAlerts:            ()   => request('/alerts'),
  getSecurityEvents:    ()   => request('/security-events'),
  getBlockchainEvent:   (id) => request(`/blockchain/event/${id}`),
}
