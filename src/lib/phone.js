/* Canonical phone helpers per forms-compliance-pattern.md.
 *
 * Every form on the project that collects a phone number uses these two
 * helpers exclusively — never a raw `phone?.trim() || ''` fallback. The
 * client-side formatter binds to the input's onChange; the server-side
 * normalizer runs in every API route that ships a phone number to GHL
 * or Stripe.
 *
 *   formatPhoneInput     — live formatter for client onChange
 *   normalizePhoneForSubmit — server-side canonical producer
 *
 * Both keep the rule book identical:
 *   • Visible pattern: +1 (xxx) xxx-xxxx
 *   • We own the +1; any user-typed +1 / leading 1 is stripped
 *   • Partial values (<10 digits) → empty string on the server
 *   • Empty input → empty string (never the literal "+1")
 */

const onlyDigits = (s) => (typeof s === 'string' ? s.replace(/\D+/g, '') : '')

/* Drop the country code if it's present. We OWN the leading "+1" and
 * render it ourselves; any digit "1" at the front of the cleaned input
 * is the country code, never the start of a local number.
 *
 * Two cases this handles correctly:
 *
 *   1) User pastes "+1 (555) 555-0100" → digits "15555550100" → strip
 *      first "1" → "5555550100" → render "+1 (555) 555-0100".
 *
 *   2) The live re-format cycle. After we render "+1 (4" and the user
 *      types "8", the browser sends back "+1 (48" → digits "148". The
 *      "1" here is *our* prefix, not the user's input. Always stripping
 *      it gives "48" → "+1 (48" → no drift.
 *
 * Per the North American Numbering Plan a US area code cannot begin
 * with 1, so there is no real US phone number whose local portion
 * starts with 1 — the "always strip leading 1" rule never eats real
 * user input. */
const stripCountryCode = (digits) => (digits.startsWith('1') ? digits.slice(1) : digits)

const formatFromDigits = (rawDigits) => {
  const stripped = stripCountryCode(rawDigits).slice(0, 10)
  if (stripped.length === 0) return ''
  if (stripped.length < 4) return `+1 (${stripped}`
  if (stripped.length < 7) return `+1 (${stripped.slice(0, 3)}) ${stripped.slice(3)}`
  return `+1 (${stripped.slice(0, 3)}) ${stripped.slice(3, 6)}-${stripped.slice(6, 10)}`
}

/* Client-side onChange formatter. Returns the next display value for the
 * input. Always returns a fully-formatted partial — typing 5 → "+1 (5". */
const formatPhoneInput = (input) => formatFromDigits(onlyDigits(input))

/* Server-side canonical producer. Yields "" for any input that doesn't
 * have a full 10-digit local number. Used in every API route before the
 * value gets stored / forwarded. */
const normalizePhoneForSubmit = (input) => {
  const stripped = stripCountryCode(onlyDigits(input)).slice(0, 10)
  if (stripped.length !== 10) return ''
  return `+1 (${stripped.slice(0, 3)}) ${stripped.slice(3, 6)}-${stripped.slice(6, 10)}`
}

/* Cheap predicate for the consent-gating UX: a phone counts as "has a
 * value" the moment the user types any digit beyond our prefix. */
const phoneHasValue = (input) =>
  stripCountryCode(onlyDigits(input)).length > 0

export { formatPhoneInput, normalizePhoneForSubmit, phoneHasValue }
