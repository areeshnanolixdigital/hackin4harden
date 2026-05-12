'use client'

import Link from 'next/link'

import { useEffect, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowRight,
  CalendarRange,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Flag,
  HandHeart,
  Lock,
  MapPin,
  Medal,
  ShieldCheck,
  Star,
  Target,
  Trophy,
  Users,
  Utensils,
} from 'lucide-react'

import FadeIn from '@/components/motion/fade-in'
import MotionCard from '@/components/motion/motion-card'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import { Checkbox, Field, Input, Textarea } from '@/components/ui/form-field'
import SectionHeader from '@/components/ui/section-header'
import SmsConsent from '@/components/ui/sms-consent'

import { siteConfig } from '@/constants/site'

/* TIERS — names + prices verbatim from source registration page.
 * Source provides NO per-tier perks or marketing descriptions, so cards
 * carry only a tier name and dollar amount. The Foursome and Individual
 * Golfer tiers are exceptions: source explicitly lists what is included
 * with each player's entry (event details block on home page).
 */
const TIERS = [
  {
    id: 'foursome',
    icon: Users,
    name: 'Foursome',
    price: '$600',
    accent: 'green',
    featured: true,
    includes: [
      '4 players · full team entry',
      '18 holes with cart',
      'Breakfast',
      'BBQ lunch buffet',
      'Prizes · hole-in-one · proximity',
    ],
  },
  { id: 'platinum', icon: Star, name: 'Platinum Sponsor', price: '$10,000', accent: 'gold' },
  { id: 'shirt', icon: Trophy, name: 'Golf Shirt Sponsorship', price: '$5,000', accent: 'gold' },
  { id: 'gold', icon: Trophy, name: 'Gold Sponsor', price: '$5,000', accent: 'gold' },
  { id: 'silver', icon: Medal, name: 'Silver Sponsor', price: '$2,500', accent: 'green' },
  { id: 'flag', icon: Flag, name: 'Flag Sponsorship', price: '$1,000', accent: 'green' },
  {
    id: 'cart',
    icon: ShieldCheck,
    name: 'Golf Cart Sponsorship',
    price: '$1,000',
    accent: 'green',
  },
  { id: 'hole', icon: Target, name: 'Hole Sponsorship', price: '$500', accent: 'green' },
  { id: 'donation500', icon: HandHeart, name: 'Donation', price: '$500', accent: 'green' },
  { id: 'donation300', icon: HandHeart, name: 'Donation', price: '$300', accent: 'green' },
  { id: 'donation250', icon: HandHeart, name: 'Donation', price: '$250', accent: 'green' },
  { id: 'donation200', icon: HandHeart, name: 'Donation', price: '$200', accent: 'green' },
  {
    id: 'individual',
    icon: Target,
    name: 'Individual Golfer',
    price: '$150',
    accent: 'gold',
    /* Source: home.txt — verbatim event details list */
    includes: [
      '18 holes with cart',
      'Breakfast',
      'BBQ lunch buffet',
      'Prizes',
      'Hole in one contest',
      'Proximity prizes',
    ],
  },
  { id: 'reception', icon: Utensils, name: 'Reception Luncheon', price: '$100', accent: 'green' },
  { id: 'donation100', icon: HandHeart, name: 'Donation', price: '$100', accent: 'green' },
]

const SUBMITTED_STORAGE_KEY = 'h4h:registration:submitted'

const EMPTY_PLAYER = { fullName: '', email: '', phone: '', groupInfo: '', notes: '' }

const isPlayerComplete = (p) =>
  p.fullName.trim() !== '' && p.email.trim() !== '' && p.phone.trim() !== ''

const RegistrationPage = () => {
  const [tier, setTier] = useState('foursome')
  const [submitted, setSubmitted] = useState(false)
  const [activePlayer, setActivePlayer] = useState(0)
  const [players, setPlayers] = useState([
    { ...EMPTY_PLAYER },
    { ...EMPTY_PLAYER },
    { ...EMPTY_PLAYER },
    { ...EMPTY_PLAYER },
  ])

  /* Rehydrate the lockout on reload so a submitted registrant cannot
     simply refresh the page to get an editable form back. */
  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (window.localStorage.getItem(SUBMITTED_STORAGE_KEY) === '1') {
        setSubmitted(true)
      }
    } catch {
      /* localStorage unavailable (private mode, etc.) — submitted stays false */
    }
  }, [])

  const updatePlayer = (index, field, value) => {
    setPlayers((prev) => {
      const next = prev.slice()
      next[index] = { ...next[index], [field]: value }
      return next
    })
  }

  const allPlayersComplete = players.every(isPlayerComplete)
  const foursomeReady = tier !== 'foursome' || allPlayersComplete

  const handleSubmit = (e) => {
    e.preventDefault()
    if (tier === 'foursome' && !allPlayersComplete) return
    try {
      window.localStorage.setItem(SUBMITTED_STORAGE_KEY, '1')
    } catch {
      /* ignore — UI still locks for this session via state */
    }
    setSubmitted(true)
  }

  return (
    <main>
      <PageHero
        eyebrow="Registration"
        title={
          <>
            <span className="text-gold-400">2026</span> Registration Now Open!
          </>
        }
        lead="Welcome to the 11th Annual Hackin' for Harden memorial golf tournament in honor of Joshua Cole Harden. In partnership with The Legacy Golf Course and The First Tee of Phoenix, registration for this year's tournament is now OPEN."
      >
        <div className="text-cream-100/70 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
          <span className="inline-flex items-center gap-2">
            <CalendarRange className="text-gold-400 h-4 w-4" /> Saturday, June 6, 2026 · 7:30 AM
            shotgun
          </span>
          <a
            href={siteConfig.event.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open The Legacy Golf Club on Google Maps"
            className="hover:text-cream-50 group inline-flex items-center gap-2 transition-colors"
          >
            <MapPin className="h-4 w-4 text-green-300 transition-colors group-hover:text-green-200" />
            <span className="group-hover:underline group-hover:underline-offset-4">
              The Legacy Golf Club, Phoenix
            </span>
          </a>
        </div>
      </PageHero>

      {/* Sponsorship tiers */}
      <Section id="tiers" className="bg-cream-50">
        <SectionHeader
          eyebrow="Sponsors · Registration"
          title={
            <>
              Sponsorship tiers and <span className="text-green-500">registration</span> options.
            </>
          }
          lead="Tier names and amounts are taken directly from the source registration page. Donations grow the Joshua Cole Harden Scholarship Fund and benefit The First Tee of Phoenix."
        />

        {/* Mobile: horizontal snap carousel (peek next card to signal scrollability).
            sm+ : standard grid. Cards keep their full content and motion. */}
        <Stagger
          className="no-scrollbar mt-10 -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-6 scroll-px-5 sm:mt-14 sm:mx-0 sm:grid sm:auto-rows-fr sm:snap-none sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 sm:scroll-px-0 md:grid-cols-2 lg:grid-cols-3"
          delay={0.07}
        >
          {TIERS.map((t) => {
            const Icon = t.icon
            const isSelected = tier === t.id
            return (
              <StaggerItem
                key={t.id}
                className="w-[78%] flex-none snap-start sm:h-full sm:w-auto sm:flex-initial"
              >
                <button
                  type="button"
                  onClick={() => {
                    setTier(t.id)
                    document
                      .getElementById('register-form')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
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

                    {/* Title — stable 2-line height so 1-line names don't push price up */}
                    <h3 className="font-display text-navy-900 mt-6 min-h-[3.5rem] text-xl leading-tight font-semibold tracking-tight">
                      {t.name}
                    </h3>

                    {/* Price — primary card content */}
                    <p className="font-display text-navy-900 mt-3 text-3xl font-bold tracking-tight">
                      {t.price}
                    </p>

                    {/* Includes (Individual Golfer only — source explicitly lists this) */}
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
                          {t.name === 'Donation'
                            ? 'Donation to the Joshua Cole Harden Scholarship Fund.'
                            : 'Sponsorship of the 11th Annual Hackin’ for Harden.'}
                        </li>
                      )}
                    </ul>

                    {/* CTA — pinned to card bottom via mt-auto + visual divider */}
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
      </Section>

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
              lead="Fill in your details below to register or sponsor. For questions, reach Andy Harden directly."
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
            {submitted ? (
              <div className="shadow-elev rounded-2xl border border-green-200 bg-white p-10 text-center">
                <div className="text-cream-50 mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-500">
                  <Check className="h-6 w-6" strokeWidth={3} />
                </div>
                <h3 className="font-display text-navy-900 mt-6 text-2xl font-semibold tracking-tight">
                  Registration received.
                </h3>
                <p className="text-mesh-700 mt-3">
                  Thank you. See you on Saturday, June 6, 2026 at The Legacy Golf Club.
                </p>
                <div className="border-cream-200 bg-cream-50 mx-auto mt-7 max-w-md rounded-xl border p-5 text-left">
                  <p className="text-mesh-500 inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                    <Lock className="h-3.5 w-3.5" /> Entries are locked
                  </p>
                  <p className="text-mesh-700 mt-3 text-sm leading-relaxed">
                    Your entries cannot be edited after submission. Any corrections, player swaps,
                    or special requests will be handled manually on event day — please bring them up
                    with{' '}
                    <span className="text-navy-900 font-semibold">Andy Harden</span> at check-in.
                  </p>
                  <p className="text-mesh-700 mt-3 text-sm leading-relaxed">
                    Reach Andy in advance at{' '}
                    <a
                      href="mailto:hackinforeharden@gmail.com"
                      className="font-semibold text-green-600 hover:underline"
                    >
                      hackinforeharden@gmail.com
                    </a>{' '}
                    or <span className="text-navy-900 font-semibold">480-414-8891</span>.
                  </p>
                </div>
                <div className="mt-7">
                  <Button asChild variant="ghost" size="md">
                    <Link href="/">Back to home</Link>
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="border-cream-200 shadow-elev space-y-6 rounded-2xl border bg-white p-8 sm:p-10"
              >
                {(() => {
                  const current = TIERS.find((t) => t.id === tier) ?? TIERS[0]
                  const CurrentIcon = current.icon
                  const isGold = current.accent === 'gold'
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
                            {current.name}
                          </p>
                          <p className="text-mesh-500 font-mono text-[11px] font-semibold tracking-[0.18em] uppercase">
                            {current.price}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            document
                              .getElementById('tiers')
                              ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }
                          className="text-mesh-700 hover:text-navy-900 hover:bg-cream-100 inline-flex flex-none cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-mono text-[10px] font-semibold tracking-[0.2em] uppercase transition-colors"
                        >
                          Change <ArrowRight className="h-3 w-3" />
                        </button>
                        <input type="hidden" name="tier" value={tier} />
                      </div>
                    </Field>
                  )
                })()}

                {tier === 'foursome' ? (
                  <div className="space-y-4">
                    {/* Compact intro banner with live completion counter */}
                    <div className="border-cream-200 bg-cream-50 flex items-center gap-4 rounded-xl border p-4">
                      <div className="bg-green-500 text-cream-50 flex h-10 w-10 flex-none items-center justify-center rounded-lg shadow-[0_8px_18px_-10px_rgba(46,125,63,0.55)]">
                        <Users className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-navy-900 font-display text-sm font-semibold tracking-tight">
                          Foursome registration
                        </p>
                        <p className="text-mesh-600 mt-0.5 text-xs leading-relaxed">
                          Player 1 is the lead contact. Name, email and phone are required for all
                          four players.
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

                    {/* Tab strip — segmented control */}
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
                              {complete ? (
                                <Check className="h-3 w-3" strokeWidth={3} />
                              ) : (
                                idx + 1
                              )}
                            </span>
                            <span className="hidden sm:inline">Player {idx + 1}</span>
                            <span className="sm:hidden">P{idx + 1}</span>
                            {isLeadTab && active ? (
                              <span className="bg-green-500/12 text-green-700 ml-0.5 hidden rounded px-1.5 py-0.5 font-mono text-[9px] font-semibold tracking-[0.15em] uppercase md:inline">
                                Lead
                              </span>
                            ) : null}
                            {/* Active underline indicator */}
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

                    {/* Animated single-player panel */}
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
                            {/* Player header row */}
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
                                {complete ? (
                                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                                ) : (
                                  playerNum
                                )}
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

                            {/* Primary required fields — Name · Email · Phone */}
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

                            {/* Optional details — Group/Role · Notes */}
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
                                  onChange={(e) =>
                                    updatePlayer(index, 'groupInfo', e.target.value)
                                  }
                                />
                              </Field>
                              <Field
                                id={`${idBase}-notes`}
                                label="Notes"
                                hint="Shirt size, dietary, accessibility."
                              >
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

                    {/* Step navigation */}
                    <div className="border-cream-200 flex items-center justify-between gap-3 border-t pt-4">
                      <button
                        type="button"
                        onClick={() =>
                          setActivePlayer((p) => Math.max(0, p - 1))
                        }
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
                        onClick={() =>
                          setActivePlayer((p) => Math.min(players.length - 1, p + 1))
                        }
                        disabled={activePlayer === players.length - 1}
                        className="text-cream-50 inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold tracking-tight transition-colors hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-cream-300 disabled:text-mesh-500"
                      >
                        Next <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <Field id="reg-first" label="First name" required>
                        <Input
                          id="reg-first"
                          name="firstName"
                          type="text"
                          autoComplete="given-name"
                          required
                        />
                      </Field>
                      <Field id="reg-last" label="Last name" required>
                        <Input
                          id="reg-last"
                          name="lastName"
                          type="text"
                          autoComplete="family-name"
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
                          required
                        />
                      </Field>
                      <Field id="reg-phone" label="Phone" hint="Optional">
                        <Input
                          id="reg-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          placeholder="(480) 555-0123"
                        />
                      </Field>
                    </div>

                    <Field
                      id="reg-org"
                      label="Company / Organization"
                      hint="Optional — for sponsorship recognition"
                    >
                      <Input
                        id="reg-org"
                        name="organization"
                        type="text"
                        autoComplete="organization"
                      />
                    </Field>

                    <Field id="reg-notes" label="Special requests / notes">
                      <Textarea
                        id="reg-notes"
                        name="notes"
                        rows={3}
                        placeholder="Dietary restrictions, hole sponsorship logo upload, anything else we should know."
                      />
                    </Field>
                  </>
                )}

                {/* SMS consent — two separate, optional, NOT pre-checked checkboxes,
                    placed at the bottom of the form, above the submit button.
                    Required by Operation 1776 A2P 10DLC SOP items 7, 8, 9, 11. */}
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

                <div className="border-cream-200 flex flex-wrap items-center gap-4 border-t pt-6">
                  <Button type="submit" variant="primary" size="lg" disabled={!foursomeReady}>
                    <CreditCard className="h-4 w-4" /> Submit registration
                  </Button>
                  {tier === 'foursome' && !foursomeReady ? (
                    <p className="text-mesh-500 text-xs">
                      Complete all four players (name, email, phone) to enable submission.
                    </p>
                  ) : null}
                  <p className="text-mesh-500 text-xs">
                    By submitting you agree to the{' '}
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
                  </p>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </Section>
    </main>
  )
}

export default RegistrationPage
