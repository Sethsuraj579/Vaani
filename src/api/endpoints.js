export const ENDPOINTS = {
  startCall:         'POST /api/v1/call/start',
  streamAudio:       'POST /api/v1/audio/stream',
  verification:      'POST /api/v1/verification/analyze',
  callRisk:          'GET  /api/v1/call/{call_id}/risk',
  callStatus:        'GET  /api/v1/call/{call_id}/status',
  alerts:            'GET  /api/v1/alerts',
  securityEvents:    'GET  /api/v1/security-events',
  blockchainEvent:   'GET  /api/v1/blockchain/event/{event_id}',
}
