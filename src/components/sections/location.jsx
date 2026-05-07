import Image from 'next/image'
import Link from 'next/link'

import { ArrowRight, Compass, MapPin, Phone } from 'lucide-react'

import FadeIn from '@/components/motion/fade-in'
import MotionCard from '@/components/motion/motion-card'
import Section from '@/components/sections/section'
import Button from '@/components/ui/button'
import SectionHeader from '@/components/ui/section-header'

import { siteConfig } from '@/constants/site'

const Location = () => {
  const { mapsUrl } = siteConfig.event

  return (
    <Section id="location" className="bg-cream-50">
      <SectionHeader
        eyebrow="Location · Address Detail"
        title={
          <>
            <span className="text-green-500">The Legacy</span> Golf Club, Phoenix.
          </>
        }
        lead="The Legacy Golf Club in Phoenix has hosted this event all eleven years. Legacy is where Josh worked and it represented his Golfing Family in Arizona."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Address card */}
        <FadeIn className="lg:col-span-5">
          <MotionCard
            glow="green"
            className="border-cream-200 h-full overflow-hidden rounded-2xl border bg-white p-8"
          >
            <div className="bg-gold-400 absolute inset-x-8 top-0 h-[3px]" aria-hidden />

            <p className="text-gold-500 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
              Tournament venue
            </p>
            <h3 className="font-display text-navy-900 mt-2 text-2xl font-semibold tracking-tight">
              The Legacy Golf Club
            </h3>

            <div className="border-cream-200 mt-7 space-y-5 border-t pt-6">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open The Legacy Golf Club address on Google Maps"
                className="text-mesh-700 hover:text-navy-900 group flex items-start gap-3 text-sm transition-colors"
              >
                <MapPin
                  className="mt-0.5 h-4 w-4 flex-none text-green-500 transition-colors group-hover:text-green-600"
                  strokeWidth={1.75}
                />
                <span className="group-hover:underline group-hover:underline-offset-4">
                  6808 S 32nd St
                  <br />
                  Phoenix, AZ 85042-6004
                </span>
              </a>
              <div className="text-mesh-700 flex items-start gap-3 text-sm">
                <Compass className="mt-0.5 h-4 w-4 flex-none text-green-500" strokeWidth={1.75} />
                <span>Course: Legacy</span>
              </div>
              <div className="text-mesh-700 flex items-start gap-3 text-sm">
                <Phone className="mt-0.5 h-4 w-4 flex-none text-green-500" strokeWidth={1.75} />
                <a
                  href="tel:6023055550"
                  className="text-navy-900 font-semibold hover:text-green-600"
                >
                  602-305-5550
                </a>
              </div>
            </div>

            <div className="border-cream-200 mt-8 border-t pt-6">
              <Button asChild variant="primary" size="md">
                <Link href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  Get directions <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionCard>
        </FadeIn>

        {/* Map placeholder — styled card matching the homepage aesthetic */}
        <FadeIn className="lg:col-span-7" delay={0.12}>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open The Legacy Golf Club on Google Maps"
            className="border-navy-700 bg-navy-900 hover:border-gold-400/60 group relative block h-full min-h-[360px] overflow-hidden rounded-2xl border transition-colors"
          >
            {/* Venue photo — aerial of The Legacy Golf Club */}
            <Image
              src="/asset/images/event-5.jpg"
              alt="Aerial view of The Legacy Golf Club, Phoenix"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="ease-out-soft object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(150deg, rgba(20,32,52,0.62) 0%, rgba(11,18,32,0.86) 60%, rgba(11,18,32,0.92) 100%)',
              }}
              aria-hidden
            />
            <div className="bg-mesh-grid bg-grid-32 absolute inset-0 opacity-30" aria-hidden />

            {/* Map pin emblem */}
            <div className="relative flex h-full w-full flex-col items-center justify-center p-10 text-center">
              <div className="border-gold-400/40 bg-navy-800 group-hover:border-gold-400/80 group-hover:bg-navy-700 flex h-16 w-16 items-center justify-center rounded-full border transition-all duration-300 group-hover:-translate-y-0.5">
                <MapPin
                  className="text-gold-400 group-hover:text-gold-300 h-7 w-7 transition-colors"
                  strokeWidth={1.5}
                />
              </div>
              <p className="text-gold-400 mt-6 font-mono text-[10px] font-semibold tracking-[0.32em] uppercase">
                Phoenix, Arizona
              </p>
              <h4 className="font-display text-cream-50 mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
                6808 S 32nd St · 85042
              </h4>
              <p className="text-cream-100/65 mt-3 max-w-[34ch] text-sm leading-relaxed">
                Course: Legacy. Hosted by The Legacy Golf Course every year of the tournament.
              </p>
            </div>

            <div
              className="via-gold-400/80 pointer-events-none absolute inset-x-6 top-0 h-[2px] bg-gradient-to-r from-transparent to-transparent"
              aria-hidden
            />
          </a>
        </FadeIn>
      </div>
    </Section>
  )
}

export default Location
