'use client'

import Link from 'next/link'

import { useEffect, useMemo, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  Award,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Flag,
  HandHeart,
  Loader2,
  Medal,
  ShieldCheck,
  Star,
  Target,
  Ticket,
  Trophy,
  Users,
  Utensils,
} from 'lucide-react'

import FadeIn from '@/components/motion/fade-in'
import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import Section from '@/components/sections/section'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Checkbox, Field, Input, Textarea } from '@/components/ui/form-field'
import SectionHeader from '@/components/ui/section-header'
import SmsConsent from '@/components/ui/sms-consent'

import { siteConfig } from '@/constants/site'

/* iconName → Lucide component. Server passes a serializable string; client
 * resolves it here so the lucide-react import never crosses the boundary. */
const ICONS = {
  Flag,
  HandHeart,
  Medal,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  Utensils,
}

/* Section copy keyed by category. Client raised the order-and-grouping
 * concern in the May-13 review (Operation 1776 Slack), so the page is
 * now split into three top-level sections instead of one mixed grid. */
const SECTIONS = {
  ticket: {
    id: 'tickets',
    eyebrow: 'Tickets · Play the tournament',
    Icon: Ticket,
    title: (
      <>
        Reserve your <span className="text-green-500">spot</span> at the 11th Annual.
      </>
    ),
    lead: 'Pick a foursome for the full team experience or grab an individual seat — both include 18 holes with cart, breakfast, and BBQ lunch.',
  },
  sponsor: {
    id: 'sponsorships',
    eyebrow: 'Sponsorships · Support the cause',
    Icon: Award,
    title: (
      <>
        Become a tournament <span className="text-gold-400">sponsor</span>.
      </>
    ),
    lead: 'Stand behind the Joshua Cole Harden Scholarship Fund and The First Tee of Phoenix with on-course recognition at every level.',
  },
  donation: {
    id: 'donations',
    eyebrow: 'Donations · Joshua Cole Harden Scholarship Fund',
    Icon: HandHeart,
    title: (
      <>
        Give directly to the <span className="text-green-500">fund</span>.
      </>
    ),
    lead: 'Every dollar grows the Joshua Cole Harden Scholarship Fund and supports The First Tee of Phoenix. A Stripe receipt is emailed automatically.',
  },
}

const EMPTY_PLAYER = { fullName: '', email: '', phone: '', groupInfo: '', notes: '' }

const EMPTY_SPONSOR = { company: '', website: '', logoUrl: '', notes: '' }

const isPlayerComplete = (p) =>
  p.fullName.trim() !== '' && p.email.trim() !== '' && p.phone.trim() !== ''

const fallbackBlurb = (category) => {
  if (category === 'donation') return 'Donation to the Joshua Cole Harden Scholarship Fund.'
  if (category === 'sponsor') return 'Sponsorship of the 11th Annual Hackin’ for Harden.'
  return ''
}

const TierGrid = ({ tiers, selectedId, onSelect }) => (
  <Stagger
    className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:auto-rows-fr sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 md:grid-cols-2 lg:grid-cols-3"
    delay={0.07}
  >
    {tiers.map((t) => {
      const Icon = ICONS[t.iconName] ?? Utensils
      const isSelected = selectedId === t.id
      return (
        <StaggerItem
          key={t.id}
          className="w-[78%] flex-none snap-start sm:h-full sm:w-auto sm:flex-initial"
        >
          <button
            type="button"
            onClick={() => onSelect(t.id)}
            aria-pressed={isSelected}
            className="group/tier block h-full w-full cursor-pointer text-left focus:outline-none focus-visible:rounded-xl focus-visible:ring-2 focus-visible:ring-green-500/40 focus-visible:ring-offset-2"
          >
            <MotionCard
              glow={t.accent === 'gold' ? 'gold' : 'green'}
              className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white p-7 transition-[border-color,box-shadow,background-color] duration-300 ${
                isSelected
                  ? 'border-green-500 ring-2 ring-green-500/30'
                  : 'border-cream-200 group-hover/tier:border-green-300 group-hover/tier:bg-cream-50/40'
              }`}
            >
              <div
                className={`absolute inset-x-7 top-0 h-[3px] ${
                  t.accent === 'gold' ? 'bg-gold-400' : 'bg-green-500'
                }`}
                aria-hidden
              />

              {/* Header row — fixed height regardless of badge presence */}
              <div className="flex h-11 items-start justify-between gap-4">
                <div
                  className={`border-cream-200 bg-cream-50 flex h-11 w-11 flex-none items-center justify-center rounded-lg border ${
                    t.accent === 'gold' ? 'text-gold-500' : 'text-green-500'
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                {t.featured ? <Badge variant="green">Most popular</Badge> : null}
              </div>

              <h3 className="font-display text-navy-900 mt-6 min-h-[3.5rem] text-xl leading-tight font-semibold tracking-tight">
                {t.name}
              </h3>

              <p className="font-display text-navy-900 mt-3 text-3xl font-bold tracking-tight">
                {t.formattedPrice}
              </p>

              <ul className="border-cream-200 mt-6 flex-1 space-y-2.5 border-t pt-5">
                {t.includes ? (
                  t.includes.map((item) => (
                    <li
                      key={item}
                      className="text-mesh-700 flex items-start gap-2.5 text-sm leading-relaxed"
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 flex-none ${
                          t.accent === 'gold' ? 'text-gold-500' : 'text-green-500'
                        }`}
                        strokeWidth={2.25}
                      />
                      <span>{item}</span>
                    </li>
                  ))
                ) : (
                  <li className="text-mesh-500 text-sm leading-relaxed italic">
                    {fallbackBlurb(t.category)}
                  </li>
                )}
              </ul>

              <p
                className={`border-cream-100 mt-auto inline-flex items-center gap-2 border-t pt-5 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase ${
                  isSelected
                    ? 'text-green-600'
                    : 'text-navy-900 group-hover/tier:text-green-600'
                }`}
              >
                {isSelected ? 'Selected' : 'Choose this tier'}{' '}
                <ArrowRight className="h-3.5 w-3.5" />
              </p>
            </MotionCard>
          </button>
        </StaggerItem>
      )
    })}
  </Stagger>
)

const TierSection = ({ category, tiers, selectedId, onSelect, bgClass }) => {
  if (tiers.length === 0) return null
  const meta = SECTIONS[category]
  const SectionIcon = meta.Icon
  return (
    <Section id={meta.id} className={bgClass}>
      <SectionHeader
        eyebrow={
          <span className="inline-flex items-center gap-2">
            <SectionIcon className="h-3.5 w-3.5" /> {meta.eyebrow}
          </span>
        }
        title={meta.title}
        lead={meta.lead}
      />
      <TierGrid tiers={tiers} selectedId={selectedId} onSelect={onSelect} />
    </Section>
  )
}

const RegistrationClient = ({ groupedTiers, allTiers }) => {
  const defaultTier =
    allTiers.find((t) => t.featured)?.id ?? allTiers[0]?.id ?? ''
  const [tier, setTier] = useState(defaultTier)
  const [activePlayer, setActivePlayer] = useState(0)
  const [players, setPlayers] = useState([
    { ...EMPTY_PLAYER },
    { ...EMPTY_PLAYER },
    { ...EMPTY_PLAYER },
    { ...EMPTY_PLAYER },
  ])
  const [purchaser, setPurchaser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organization: '',
    notes: '',
  })
  const [sponsor, setSponsor] = useState({ ...EMPTY_SPONSOR })
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')

  const currentTier = useMemo(
    () => allTiers.find((t) => t.id === tier) ?? allTiers[0],
    [allTiers, tier],
  )

  const category = currentTier?.category ?? 'ticket'
  const isFoursome = category === 'ticket' && currentTier?.productName === 'Foursome'

  /* When tier changes, reset secondary blocks that don't apply to the
   * new category. Keeps state clean across switches. */
  useEffect(() => {
    if (category !== 'sponsor') setSponsor({ ...EMPTY_SPONSOR })
    if (category === 'ticket' && !isFoursome) {
      // Keep Player 1 (lead) state; clear the other three
      setPlayers((prev) => [
        prev[0],
        { ...EMPTY_PLAYER },
        { ...EMPTY_PLAYER },
        { ...EMPTY_PLAYER },
      ])
      setActivePlayer(0)
    }
    if (category === 'sponsor' || category === 'donation') {
      setActivePlayer(0)
    }
  }, [category, isFoursome])

  const updatePlayer = (index, field, value) => {
    setPlayers((prev) => {
      const next = prev.slice()
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const updatePurchaser = (field, value) =>
    setPurchaser((prev) => ({ ...prev, [field]: value }))
  const updateSponsor = (field, value) =>
    setSponsor((prev) => ({ ...prev, [field]: value }))

  const handleSelect = (id) => {
    setTier(id)
    setSubmitError('')
    document
      .getElementById('register-form')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const allPlayersComplete = players.every(isPlayerComplete)
  const individualReady = !isFoursome || allPlayersComplete

  const sponsorReady = category !== 'sponsor' || sponsor.company.trim() !== ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (isFoursome && !allPlayersComplete) {
      setSubmitError('Please complete all four players (name, email, phone) before continuing.')
      return
    }
    if (!sponsorReady) {
      setSubmitError('Please provide your company / organization name to continue.')
      return
    }
    setSubmitting(true)

    /* Assemble the payload the /api/checkout route expects. The server
     * regenerates registration_id + group_foursome_id, looks up the
     * Stripe Price ID from the tier slug, and starts a Checkout Session. */
    const payload = {
      tier_slug: currentTier?.id,
      product_name: currentTier?.productName,
      stripe_price_id: currentTier?.stripePriceId,
      amount: currentTier?.price,
      registration_type:
        category === 'sponsor' || category === 'donation'
          ? category
          : isFoursome
            ? 'foursome'
            : 'individual',
      purchaser:
        isFoursome
          ? {
              firstName: players[0].fullName.split(' ')[0] ?? '',
              lastName: players[0].fullName.split(' ').slice(1).join(' '),
              email: players[0].email,
              phone: players[0].phone,
              fullName: players[0].fullName,
              groupInfo: players[0].groupInfo,
              notes: players[0].notes,
            }
          : {
              firstName: purchaser.firstName,
              lastName: purchaser.lastName,
              email: purchaser.email,
              phone: purchaser.phone,
              fullName: `${purchaser.firstName} ${purchaser.lastName}`.trim(),
              organization: purchaser.organization,
              notes: purchaser.notes,
            },
      players: isFoursome ? players : null,
      sponsor:
        category === 'sponsor'
          ? {
              company: sponsor.company,
              tier: currentTier?.name ?? '',
              website: sponsor.website,
              logoUrl: sponsor.logoUrl,
              notes: sponsor.notes,
            }
          : null,
    }

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok || !data.url) {
        throw new Error(data.error || 'Checkout could not start. Please try again.')
      }
      window.location.assign(data.url)
    } catch (err) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
      setSubmitting(false)
    }
  }

  if (!currentTier) {
    return (
      <Section id="tiers" className="bg-cream-50">
        <SectionHeader
          eyebrow="Sponsors · Registration"
          title={<>Tiers temporarily unavailable.</>}
          lead="We could not load sponsorship tiers from GoHighLevel. Please refresh the page or reach Andy Harden directly at hackinforeharden@gmail.com."
        />
      </Section>
    )
  }

  return (
    <>
      <TierSection
        category="ticket"
        tiers={groupedTiers.ticket}
        selectedId={tier}
        onSelect={handleSelect}
        bgClass="bg-cream-50"
      />
      <TierSection
        category="sponsor"
        tiers={groupedTiers.sponsor}
        selectedId={tier}
        onSelect={handleSelect}
        bgClass="bg-cream-100"
      />
      <TierSection
        category="donation"
        tiers={groupedTiers.donation}
        selectedId={tier}
        onSelect={handleSelect}
        bgClass="bg-cream-50"
      />

      {/* Registration form */}
      <Section id="register-form" className="bg-cream-100">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Register"
              title={
                <>
                  Send your <span className="text-green-500">registration</span>.
                </>
              }
              lead="Fill in your details below to register, sponsor, or donate. Payment is processed by Stripe on the next screen."
            />
            <div className="border-cream-200 mt-10 space-y-5 border-t pt-8 text-sm">
              <div>
                <p className="text-mesh-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                  Need to talk first?
                </p>
                <p className="text-mesh-700 mt-2">
                  Reach Andy Harden directly at{' '}
                  <a
                    href="mailto:hackinforeharden@gmail.com"
                    className="font-semibold text-green-600 hover:underline"
                  >
                    hackinforeharden@gmail.com
                  </a>{' '}
                  or call <span className="text-navy-900 font-semibold">480-414-8891</span>.
                </p>
              </div>
              <div>
                <p className="text-mesh-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                  Tournament logistics
                </p>
                <p className="text-mesh-700 mt-2">
                  Matt Nebel · Golf Outing Sales Manager / Tournament Coordinator at The Legacy Golf
                  Course · <span className="text-navy-900 font-semibold">602-305-5550</span>
                </p>
              </div>
            </div>
          </div>

          <FadeIn className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="border-cream-200 shadow-elev space-y-6 rounded-2xl border bg-white p-8 sm:p-10"
            >
              {/* Selected tier summary */}
              {(() => {
                const CurrentIcon = ICONS[currentTier.iconName] ?? Utensils
                const isGold = currentTier.accent === 'gold'
                return (
                  <Field id="reg-tier" label="Selected tier">
                    <div
                      className={`flex items-center gap-3 rounded-lg border bg-white p-3 sm:gap-4 sm:p-4 ${
                        isGold ? 'border-gold-300/60' : 'border-green-300/70'
                      }`}
                    >
                      <div
                        className={`border-cream-200 bg-cream-50 flex h-11 w-11 flex-none items-center justify-center rounded-lg border ${
                          isGold ? 'text-gold-500' : 'text-green-500'
                        }`}
                        aria-hidden
                      >
                        <CurrentIcon className="h-5 w-5" strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-navy-900 font-display truncate text-base font-semibold tracking-tight">
                          {currentTier.name}
                        </p>
                        <p className="text-mesh-500 font-mono text-[11px] font-semibold tracking-[0.18em] uppercase">
                          {currentTier.formattedPrice} · {SECTIONS[category].eyebrow.split(' · ')[0]}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          const targetId = SECTIONS[category].id
                          document
                            .getElementById(targetId)
                            ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="text-mesh-700 hover:text-navy-900 hover:bg-cream-100 inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors"
                      >
                        Change <ArrowRight className="h-3 w-3" />
                      </button>
                      <input type="hidden" name="tier" value={tier} />
                    </div>
                  </Field>
                )
              })()}

              {/* Foursome (4 player tabs) */}
              {isFoursome ? (
                <FoursomePanel
                  players={players}
                  activePlayer={activePlayer}
                  setActivePlayer={setActivePlayer}
                  updatePlayer={updatePlayer}
                />
              ) : (
                <PurchaserBlock
                  category={category}
                  purchaser={purchaser}
                  updatePurchaser={updatePurchaser}
                  isIndividualGolfer={category === 'ticket'}
                />
              )}

              {/* Sponsor block */}
              {category === 'sponsor' ? (
                <SponsorBlock sponsor={sponsor} updateSponsor={updateSponsor} />
              ) : null}

              <SmsConsent idPrefix="reg" />

              <div className="border-cream-200 bg-cream-50 space-y-3 rounded-lg border p-5">
                <Checkbox
                  id="reg-terms"
                  name="termsAccepted"
                  label={
                    <>
                      I&apos;ve read and accept the{' '}
                      <Link
                        href={siteConfig.legalRoutes.terms}
                        className="font-semibold text-green-600 hover:underline"
                      >
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link
                        href={siteConfig.legalRoutes.privacy}
                        className="font-semibold text-green-600 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                      .
                    </>
                  }
                  required
                />
              </div>

              {submitError ? (
                <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {submitError}
                </p>
              ) : null}

              <div className="border-cream-200 flex flex-wrap items-center gap-4 border-t pt-6">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting || !individualReady || !sponsorReady}
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" /> Starting checkout…
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4" /> Continue to payment ·{' '}
                      {currentTier.formattedPrice}
                    </>
                  )}
                </Button>
                {isFoursome && !individualReady ? (
                  <p className="text-mesh-500 text-xs">
                    Complete all four players (name, email, phone) to enable submission.
                  </p>
                ) : null}
                <p className="text-mesh-500 text-xs">
                  Payment processed securely by Stripe. We never store your card details.
                </p>
              </div>
            </form>
          </FadeIn>
        </div>
      </Section>
    </>
  )
}

const PurchaserBlock = ({ category, purchaser, updatePurchaser, isIndividualGolfer }) => {
  const labels = {
    sponsor: {
      heading: 'Sponsor contact',
      subtitle: 'Where we send the sponsor agreement and asset request.',
      org: 'Company / Organization (will pre-fill sponsor block below)',
    },
    donation: {
      heading: 'Your details',
      subtitle: 'Where we send your receipt and thank-you note.',
      org: 'Company / Organization (optional — for matching gift programs)',
    },
    ticket: {
      heading: 'Your details',
      subtitle: 'Where we send confirmation and tournament reminders.',
      org: 'Team / Company (optional — for scoring board)',
    },
  }[category] ?? {}
  return (
    <div className="space-y-4">
      <div className="border-cream-200 bg-cream-50 flex items-center gap-4 rounded-xl border p-4">
        <div className="bg-green-500 text-cream-50 flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-[0_8px_18px_-10px_rgba(46,125,63,0.55)]">
          <Users className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-navy-900 font-display text-sm font-semibold tracking-tight">
            {labels.heading}
          </p>
          <p className="text-mesh-600 mt-0.5 text-xs leading-relaxed">{labels.subtitle}</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="reg-first" label="First name" required>
          <Input
            id="reg-first"
            name="firstName"
            type="text"
            autoComplete="given-name"
            value={purchaser.firstName}
            onChange={(e) => updatePurchaser('firstName', e.target.value)}
            required
          />
        </Field>
        <Field id="reg-last" label="Last name" required>
          <Input
            id="reg-last"
            name="lastName"
            type="text"
            autoComplete="family-name"
            value={purchaser.lastName}
            onChange={(e) => updatePurchaser('lastName', e.target.value)}
            required
          />
        </Field>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="reg-email" label="Email" required>
          <Input
            id="reg-email"
            name="email"
            type="email"
            autoComplete="email"
            value={purchaser.email}
            onChange={(e) => updatePurchaser('email', e.target.value)}
            required
          />
        </Field>
        <Field id="reg-phone" label="Phone" required={isIndividualGolfer}>
          <Input
            id="reg-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="(480) 555-0123"
            value={purchaser.phone}
            onChange={(e) => updatePurchaser('phone', e.target.value)}
            required={isIndividualGolfer}
          />
        </Field>
      </div>
      <Field id="reg-org" label={labels.org}>
        <Input
          id="reg-org"
          name="organization"
          type="text"
          autoComplete="organization"
          value={purchaser.organization}
          onChange={(e) => updatePurchaser('organization', e.target.value)}
        />
      </Field>
      <Field id="reg-notes" label="Special requests / notes">
        <Textarea
          id="reg-notes"
          name="notes"
          rows={3}
          value={purchaser.notes}
          onChange={(e) => updatePurchaser('notes', e.target.value)}
          placeholder="Dietary restrictions, accessibility, anything else we should know."
        />
      </Field>
    </div>
  )
}

const SponsorBlock = ({ sponsor, updateSponsor }) => (
  <div className="space-y-4">
    <div className="border-gold-300/60 bg-gold-50/60 flex items-center gap-4 rounded-xl border p-4">
      <div className="bg-gold-500 text-cream-50 flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-[0_8px_18px_-10px_rgba(180,140,40,0.55)]">
        <Award className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-navy-900 font-display text-sm font-semibold tracking-tight">
          Sponsor details
        </p>
        <p className="text-mesh-600 mt-0.5 text-xs leading-relaxed">
          Used for on-course recognition, the program book, and our sponsor thank-you outreach.
        </p>
      </div>
    </div>
    <Field id="sponsor-company" label="Company / Sponsor name (as displayed)" required>
      <Input
        id="sponsor-company"
        name="sponsorCompany"
        type="text"
        autoComplete="organization"
        value={sponsor.company}
        onChange={(e) => updateSponsor('company', e.target.value)}
        required
      />
    </Field>
    <div className="grid gap-5 sm:grid-cols-2">
      <Field id="sponsor-website" label="Website">
        <Input
          id="sponsor-website"
          name="sponsorWebsite"
          type="url"
          placeholder="https://"
          value={sponsor.website}
          onChange={(e) => updateSponsor('website', e.target.value)}
        />
      </Field>
      <Field id="sponsor-logo" label="Logo URL" hint="Hosted logo link — we'll follow up if missing.">
        <Input
          id="sponsor-logo"
          name="sponsorLogoUrl"
          type="url"
          placeholder="https://"
          value={sponsor.logoUrl}
          onChange={(e) => updateSponsor('logoUrl', e.target.value)}
        />
      </Field>
    </div>
    <Field id="sponsor-notes" label="Sponsor notes">
      <Textarea
        id="sponsor-notes"
        name="sponsorNotes"
        rows={3}
        value={sponsor.notes}
        onChange={(e) => updateSponsor('notes', e.target.value)}
        placeholder="Preferred listing name, slogan, special requests."
      />
    </Field>
  </div>
)

const FoursomePanel = ({ players, activePlayer, setActivePlayer, updatePlayer }) => (
  <div className="space-y-4">
    <div className="border-cream-200 bg-cream-50 flex items-center gap-4 rounded-xl border p-4">
      <div className="bg-green-500 text-cream-50 flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-[0_8px_18px_-10px_rgba(46,125,63,0.55)]">
        <Users className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-navy-900 font-display text-sm font-semibold tracking-tight">
          Foursome registration
        </p>
        <p className="text-mesh-600 mt-0.5 text-xs leading-relaxed">
          Player 1 is the lead contact. Name, email and phone are required for all four players.
        </p>
      </div>
      <div className="flex-none text-right">
        <p className="text-mesh-500 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase">
          Complete
        </p>
        <p className="font-display text-navy-900 text-xl leading-none font-bold tabular-nums">
          {players.filter(isPlayerComplete).length}
          <span className="text-mesh-400 text-sm font-semibold">/4</span>
        </p>
      </div>
    </div>

    <div
      role="tablist"
      aria-label="Foursome player entries"
      className="border-cream-200 bg-cream-100/60 flex gap-1 rounded-xl border p-1.5"
    >
      {players.map((p, idx) => {
        const active = activePlayer === idx
        const complete = isPlayerComplete(p)
        const isLeadTab = idx === 0
        return (
          <button
            key={idx}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`reg-p${idx + 1}-panel`}
            id={`reg-p${idx + 1}-tab`}
            onClick={() => setActivePlayer(idx)}
            className={`group/tab relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-2.5 text-xs font-semibold tracking-tight transition-all duration-200 sm:px-3 sm:text-sm ${
              active
                ? 'text-navy-900 bg-white shadow-[0_4px_14px_-8px_rgba(11,18,32,0.25)]'
                : 'text-mesh-600 hover:text-navy-900 hover:bg-white/60'
            }`}
          >
            <span
              className={`flex h-6 w-6 flex-none items-center justify-center rounded-full font-mono text-[10px] font-bold transition-colors duration-200 ${
                complete
                  ? 'bg-green-500 text-cream-50'
                  : active
                    ? 'bg-green-500/15 text-green-700'
                    : 'bg-cream-200 text-mesh-600 group-hover/tab:bg-cream-300'
              }`}
              aria-hidden
            >
              {complete ? <Check className="h-3 w-3" strokeWidth={3} /> : idx + 1}
            </span>
            <span className="hidden sm:inline">Player {idx + 1}</span>
            <span className="sm:hidden">P{idx + 1}</span>
            {isLeadTab && active ? (
              <span className="bg-green-500/12 text-green-700 ml-0.5 hidden rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.15em] uppercase md:inline">
                Lead
              </span>
            ) : null}
            {active ? (
              <motion.span
                layoutId="foursome-tab-indicator"
                className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-green-500"
                transition={{ type: 'spring', stiffness: 340, damping: 30 }}
                aria-hidden
              />
            ) : null}
          </button>
        )
      })}
    </div>

    <AnimatePresence mode="wait" initial={false}>
      {players.map((player, index) => {
        if (index !== activePlayer) return null
        const isLead = index === 0
        const playerNum = index + 1
        const idBase = `reg-p${playerNum}`
        const complete = isPlayerComplete(player)
        return (
          <motion.div
            key={playerNum}
            role="tabpanel"
            id={`${idBase}-panel`}
            aria-labelledby={`${idBase}-tab`}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className={`overflow-hidden rounded-xl border p-4 sm:p-5 ${
              isLead
                ? 'border-green-300 bg-gradient-to-br from-green-500/[0.05] to-transparent'
                : 'border-cream-200 bg-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-7 w-7 flex-none items-center justify-center rounded-full font-mono text-xs font-bold transition-colors duration-200 ${
                  complete
                    ? 'bg-green-500 text-cream-50'
                    : isLead
                      ? 'bg-green-500/15 text-green-700'
                      : 'bg-cream-200 text-mesh-600'
                }`}
                aria-hidden
              >
                {complete ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : playerNum}
              </span>
              <h4 className="text-navy-900 font-display text-base font-semibold tracking-tight">
                Player {playerNum}
                {isLead ? (
                  <span className="text-mesh-500 ml-1.5 font-sans text-xs font-normal">
                    · primary registrant
                  </span>
                ) : null}
              </h4>
              {isLead ? (
                <Badge variant="green" className="ml-auto">
                  Lead contact
                </Badge>
              ) : null}
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Field id={`${idBase}-name`} label="Full name" required>
                <Input
                  id={`${idBase}-name`}
                  name={`player${playerNum}.fullName`}
                  type="text"
                  autoComplete={isLead ? 'name' : 'off'}
                  value={player.fullName}
                  onChange={(e) => updatePlayer(index, 'fullName', e.target.value)}
                  required
                />
              </Field>
              <Field id={`${idBase}-email`} label="Email" required>
                <Input
                  id={`${idBase}-email`}
                  name={`player${playerNum}.email`}
                  type="email"
                  autoComplete={isLead ? 'email' : 'off'}
                  value={player.email}
                  onChange={(e) => updatePlayer(index, 'email', e.target.value)}
                  required
                />
              </Field>
              <Field id={`${idBase}-phone`} label="Phone" required>
                <Input
                  id={`${idBase}-phone`}
                  name={`player${playerNum}.phone`}
                  type="tel"
                  autoComplete={isLead ? 'tel' : 'off'}
                  placeholder="(480) 555-0123"
                  value={player.phone}
                  onChange={(e) => updatePlayer(index, 'phone', e.target.value)}
                  required
                />
              </Field>
            </div>

            <div className="mt-3 grid gap-4 md:grid-cols-2">
              <Field
                id={`${idBase}-group`}
                label={isLead ? 'Team / Company' : 'Role'}
                hint={
                  isLead
                    ? 'How the team is listed at scoring.'
                    : 'e.g. coworker, friend, family.'
                }
              >
                <Input
                  id={`${idBase}-group`}
                  name={`player${playerNum}.groupInfo`}
                  type="text"
                  value={player.groupInfo}
                  onChange={(e) => updatePlayer(index, 'groupInfo', e.target.value)}
                />
              </Field>
              <Field id={`${idBase}-notes`} label="Notes" hint="Shirt size, dietary, accessibility.">
                <Input
                  id={`${idBase}-notes`}
                  name={`player${playerNum}.notes`}
                  type="text"
                  value={player.notes}
                  onChange={(e) => updatePlayer(index, 'notes', e.target.value)}
                />
              </Field>
            </div>
          </motion.div>
        )
      })}
    </AnimatePresence>

    <div className="border-cream-200 flex items-center justify-between gap-3 border-t pt-4">
      <button
        type="button"
        onClick={() => setActivePlayer((p) => Math.max(0, p - 1))}
        disabled={activePlayer === 0}
        className="text-mesh-700 hover:text-navy-900 hover:bg-cream-100 disabled:hover:bg-transparent inline-flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold tracking-tight transition-colors disabled:cursor-not-allowed disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" /> Previous
      </button>
      <span className="text-mesh-500 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase">
        Player {activePlayer + 1} of 4
      </span>
      <button
        type="button"
        onClick={() => setActivePlayer((p) => Math.min(players.length - 1, p + 1))}
        disabled={activePlayer === players.length - 1}
        className="text-cream-50 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold tracking-tight transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-cream-300 disabled:text-mesh-500"
      >
        Next <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  </div>
)

export default RegistrationClient
