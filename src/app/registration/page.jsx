'use client'

import Link from 'next/link'

import { useState } from 'react'

import {
  ArrowRight,
  CalendarRange,
  Check,
  CreditCard,
  Flag,
  HandHeart,
  MapPin,
  Medal,
  ShieldCheck,
  Star,
  Target,
  Trophy,
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
import { Checkbox, Field, Input, Select, Textarea } from '@/components/ui/form-field'
import SectionHeader from '@/components/ui/section-header'
import SmsConsent from '@/components/ui/sms-consent'

import { siteConfig } from '@/constants/site'

/* TIERS — names + prices verbatim from source registration page.
 * Source provides NO per-tier perks or marketing descriptions, so cards
 * carry only a tier name and dollar amount. The Individual Golfer tier
 * is the only exception: source explicitly states what is included with
 * the $150 entry (event details block on home page).
 */
const TIERS = [
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
    featured: true,
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

const RegistrationPage = () => {
  const [tier, setTier] = useState('individual')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
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

        <Stagger
          className="mt-14 grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3"
          delay={0.07}
        >
          {TIERS.map((t) => {
            const Icon = t.icon
            const isSelected = tier === t.id
            return (
              <StaggerItem key={t.id} className="h-full">
                <button
                  type="button"
                  onClick={() => {
                    setTier(t.id)
                    document
                      .getElementById('register-form')
                      ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }}
                  className="group/tier block h-full w-full text-left"
                >
                  <MotionCard
                    glow={t.accent === 'gold' ? 'gold' : 'green'}
                    className={`flex h-full flex-col overflow-hidden rounded-xl border bg-white p-7 transition-colors duration-300 ${
                      isSelected ? 'border-green-500 ring-2 ring-green-500/30' : 'border-cream-200'
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
                <Field id="reg-tier" label="Selected tier" required>
                  <Select
                    id="reg-tier"
                    name="tier"
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    required
                  >
                    {TIERS.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name} — {t.price}
                      </option>
                    ))}
                  </Select>
                </Field>

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
                    <Input id="reg-email" name="email" type="email" autoComplete="email" required />
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
                  <Input id="reg-org" name="organization" type="text" autoComplete="organization" />
                </Field>

                <Field
                  id="reg-foursome"
                  label="Foursome members"
                  hint="If you're booking a foursome, list the additional player names. We'll pair you with others if you leave this blank."
                >
                  <Textarea
                    id="reg-foursome"
                    name="foursome"
                    rows={4}
                    placeholder="Player 2 name&#10;Player 3 name&#10;Player 4 name"
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
                  <Button type="submit" variant="primary" size="lg">
                    <CreditCard className="h-4 w-4" /> Submit registration
                  </Button>
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
