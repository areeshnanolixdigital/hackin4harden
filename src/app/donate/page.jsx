import Link from 'next/link'

import { ArrowRight, HandHeart, Phone } from 'lucide-react'

import MotionCard from '@/components/motion/motion-card'
import PageHero from '@/components/sections/page-hero'
import Section from '@/components/sections/section'
import Button from '@/components/ui/button'
import SectionHeader from '@/components/ui/section-header'

import { siteConfig } from '@/constants/site'

export const metadata = {
  title: 'Donate · Hackin’ for Harden 2026',
  description:
    'Donate directly to the Joshua Cole Harden Scholarship Fund. Preset amounts $100 / $200 / $250 / $300 / $500.',
}

/* Donation tiers mirror the GHL catalog (Donation tiers product with
 * 5 prices). Each card deep-links into /registration's donation section
 * with the matching slug, so the form / Stripe / GHL pipeline is reused. */
const DONATIONS = [
  { id: 'donation500', amount: '$500', href: '/registration?tier=donation500#donations' },
  { id: 'donation300', amount: '$300', href: '/registration?tier=donation300#donations' },
  { id: 'donation250', amount: '$250', href: '/registration?tier=donation250#donations' },
  { id: 'donation200', amount: '$200', href: '/registration?tier=donation200#donations' },
  { id: 'donation100', amount: '$100', href: '/registration?tier=donation100#donations' },
]

const DonatePage = () => {
  return (
    <main>
      <PageHero
        eyebrow="Donate"
        title={
          <>
            Grow the <span className="text-green-300">Scholarship Fund</span>.
          </>
        }
        lead="Donations support The First Tee of Phoenix kids who otherwise couldn't access the sport. Every dollar compounds the legacy in Josh's name."
      />

      <Section id="amounts" className="bg-cream-50">
        <SectionHeader
          eyebrow="Choose your gift"
          title={
            <>
              Five preset amounts to grow the <span className="text-green-500">fund</span>.
            </>
          }
          lead="Each preset reuses the same secure Stripe checkout the tournament registration uses. A Stripe receipt is emailed automatically."
        />
        <div className="mt-10 grid gap-6 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {DONATIONS.map((d) => (
            <Link
              key={d.id}
              href={d.href}
              aria-label={`Donate ${d.amount}`}
              className="group/tier block rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/40 focus-visible:ring-offset-2"
            >
              <MotionCard
                glow="green"
                className="border-cream-200 hover:border-green-300 flex h-full flex-col overflow-hidden rounded-xl border bg-white p-7 transition-colors"
              >
                <div className="absolute inset-x-7 top-0 h-[3px] bg-green-500" aria-hidden />
                <div className="border-cream-200 bg-cream-50 flex h-11 w-11 items-center justify-center rounded-lg border text-green-500">
                  <HandHeart className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <p className="font-display text-navy-900 mt-6 text-3xl font-bold tracking-tight">
                  {d.amount}
                </p>
                <p className="text-mesh-500 mt-4 flex-1 text-sm leading-relaxed italic">
                  Donation to the Joshua Cole Harden Scholarship Fund.
                </p>
                <p className="border-cream-100 mt-6 inline-flex items-center gap-2 border-t pt-5 font-mono text-[11px] font-semibold tracking-[0.22em] text-navy-900 uppercase group-hover/tier:text-green-600">
                  Donate {d.amount} <ArrowRight className="h-3.5 w-3.5" />
                </p>
              </MotionCard>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <p className="text-mesh-700 text-sm">
            Looking for a different amount? You can also{' '}
            <Link
              href="/registration#donations"
              className="font-semibold text-green-600 underline-offset-4 hover:underline"
            >
              view the full donation list
            </Link>{' '}
            on the registration page.
          </p>
        </div>
      </Section>

      <Section id="other-ways" className="bg-cream-100">
        <SectionHeader
          eyebrow="Other ways to support"
          title={
            <>
              Play the tournament or <span className="text-gold-500">sponsor</span> the event.
            </>
          }
        />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild variant="primary" size="md">
            <Link href="/register">Register to Play</Link>
          </Button>
          <Button asChild variant="ghost" size="md">
            <Link href="/sponsor">Become a Sponsor</Link>
          </Button>
        </div>
      </Section>

      <Section id="contact" className="bg-cream-50">
        <div className="border-cream-200 mx-auto max-w-3xl rounded-2xl border bg-white p-8 text-center sm:p-10">
          <p className="text-mesh-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
            Questions about a gift?
          </p>
          <p className="text-mesh-700 mt-4">
            Reach Andy Harden at{' '}
            <a
              href={`tel:${siteConfig.contactPhone.replace(/\D/g, '')}`}
              className="text-navy-900 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
            >
              <Phone className="h-4 w-4" /> {siteConfig.contactPhone}
            </a>{' '}
            or{' '}
            <a
              href="mailto:hackinforeharden@gmail.com"
              className="font-semibold text-green-600 hover:underline"
            >
              hackinforeharden@gmail.com
            </a>
            .
          </p>
        </div>
      </Section>
    </main>
  )
}

export default DonatePage
