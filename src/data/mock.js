const now = Date.now()
const iso = (offsetSec) => new Date(now - offsetSec * 1000).toISOString()

export const mockCalls = [
  { call_id: 'CALL-1001', started_at: iso(420),  risk_score: 88.4, risk_level: 'HIGH',       decision: 'VERIFY',  confidence: 93, context_intent: 'FINANCIAL_TRANSACTION' },
  { call_id: 'CALL-1002', started_at: iso(1860), risk_score: 22.1, risk_level: 'SAFE',       decision: 'ALLOW',   confidence: 96, context_intent: 'NORMAL_CONVERSATION' },
  { call_id: 'CALL-1003', started_at: iso(3600), risk_score: 96.7, risk_level: 'CRITICAL',   decision: 'BLOCK',   confidence: 91, context_intent: 'PRIVILEGED_ACCESS' },
  { call_id: 'CALL-1004', started_at: iso(5400), risk_score: 63.5, risk_level: 'SUSPICIOUS', decision: 'VERIFY',  confidence: 74, context_intent: 'OTP_REQUEST' },
  { call_id: 'CALL-1005', started_at: iso(7200), risk_score: 41.0, risk_level: 'LOW',        decision: 'MONITOR', confidence: 88, context_intent: 'ACCOUNT_INFORMATION' },
]

export const mockAlerts = [
  { id: 'ALR-9001', call_id: 'CALL-1003', severity: 'CRITICAL', title: 'Privileged access blocked',
    detail: 'Deepfake score 96 — action halted pending independent verification.', at: iso(3600) },
  { id: 'ALR-9002', call_id: 'CALL-1001', severity: 'HIGH', title: 'High-value transfer held',
    detail: 'Financial-transaction intent + speaker mismatch 78.', at: iso(420) },
  { id: 'ALR-9003', call_id: 'CALL-1004', severity: 'SUSPICIOUS', title: 'OTP request flagged',
    detail: 'Verification challenge issued on secondary channel.', at: iso(5400) },
  { id: 'ALR-9004', call_id: 'CALL-1002', severity: 'LOW', title: 'Monitoring engaged',
    detail: 'Minor acoustic drift detected; confidence remains high.', at: iso(1860) },
]

export const mockBlockchainEvents = [
  { event_id: 'EVT-1001', call_id: 'CALL-1001', timestamp: iso(400),  risk_score: 88.4, deepfake_score: 94,
    speaker_mismatch: 78, context_score: 90, decision: 'VERIFY', model_version: 'model-v1',
    audio_hash: '0x9f2c41ab77e0d5c38b1a6f4029d7e5b81c3a90f4d2e6b7a8c1d0e9f2a3b4c5d6',
    block: 184213, tx_id: 'tx_7c1f9a2e', status: 'CONFIRMED' },
  { event_id: 'EVT-1002', call_id: 'CALL-1003', timestamp: iso(3500), risk_score: 96.7, deepfake_score: 98,
    speaker_mismatch: 95, context_score: 92, decision: 'BLOCK', model_version: 'model-v1',
    audio_hash: '0x41d8e0b2c9a7f63e5d1b4082a7c6e9f30b5d2a8c4e7f1b6d9a0c3e5f7b2d4a81',
    block: 184219, tx_id: 'tx_2b8e4d10', status: 'CONFIRMED' },
  { event_id: 'EVT-1003', call_id: 'CALL-1004', timestamp: iso(5300), risk_score: 63.5, deepfake_score: 71,
    speaker_mismatch: 58, context_score: 80, decision: 'VERIFY', model_version: 'model-v1',
    audio_hash: '0x7a3c9f1e5b8d204a6c7e0f39b1d5a8c2e4f6b9d0a3c7e1f5b8d2a4c6e9f0b3d7',
    block: 184226, tx_id: 'tx_5f3a7c92', status: 'CONFIRMED' },
]

/** Simulates a 2–3s audio window update loop (§19). */
export function simulateWindow(tick, prev) {
  const drift = (base, amp) =>
    Math.max(0, Math.min(100, (prev?.base ?? base) + (Math.random() - 0.45) * amp))

  const deepfake = drift('deepfake', 9)
  const speaker  = drift('speaker', 7)
  const context  = drift('context', 4)
  const confidence = Math.max(60, Math.min(99, 90 + Math.sin(tick / 3) * 6))

  return { deepfake, speaker, context, confidence, intent: prev?.intent ?? 'FINANCIAL_TRANSACTION' }
}
