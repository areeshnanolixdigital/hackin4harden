import crypto from 'node:crypto'

const shortId = (bytes = 8) =>
  crypto.randomBytes(bytes).toString('base64url').replace(/[_-]/g, '').slice(0, bytes * 2)

const registrationId = () => `h4h_reg_${shortId(10)}`

const groupFoursomeId = () => `H4H-2026-${shortId(6).toUpperCase()}`

export { shortId, registrationId, groupFoursomeId }
