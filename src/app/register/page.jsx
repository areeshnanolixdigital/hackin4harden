import Link from 'next/link'

import { ArrowRight, CalendarRange, MapPin, Phone, Target, Users } from 'lucide-react'

import MotionCard from '@/components/motion/motion-card'
import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Badge from '@/components/ui/badge'
import Button from '@/components/ui/button'
import SectionHeader from '@/components/ui/section-header'

import { siteConfig } from '@/constants/site'

export const metadata = {
  title: 'Register to Play · Hackin’ for Harden 2026',
  description:
    'Register a Foursome or Individual Golfer entry for the 11th Annual Hackin’ for Harden Memorial Golf Tournament — Saturday, June 6, 2026.',
}

/* Tickets-only landing page. Two cards (Foursome / Individual) both
 * deep-link into the full /registration page with the matching tier
 * preselected, so the entire form / Stripe / GHL pipeline is reused. */
const TICKETS = [
  {
    id: 'foursome',
    icon: Users,
    name: 'Foursome',
    price: '$600',
    note: '$150/player · save vs. individual',
    featured: true,
    accent: 'green',
    includes: [
      '4 players · full team entry',
      '18 holes with cart',
      'Breakfast',
      'BBQ lunch buffet',
      'Prizes · hole-in-one · proximity',
    ],
    href: '/registration?tier=foursome#tickets',
    cta: 'Register foursome',
  },
  {
    id: 'individual',
    icon: Target,
    name: 'Individual Golfer',
    price: '$150',
    note: "Single entry · we'll pair you with a team",
    featured: false,
    accent: 'gold',
    includes: [
      '1 player entry',
      '18 holes with cart',
      'Breakfast',
      'BBQ lunch buffet',
      'Prizes · hole-in-one · proximity',
      'Paired with other singles for a team of 4',
    ],
    href: '/registration?tier=individual#tickets',
    cta: 'Register as individual',
  },
]

const RegisterPage = () => {
  return (
    <main>
      <PageHero
        eyebrow="Register to Play"
        title={
          <>
            Reserve your spot at the <span className="text-gold-400">11th Annual</span>.
          </>
        }
        lead="Choose a foursome or individual golfer registration. Both include 18 holes with cart, breakfast, BBQ lunch buffet, prizes, hole-in-one contest, and proximity prizes."
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
            className="hover:text-cream-50 group inline-flex items-center gap-2 transition-colors"
          >
            <MapPin className="h-4 w-4 text-green-300 transition-colors group-hover:text-green-200" />
            <span className="group-hover:underline group-hover:underline-offset-4">
              The Legacy Golf Club, Phoenix
            </span>
          </a>
        </div>
      </PageHero>

      <Section id="tickets" className="bg-cream-50">
        <SectionHeader
          eyebrow="Choose your registration"
          title={
            <>
              Two ways to <span className="text-green-500">play</span>.
            </>
          }
          lead="Pick a foursome for the full team experience or take a single seat — we'll pair you with three other golfers."
        />

        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2">
          {TICKETS.map((t) => {
            const Icon = t.icon
            return (
              <Link
                key={t.id}
                href={t.href}
                aria-label={`Choose ${t.name} on the registration page`}
                className="group/tier block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40 focus-visible:ring-offset-2"
              >
                <MotionCard
                  glow={t.accent === 'gold' ? 'gold' : 'green'}
                  className="border-cream-200 hover:border-green-300 flex h-full flex-col overflow-hidden rounded-xl border bg-white p-7 transition-[border-color,box-shadow,background-color]"
                >
                  <div
                    className={`absolute inset-x-7 top-0 h-[3px] ${
                      t.accent === 'gold' ? 'bg-gold-400' : 'bg-green-500'
                    }`}
                    aria-hidden
                  />
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
                  <h3 className="font-display text-navy-900 mt-6 text-xl font-semibold tracking-tight">
                    {t.name}
                  </h3>
                  <p className="font-display text-navy-900 mt-3 text-3xl font-bold tracking-tight">
                    {t.price}
                  </p>
                  <p className="text-mesh-500 mt-1 font-mono text-[11px] font-semibold tracking-[0.18em] uppercase">
                    {t.note}
                  </p>
                  <ul className="border-cream-200 mt-6 flex-1 space-y-2.5 border-t pt-5">
                    {t.includes.map((line) => (
                      <li
                        key={line}
                        className="text-mesh-700 flex items-start gap-2.5 text-sm leading-relaxed"
                      >
                        <span
                          className={`mt-2 h-1 w-1 flex-none rounded-full ${
                            t.accent === 'gold' ? 'bg-gold-500' : 'bg-green-500'
                          }`}
                          aria-hidden
                        />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                  <p
                    className={`border-cream-100 mt-auto inline-flex items-center gap-2 border-t pt-5 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase ${
                      'text-navy-900 group-hover/tier:text-green-600'
                    }`}
                  >
                    {t.cta} <ArrowRight className="h-3.5 w-3.5" />
                  </p>
                </MotionCard>
              </Link>
            )
          })}
        </div>
      </Section>

      <Section id="other-ways" className="bg-cream-100">
        <SectionHeader
          eyebrow="Other ways to give"
          title={
            <>
              Not playing? You can still <span className="text-gold-500">support</span>.
            </>
          }
          lead="If golf isn't your thing, you can sponsor the event or donate directly to the Joshua Cole Harden Scholarship Fund."
        />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild variant="primary" size="md">
            <Link href="/sponsor">Become a Sponsor</Link>
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link href="/donate">Donate</Link>
          </Button>
        </div>
      </Section>

      <Section id="contact-block" className="bg-cream-50">
        <div className="border-cream-200 mx-auto max-w-3xl rounded-2xl border bg-white p-8 text-center sm:p-10">
          <p className="text-mesh-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
            Need to talk first?
          </p>
          <p className="text-mesh-700 mt-3 text-sm">
            Reach Andy Harden directly at{' '}
            <a
              href="mailto:hackinforeharden@gmail.com"
              className="font-semibold text-green-600 hover:underline"
            >
              hackinforeharden@gmail.com
            </a>{' '}
            or call{' '}
            <a
              href={`tel:${siteConfig.contactPhone.replace(/\D/g, '')}`}
              className="text-navy-900 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
            >
              <Phone className="h-3.5 w-3.5" /> {siteConfig.contactPhone}
            </a>
            .
          </p>
        </div>
      </Section>
    </main>
  )
}

export default RegisterPage
