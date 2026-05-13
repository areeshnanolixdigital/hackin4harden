import { NextResponse } from 'next/server'

import { groupFoursomeId, registrationId } from '@/lib/ids'
import { priceIdForSlug, stripe } from '@/lib/stripe'

export const runtime = 'nodejs'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://hackin4harden.vercel.app'
const TOURNAMENT_DATE = process.env.TOURNAMENT_DATE || '2026-06-06'

const trim = (s) => (typeof s === 'string' ? s.trim() : '')

/* Flatten the form payload into the Stripe Session metadata. Stripe
 * limits metadata to 50 keys * 500 chars each; we stay well within that.
 * Values must be strings — coerce to '' for null / undefined. */
const buildSessionMetadata = (input, regId, groupId) => {
  const md = {
    registration_id: regId,
    registration_type: input.registration_type,
    tier_slug: input.tier_slug,
    product_name: trim(input.product_name),
    amount_cents: String(Math.round((input.amount ?? 0) * 100)),
    amount_display: `$${(input.amount ?? 0).toLocaleString()}`,
    tournament_date: TOURNAMENT_DATE,
    group_foursome_id: groupId ?? '',
  }
  const p = input.purchaser ?? {}
  md.purchaser_first = trim(p.firstName)
  md.purchaser_last = trim(p.lastName)
  md.purchaser_email = trim(p.email)
  md.purchaser_phone = trim(p.phone)
  md.purchaser_org = trim(p.organization)
  md.purchaser_notes = trim(p.notes).slice(0, 480)

  if (input.registration_type === 'foursome' && Array.isArray(input.players)) {
    input.players.forEach((player, idx) => {
      const k = idx + 1
      const fullName = trim(player.fullName)
      const parts = fullName.split(/\s+/)
      const first = parts[0] ?? ''
      const last = parts.slice(1).join(' ')
      md[`p${k}_first`] = first
      md[`p${k}_last`] = last
      md[`p${k}_full_name`] = fullName
      md[`p${k}_email`] = trim(player.email)
      md[`p${k}_phone`] = trim(player.phone)
      md[`p${k}_group_info`] = trim(player.groupInfo).slice(0, 480)
      md[`p${k}_notes`] = trim(player.notes).slice(0, 480)
    })
  }

  if (input.registration_type === 'sponsor' && input.sponsor) {
    md.sponsor_company = trim(input.sponsor.company).slice(0, 480)
    md.sponsor_tier = trim(input.sponsor.tier)
    md.sponsor_website = trim(input.sponsor.website).slice(0, 480)
    md.sponsor_logo_url = trim(input.sponsor.logoUrl).slice(0, 480)
    md.sponsor_notes = trim(input.sponsor.notes).slice(0, 480)
  }

  if (input.registration_type === 'donation') {
    md.donation_amount_cents = String(Math.round((input.amount ?? 0) * 100))
  }

  // Strip empty strings to stay tidy (Stripe accepts empty but it bloats the dashboard view).
  for (const k of Object.keys(md)) {
    if (md[k] === '') delete md[k]
  }
  return md
}

const POST = async (req) => {
  try {
    const body = await req.json()
    const slug = trim(body.tier_slug)
    const regType = trim(body.registration_type)

    if (!slug) return NextResponse.json({ error: 'Missing tier_slug' }, { status: 400 })
    if (!regType)
      return NextResponse.json({ error: 'Missing registration_type' }, { status: 400 })

    const priceId = priceIdForSlug(slug)
    if (!priceId)
      return NextResponse.json({ error: `Unknown tier: ${slug}` }, { status: 400 })

    /* Foursome validation first so the player-level errors surface
     * before the email check. Player 1 also acts as the purchaser, so
     * we backfill body.purchaser from players[0] if the client didn't
     * send it explicitly. */
    if (regType === 'foursome') {
      const players = Array.isArray(body.players) ? body.players : []
      if (players.length !== 4) {
        return NextResponse.json({ error: 'Foursome requires 4 players' }, { status: 400 })
      }
      for (let i = 0; i < 4; i++) {
        const p = players[i] ?? {}
        if (!trim(p.fullName) || !trim(p.email) || !trim(p.phone)) {
          return NextResponse.json(
            { error: `Player ${i + 1} is missing required fields` },
            { status: 400 },
          )
        }
      }
      const lead = players[0]
      const parts = trim(lead.fullName).split(/\s+/)
      body.purchaser = {
        firstName: trim(body.purchaser?.firstName) || parts[0] || '',
        lastName: trim(body.purchaser?.lastName) || parts.slice(1).join(' '),
        email: trim(body.purchaser?.email) || trim(lead.email),
        phone: trim(body.purchaser?.phone) || trim(lead.phone),
        organization: trim(body.purchaser?.organization) || trim(lead.groupInfo),
        notes: trim(body.purchaser?.notes) || trim(lead.notes),
      }
    }

    const purchaser = body.purchaser ?? {}
    if (!trim(purchaser.email)) {
      return NextResponse.json({ error: 'Purchaser email is required' }, { status: 400 })
    }
    if (!trim(purchaser.firstName) && regType !== 'foursome') {
      return NextResponse.json({ error: 'First name is required' }, { status: 400 })
    }

    if (regType === 'sponsor') {
      const sponsor = body.sponsor ?? {}
      if (!trim(sponsor.company)) {
        return NextResponse.json(
          { error: 'Sponsor company name is required' },
          { status: 400 },
        )
      }
    }

    const regId = registrationId()
    const groupId = regType === 'foursome' ? groupFoursomeId() : null
    const metadata = buildSessionMetadata(body, regId, groupId)

    const session = await stripe().checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: trim(purchaser.email) || trim(body.players?.[0]?.email),
      /* Blueprint §4 requires the billing address — Stripe collects it
       * directly inside the hosted Checkout so we don't have to ask
       * for it in our React form. */
      billing_address_collection: 'required',
      success_url: `${SITE_URL}/registration/success?reg_id=${regId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/registration/cancel?reg_id=${regId}`,
      metadata,
      payment_intent_data: {
        metadata,
        description: `${metadata.product_name ?? 'Hackin4Harden'} (${regType}) · ${regId}`,
      },
    })

    return NextResponse.json({ url: session.url, registrationId: regId })
  } catch (error) {
    console.error('[Checkout API]:', error)
    return NextResponse.json(
      { error: error.message || 'Checkout failed' },
      { status: 500 },
    )
  }
}

export { POST }
