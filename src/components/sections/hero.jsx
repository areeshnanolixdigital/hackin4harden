'use client'

import Image from 'next/image'
import Link from 'next/link'

import { motion } from 'motion/react'
import { ArrowRight, CalendarRange, HandHeart, Heart, MapPin, Phone } from 'lucide-react'

import Button from '@/components/ui/button'
import Container from '@/components/ui/container'
import CountdownPill from '@/components/ui/countdown-pill'

import { EASE } from '@/constants/motion'
import { siteConfig } from '@/constants/site'

const Hero = () => {
  return (
    <section className="bg-cream-50 relative overflow-hidden pt-32 sm:pt-36 lg:pt-44">
      {/* Soft warm vertical wash for premium openness */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #FAF6EC 0%, #F5EFE0 55%, #F0E9D6 100%)',
        }}
      />
      {/* Subtle mesh-grid (gold dots on cream — quiet warmth) */}
      <div
        className="bg-mesh-grid bg-grid-32 pointer-events-none absolute inset-0 opacity-70"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-48 -right-40 h-[720px] w-[720px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(194,138,32,0.18) 0%, rgba(194,138,32,0) 60%)',
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-48 -left-40 h-[640px] w-[640px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(46,125,63,0.10) 0%, rgba(46,125,63,0) 60%)',
        }}
        aria-hidden
      />

      <Container className="relative z-10">
        <div className="pb-section grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
          {/* Left — campaign copy */}
          <div className="lg:col-span-7">
            {/* Eyebrow — campaign-style date stamp */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE.outSoft }}
              className="border-gold-500 inline-flex items-center gap-3 border-l-2 pl-4"
            >
              <span className="text-gold-600 font-mono text-[11px] font-semibold tracking-[0.28em] uppercase">
                11th Annual
              </span>
              <span className="bg-mesh-400 h-1 w-1 rounded-full" aria-hidden />
              <span className="text-mesh-700 font-mono text-[11px] font-semibold tracking-[0.28em] uppercase">
                Saturday · June 6, 2026 · The Legacy Golf Club, Phoenix
              </span>
            </motion.div>

            {/* Title — keep the gold "for" emphasis; copy condensed to the
                event name itself so the sub-headline can carry the context. */}
            <motion.h1
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.1, ease: EASE.outSoft }}
              className="font-display text-navy-900 mt-8 text-[44px] leading-[1.04] font-semibold tracking-[-0.025em] text-balance sm:text-[60px] lg:text-[72px]"
            >
              Hackin&apos;
              <br />
              <span className="text-gold-500">for</span> Harden.
            </motion.h1>

            {/* Sub-headline — explains what the event is in one sentence. */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: EASE.outSoft }}
              className="text-navy-900 font-display mt-5 max-w-2xl text-xl font-medium tracking-tight sm:text-2xl"
            >
              A memorial golf tournament for Joshua Cole Harden.
            </motion.p>

            {/* Lead paragraph — cause and recurrence. */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.26, ease: EASE.outSoft }}
              className="text-mesh-700 mt-5 max-w-2xl text-base leading-[1.7] sm:text-lg"
            >
              Since 2015, we&apos;ve gathered to honor Josh and support the scholarship fund in his
              name, benefiting kids at The First Tee of Phoenix. Join us on June 6 for our 11th year
              tournament.
            </motion.p>

            {/* Source: home.txt — partners explicitly named */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.34, ease: EASE.outSoft }}
              className="text-mesh-600 mt-6 flex items-start gap-3 text-sm"
            >
              <Heart className="text-gold-500 mt-0.5 h-4 w-4 flex-none" strokeWidth={1.75} />
              <span>
                In partnership with{' '}
                <span className="text-navy-900 font-semibold">The Legacy Golf Club</span> and{' '}
                <span className="text-navy-900 font-semibold">The First Tee of Phoenix</span>.
              </span>
            </motion.p>

            {/* CTAs — three conversion paths instead of one collapsed funnel.
                /register, /sponsor, /donate are the entry points; /registration
                is still reachable as a full catalog (no breaking change). */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.46, ease: EASE.outSoft }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button asChild variant="gold" size="lg">
                <Link href="/register">
                  Register to Play <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="primary" size="lg">
                <Link href="/donate">
                  <HandHeart className="h-4 w-4" /> Donate
                </Link>
              </Button>
              <Button asChild variant="ghost" size="lg">
                <Link href="/sponsor">Become a Sponsor</Link>
              </Button>
            </motion.div>

            {/* Phone line — high-intent visitors call before committing.
                Match existing helper/muted style; do not introduce a new
                font or color token. */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: EASE.outSoft }}
              className="text-mesh-600 mt-5 inline-flex items-center gap-2 text-sm"
            >
              <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
              <span>
                Questions? Call Andy at{' '}
                <a
                  href={`tel:${siteConfig.contactPhone.replace(/\D/g, '')}`}
                  className="text-navy-900 font-semibold underline-offset-4 hover:underline"
                >
                  {siteConfig.contactPhone}
                </a>
              </span>
            </motion.p>

            {/* Quiet bottom meta — countdown · shotgun · venue, all on
                a single row at desktop. The horizontal gap shrinks on
                medium screens so the venue link doesn't wrap to its
                own line as it was doing before. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.62, ease: EASE.outSoft }}
              className="border-navy-900/10 text-mesh-600 mt-10 flex flex-wrap items-center gap-x-5 gap-y-3 border-t pt-6 text-xs lg:flex-nowrap lg:gap-x-6"
            >
              <CountdownPill />
              <div className="flex flex-none items-center gap-2">
                <CalendarRange className="text-gold-500 h-3.5 w-3.5" strokeWidth={1.75} />
                <span className="font-mono whitespace-nowrap tracking-[0.2em] uppercase">
                  7:30 AM Shotgun Start
                </span>
              </div>
              <a
                href={siteConfig.event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open The Legacy Golf Club on Google Maps"
                className="hover:text-navy-900 group inline-flex flex-none items-center gap-2 transition-colors"
              >
                <MapPin
                  className="h-3.5 w-3.5 text-green-600 transition-colors group-hover:text-green-700"
                  strokeWidth={1.75}
                />
                <span className="font-mono whitespace-nowrap tracking-[0.2em] uppercase">
                  The Legacy Golf Club
                </span>
              </a>
            </motion.div>
          </div>

          {/* Right — large image-frame placeholder (campaign visual anchor) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.18, ease: EASE.outSoft }}
            className="lg:col-span-5"
          >
            <figure className="relative">
              {/* Main image frame — 4/5 aspect, polished light premium card */}
              <div className="border-cream-200 relative aspect-[4/5] overflow-hidden rounded-2xl border bg-white shadow-[0_30px_80px_-30px_rgba(11,18,32,0.22)]">
                {/* Layered backdrop: warm cream wash */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(160deg, #FFFFFF 0%, #FAF6EC 55%, #F5EFE0 100%)',
                  }}
                  aria-hidden
                />
                <div className="bg-mesh-grid bg-grid-32 absolute inset-0 opacity-50" aria-hidden />

                {/* Soft gold halo */}
                <div
                  className="pointer-events-none absolute inset-x-0 -top-16 mx-auto h-[280px] w-[280px] rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(194,138,32,0.22) 0%, rgba(194,138,32,0) 65%)',
                  }}
                  aria-hidden
                />

                {/* Centered emblem — placeholder image. Vertical padding
                    keeps the centered column from riding up under the
                    "Registration Open" badge on small screens. */}
                <div className="relative flex h-full w-full flex-col items-center justify-start px-8 pt-[60px] pb-14 text-center sm:justify-center sm:pt-10 sm:pb-10">
                  <div className="relative h-20 w-20 shrink-0 sm:h-40 sm:w-40">
                    <Image
                      src="/logo.webp"
                      alt="Hackin' for Harden Memorial Golf Tournament"
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>

                  <p className="text-gold-600 mt-8 font-mono text-[10px] font-semibold tracking-[0.32em] uppercase">
                    In Honor Of
                  </p>
                  <h2 className="font-display text-navy-900 mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
                    Joshua Cole Harden
                  </h2>
                  <p className="text-mesh-500 mt-2 font-mono text-[11px] tracking-[0.24em] uppercase">
                    Age 32 · Lost in 2015
                  </p>

                  <div className="bg-gold-400/70 mt-8 h-px w-16 shrink-0" aria-hidden />

                  <p className="text-mesh-600 mt-6 max-w-[28ch] text-[13px] leading-relaxed">
                    Benefiting the Joshua Cole Harden Scholarship Fund and The First Tee of Phoenix.
                  </p>
                </div>

                {/* Top accent rule */}
                <div
                  className="pointer-events-none absolute inset-x-6 top-0 h-[2px]"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(194,138,32,0) 0%, rgba(194,138,32,0.9) 50%, rgba(194,138,32,0) 100%)',
                  }}
                  aria-hidden
                />

                {/* Corner badge — verbatim source phrase */}
                <div className="border-cream-200 bg-cream-50/85 absolute top-5 right-5 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur">
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
                  <span className="text-navy-900 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase">
                    Registration Open
                  </span>
                </div>
              </div>

            </figure>
          </motion.div>
        </div>
      </Container>

      {/* Bottom hairline — designguide trace-line */}
      <div className="via-gold-400/60 absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent" />
    </section>
  )
}

export default Hero
