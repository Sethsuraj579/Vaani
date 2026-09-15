export const RISK_LEVELS = [
  { key: 'SAFE',       min: 0,  max: 30,  color: '#10b981', decision: 'ALLOW',   action: 'Allow' },
  { key: 'LOW',        min: 31, max: 55,  color: '#38bdf8', decision: 'MONITOR', action: 'Monitor' },
  { key: 'SUSPICIOUS', min: 56, max: 75,  color: '#fbbf24', decision: 'VERIFY',  action: 'Warning + verification' },
  { key: 'HIGH',       min: 76, max: 90,  color: '#fb923c', decision: 'HOLD',    action: 'Hold sensitive action' },
  { key: 'CRITICAL',   min: 91, max: 100, color: '#ef4444', decision: 'BLOCK',   action: 'Block / hold + alert' },
]

export function levelFor(score) {
  const s = Math.max(0, Math.min(100, score))
  return RISK_LEVELS.find(l => s >= l.min && s <= l.max) ?? RISK_LEVELS[0]
}

/** R = 0.50D + 0.30S + 0.20C  (§16) */
export function fuseRisk({ deepfake = 0, speaker = 0, context = 0 }) {
  return 0.5 * deepfake + 0.3 * speaker + 0.2 * context
}

/** Rt = a*Rcurrent + (1-a)*Rt-1  (§16) */
export function smooth(prev, current, alpha = 0.35) {
  if (prev == null) return current
  return alpha * current + (1 - alpha) * prev
}

export const CONTEXT_INTENTS = [
  'NORMAL_CONVERSATION', 'GENERAL_INFORMATION', 'ACCOUNT_INFORMATION',
  'OTP_REQUEST', 'PASSWORD_REQUEST', 'CREDENTIAL_RESET',
  'FINANCIAL_TRANSACTION', 'PRIVILEGED_ACCESS', 'CONFIDENTIAL_INFORMATION',
  'URGENT_APPROVAL',
]

/** Illustrative policy weights (§15) — design params, not measured results. */
export const INTENT_POLICY = {
  NORMAL_CONVERSATION:      5,
  GENERAL_INFORMATION:     10,
  ACCOUNT_INFORMATION:     35,
  OTP_REQUEST:             80,
  PASSWORD_REQUEST:        90,
  CREDENTIAL_RESET:        85,
  FINANCIAL_TRANSACTION:   88,
  PRIVILEGED_ACCESS:       92,
  CONFIDENTIAL_INFORMATION:78,
  URGENT_APPROVAL:         70,
}
