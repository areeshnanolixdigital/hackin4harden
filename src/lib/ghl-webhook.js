import crypto from 'node:crypto'

const SIGNATURE_HEADER = 'X-Hackin4Harden-Signature'

/* HMAC-SHA256 over the raw body string. GHL workflows can verify by
 * recomputing the same hash with the shared secret. */
const signBody = (body, secret) =>
  `sha256=${crypto.createHmac('sha256', secret).update(body).digest('hex')}`

/* Signed outbound POST with up to N retries on 5xx / network failure.
 * Returns { ok, status, attempts, error? }. Never throws. */
const postSigned = async (url, payload, secret, { maxAttempts = 4 } = {}) => {
  if (!url) return { ok: false, status: 0, attempts: 0, error: 'missing URL' }
  const body = JSON.stringify(payload)
  const headers = {
    'Content-Type': 'application/json',
    [SIGNATURE_HEADER]: signBody(body, secret),
  }
  let lastError = null
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const res = await fetch(url, { method: 'POST', headers, body })
      if (res.ok) return { ok: true, status: res.status, attempts: attempt }
      if (res.status < 500) {
        return { ok: false, status: res.status, attempts: attempt, error: `HTTP ${res.status}` }
      }
      lastError = `HTTP ${res.status}`
    } catch (err) {
      lastError = err.message || String(err)
    }
    if (attempt < maxAttempts) {
      const backoff = Math.min(2000 * 2 ** (attempt - 1), 8000)
      await new Promise((r) => setTimeout(r, backoff))
    }
  }
  return { ok: false, status: 0, attempts: maxAttempts, error: lastError ?? 'unknown error' }
}

export { signBody, postSigned, SIGNATURE_HEADER }
