import { NextResponse } from 'next/server'

import { postSigned } from '@/lib/ghl-webhook'
import { stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET
const SHARED_SECRET = process.env.GHL_WEBHOOK_SHARED_SECRET
const URL_REGISTRATION = process.env.GHL_INBOUND_WEBHOOK_URL_REGISTRATION
const URL_PAYMENT_FAILED = process.env.GHL_INBOUND_WEBHOOK_URL_PAYMENT_FAILED
const URL_PAYMENT_FAILED_FANOUT = process.env.GHL_INBOUND_WEBHOOK_URL_PAYMENT_FAILED_FANOUT
/* Additive per-type fan-outs. Each entry receives a duplicate of the
 * Registration Paid payload whenever the registration_type matches.
 * Adding more later = one new env var + one entry in this map. */
const PER_TYPE_FANOUT_URLS = {
  individual: process.env.GHL_INBOUND_WEBHOOK_URL_INDIVIDUAL,
  sponsor: process.env.GHL_INBOUND_WEBHOOK_URL_SPONSOR,
  foursome: process.env.GHL_INBOUND_WEBHOOK_URL_FOURSOME,
}
/* Refunds and cancellations are handled manually in the GHL admin UI —
 * staff updates the contact's Payment Status / tags / reminder enrollment
 * directly. We do NOT subscribe to charge.refunded. */

const TOURNAMENT_DATE = process.env.TOURNAMENT_DATE || '2026-06-06'

const undefinedToEmpty = (v) => (v == null ? '' : String(v))

/* In-memory Stripe-event-ID dedup. Vercel keeps a function warm long
 * enough that Stripe's retry storms (which fire within seconds when
 * we 5xx) hit the same instance — so this catches the common case
 * without a DB. The fallback for cold-start re-delivery is the
 * `stripe_event_id` field on the GHL payload, which the workflow
 * can compare against a Last-Processed-Event-ID custom field.
 *
 * 1-hour TTL because Stripe's retry window is several days but the
 * common duplicate burst is within minutes; older entries get evicted
 * to bound memory.
 */
const EVENT_TTL_MS = 60 * 60 * 1000
const processedEvents = new Map()

const isAlreadyProcessed = (eventId) => {
  if (!eventId) return false
  const expiresAt = processedEvents.get(eventId)
  if (!expiresAt) return false
  if (expiresAt < Date.now()) {
    processedEvents.delete(eventId)
    return false
  }
  return true
}

const markProcessed = (eventId) => {
  if (!eventId) return
  processedEvents.set(eventId, Date.now() + EVENT_TTL_MS)
  /* Periodic cleanup: when the map grows past 500 entries, drop expired
   * ones. Cheaper than running a setInterval in a serverless context. */
  if (processedEvents.size > 500) {
    const now = Date.now()
    for (const [k, v] of processedEvents) {
      if (v < now) processedEvents.delete(k)
    }
  }
}

/* Re-hydrate the form payload (purchaser, players, sponsor) from the
 * flat Stripe metadata back into the structured shape the GHL workflow
 * mapper expects. Mirrors buildSessionMetadata in /api/checkout.
 *
 * GHL's Inbound Webhook merge-field picker can pick into single-level
 * objects (purchaser.first_name) but NOT into arrays (participants[1]).
 * So for the foursome case we ALSO emit flat p1_/p2_/p3_/p4_ top-level
 * keys, and we mirror the sponsor block into flat sponsor_* keys, so
 * every field is pickable as a first-class merge field in the GHL UI. */
const ghlPayloadFromSession = (session, eventType, stripeEventId) => {
  const m = session.metadata ?? {}
  const purchaser = {
    first_name: undefinedToEmpty(m.purchaser_first),
    last_name: undefinedToEmpty(m.purchaser_last),
    email: undefinedToEmpty(m.purchaser_email || session.customer_details?.email),
    phone: undefinedToEmpty(m.purchaser_phone || session.customer_details?.phone),
    organization: undefinedToEmpty(m.purchaser_org),
    notes: undefinedToEmpty(m.purchaser_notes),
  }
  const participants = []
  /* Flat per-player keys for the GHL merge-field picker. Always emit
   * empty strings for non-foursome registrations so the picker shows
   * the same set of merge fields no matter the registration type. */
  const playerFlat = {}
  for (let i = 1; i <= 4; i++) {
    const first = undefinedToEmpty(m[`p${i}_first`])
    const last = undefinedToEmpty(m[`p${i}_last`])
    const fullName =
      undefinedToEmpty(m[`p${i}_full_name`]) ||
      [first, last].filter(Boolean).join(' ').trim()
    playerFlat[`p${i}_first_name`] = first
    playerFlat[`p${i}_last_name`] = last
    playerFlat[`p${i}_full_name`] = fullName
    playerFlat[`p${i}_email`] = undefinedToEmpty(m[`p${i}_email`])
    playerFlat[`p${i}_phone`] = undefinedToEmpty(m[`p${i}_phone`])
    playerFlat[`p${i}_group_info`] = undefinedToEmpty(m[`p${i}_group_info`])
    playerFlat[`p${i}_notes`] = undefinedToEmpty(m[`p${i}_notes`])
    if (m.registration_type === 'foursome') {
      participants.push({
        first_name: first,
        last_name: last,
        full_name: fullName,
        email: playerFlat[`p${i}_email`],
        phone: playerFlat[`p${i}_phone`],
        group_info: playerFlat[`p${i}_group_info`],
        notes: playerFlat[`p${i}_notes`],
      })
    }
  }

  const sponsorObj =
    m.registration_type === 'sponsor'
      ? {
          company_name: undefinedToEmpty(m.sponsor_company),
          tier: undefinedToEmpty(m.sponsor_tier),
          website: undefinedToEmpty(m.sponsor_website),
          logo_url: undefinedToEmpty(m.sponsor_logo_url),
          notes: undefinedToEmpty(m.sponsor_notes),
        }
      : null
  /* Flat sponsor keys for the picker — always present, empty for non-sponsor */
  const sponsorFlat = {
    sponsor_company_name: undefinedToEmpty(m.sponsor_company),
    sponsor_tier: undefinedToEmpty(m.sponsor_tier),
    sponsor_website: undefinedToEmpty(m.sponsor_website),
    sponsor_logo_url: undefinedToEmpty(m.sponsor_logo_url),
    sponsor_notes: undefinedToEmpty(m.sponsor_notes),
  }

  const amountCents = Number(m.amount_cents ?? session.amount_total ?? 0)
  return {
    event_type: eventType,
    stripe_event_id: stripeEventId,
    registration_id: undefinedToEmpty(m.registration_id),
    registration_type: undefinedToEmpty(m.registration_type),
    package_name: undefinedToEmpty(m.product_name),
    tier_slug: undefinedToEmpty(m.tier_slug),
    amount_cents: amountCents,
    amount_display: undefinedToEmpty(m.amount_display) || `$${(amountCents / 100).toFixed(2)}`,
    currency: (session.currency ?? 'usd').toLowerCase(),
    payment_status: 'paid',
    stripe_session_id: session.id,
    stripe_payment_intent_id:
      typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id ?? '',
    stripe_customer_id:
      typeof session.customer === 'string' ? session.customer : session.customer?.id ?? '',
    tournament_date: m.tournament_date || TOURNAMENT_DATE,
    group_foursome_id: undefinedToEmpty(m.group_foursome_id),
    submitted_at: new Date().toISOString(),
    purchaser,
    participants,
    sponsor: sponsorObj,
    donation_amount_cents:
      m.registration_type === 'donation' ? Number(m.donation_amount_cents ?? amountCents) : null,
    /* Flat top-level keys for the GHL merge-field picker */
    ...playerFlat,
    ...sponsorFlat,
  }
}

/* For payment_intent.payment_failed and checkout.session.expired we
 * may have the metadata on the intent or session directly. */
const ghlFailurePayload = (
  sessionLikeMetadata,
  sourceObj,
  failureReason,
  failureMessage,
  stripeEventId,
) => {
  const m = sessionLikeMetadata ?? {}
  const isPaymentIntent =
    typeof sourceObj?.id === 'string' && sourceObj.id.startsWith('pi_')
  const piId = isPaymentIntent
    ? sourceObj.id
    : typeof sourceObj?.payment_intent === 'string'
      ? sourceObj.payment_intent
      : (sourceObj?.payment_intent?.id ?? '')
  const sessionId = !isPaymentIntent ? (sourceObj?.id ?? '') : ''
  return {
    event_type: 'registration.payment_failed',
    stripe_event_id: stripeEventId,
    registration_id: undefinedToEmpty(m.registration_id),
    registration_type: undefinedToEmpty(m.registration_type),
    package_name: undefinedToEmpty(m.product_name),
    tier_slug: undefinedToEmpty(m.tier_slug),
    amount_cents: Number(m.amount_cents ?? 0),
    amount_display: undefinedToEmpty(m.amount_display),
    currency: 'usd',
    payment_status: failureReason === 'abandoned' ? 'abandoned' : 'failed',
    failure_reason: failureReason,
    failure_message: failureMessage ?? '',
    stripe_session_id: sessionId,
    stripe_payment_intent_id: piId,
    tournament_date: m.tournament_date || TOURNAMENT_DATE,
    group_foursome_id: undefinedToEmpty(m.group_foursome_id),
    submitted_at: new Date().toISOString(),
    purchaser: {
      first_name: undefinedToEmpty(m.purchaser_first),
      last_name: undefinedToEmpty(m.purchaser_last),
      email: undefinedToEmpty(m.purchaser_email),
      phone: undefinedToEmpty(m.purchaser_phone),
    },
  }
}

const POST = async (req) => {
  const sig = req.headers.get('stripe-signature')
  if (!sig) return new NextResponse('Missing signature', { status: 400 })
  if (!WEBHOOK_SECRET)
    return new NextResponse('STRIPE_WEBHOOK_SECRET not set', { status: 500 })

  const rawBody = await req.text()
  let event
  try {
    event = stripe().webhooks.constructEvent(rawBody, sig, WEBHOOK_SECRET)
  } catch (err) {
    console.error('[Stripe webhook] signature verify failed:', err.message)
    return new NextResponse(`Webhook signature verification failed: ${err.message}`, {
      status: 400,
    })
  }

  /* Blueprint §14: "On every subsequent request with the same ID,
   * return 200 immediately." We hold the event ID in process memory.
   * GHL gets the same event ID in the outbound payload for a second
   * line of defence across cold starts. */
  if (isAlreadyProcessed(event.id)) {
    return NextResponse.json({ received: true, duplicate: true })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object
        if (session.payment_status !== 'paid') break
        const payload = ghlPayloadFromSession(session, 'registration.paid', event.id)

        /* Always send to the main Registration Paid workflow. */
        const primary = await postSigned(URL_REGISTRATION, payload, SHARED_SECRET)

        /* Additive per-type fan-out: send the SAME payload to the
         * registration-type-specific URL if one is configured. Failures
         * here don't affect the primary dedup (mark-processed flips on
         * `primary.ok` only) — so a missing or 5xx fan-out URL won't
         * block reprocessing on Stripe's retry. */
        const fanoutUrl = PER_TYPE_FANOUT_URLS[payload.registration_type]
        let fanout = null
        if (fanoutUrl) {
          fanout = await postSigned(fanoutUrl, payload, SHARED_SECRET)
        }

        if (primary.ok) markProcessed(event.id)
        console.warn('[Stripe webhook] paid -> GHL', {
          event: event.id,
          regId: payload.registration_id,
          regType: payload.registration_type,
          primary: { attempts: primary.attempts, ok: primary.ok, error: primary.error },
          fanout: fanout
            ? {
                type: payload.registration_type,
                attempts: fanout.attempts,
                ok: fanout.ok,
                error: fanout.error,
              }
            : null,
        })
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object
        const payload = ghlFailurePayload(
          session.metadata,
          session,
          'abandoned',
          'Checkout session expired without payment',
          event.id,
        )
        const primary = await postSigned(URL_PAYMENT_FAILED, payload, SHARED_SECRET)
        let fanout = null
        if (URL_PAYMENT_FAILED_FANOUT) {
          fanout = await postSigned(URL_PAYMENT_FAILED_FANOUT, payload, SHARED_SECRET)
        }
        if (primary.ok) markProcessed(event.id)
        console.warn('[Stripe webhook] abandoned -> GHL', {
          event: event.id,
          regId: payload.registration_id,
          primary: { attempts: primary.attempts, ok: primary.ok, error: primary.error },
          fanout: fanout
            ? { attempts: fanout.attempts, ok: fanout.ok, error: fanout.error }
            : null,
        })
        break
      }

      case 'payment_intent.payment_failed': {
        const intent = event.data.object
        const failure = intent.last_payment_error ?? {}
        const payload = ghlFailurePayload(
          intent.metadata,
          intent,
          failure.code || 'card_declined',
          failure.message || 'Payment failed',
          event.id,
        )
        const primary = await postSigned(URL_PAYMENT_FAILED, payload, SHARED_SECRET)
        let fanout = null
        if (URL_PAYMENT_FAILED_FANOUT) {
          fanout = await postSigned(URL_PAYMENT_FAILED_FANOUT, payload, SHARED_SECRET)
        }
        if (primary.ok) markProcessed(event.id)
        console.warn('[Stripe webhook] failed -> GHL', {
          event: event.id,
          regId: payload.registration_id,
          primary: { attempts: primary.attempts, ok: primary.ok, error: primary.error },
          fanout: fanout
            ? { attempts: fanout.attempts, ok: fanout.ok, error: fanout.error }
            : null,
        })
        break
      }

      default:
        /* Ignore everything else — including charge.refunded.
         * Refunds & cancellations are handled by staff in the GHL admin UI. */
        break
    }

    return NextResponse.json({ received: true })
  } catch (err) {
    console.error('[Stripe webhook] handler error:', err)
    // 500 makes Stripe retry. We log loudly so ops can replay manually if needed.
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export { POST }
