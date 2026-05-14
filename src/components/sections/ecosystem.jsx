'use client'

import Link from 'next/link'

import { useCallback, useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowRight, ArrowUpRight } from 'lucide-react'

import MotionCard from '@/components/motion/motion-card'
import Section from '@/components/sections/section'
import SectionHeader from '@/components/ui/section-header'

import { cn } from '@/lib/utils'
import { ECOSYSTEM } from '@/constants/homepage'

const ACCENT_RULE = {
  green: 'bg-gradient-to-r from-green-500 to-transparent',
  gold: 'bg-gradient-to-r from-gold-400 to-transparent',
}
const ACCENT_ICON = { green: 'text-green-300', gold: 'text-gold-400' }

const baseShell =
  'flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border p-7 transition-colors'
const infoSurface = 'border-navy-700 bg-navy-900 hover:border-navy-600'
const ctaSurface = {
  gold: 'border-gold-400 bg-gold-50 hover:bg-gold-100 hover:border-gold-500',
  green: 'border-green-400 bg-green-50/80 hover:bg-green-100/80 hover:border-green-500',
}
const ctaText = { gold: 'text-gold-700', green: 'text-green-700' }
const ctaIconBg = {
  gold: 'bg-gold-400/15 border-gold-400/40',
  green: 'bg-green-500/15 border-green-500/40',
}
const ctaIconColor = { gold: 'text-gold-600', green: 'text-green-600' }

const AUTO_ADVANCE_MS = 3000

const EcosystemCard = ({ card }) => {
  const Icon = card.icon
  const isCta = Boolean(card.cta)
  const accent = card.accent === 'gold' ? 'gold' : 'green'

  return (
    <MotionCard
      glow={accent}
      className={cn(baseShell, isCta ? ctaSurface[accent] : infoSurface)}
    >
      <div
        className={cn('absolute inset-x-7 top-0 h-[3px]', ACCENT_RULE[accent])}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-4">
        <div
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-lg border transition-colors duration-300',
            isCta
              ? ctaIconBg[accent]
              : 'border-navy-700 bg-navy-800 group-hover/card:border-navy-600',
          )}
        >
          <Icon
            className={cn('h-5 w-5', isCta ? ctaIconColor[accent] : ACCENT_ICON[accent])}
            strokeWidth={1.5}
          />
        </div>
        {isCta ? (
          <span
            className={cn(
              'inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold tracking-[0.22em] uppercase',
              ctaText[accent],
            )}
          >
            {card.ctaLabel ?? 'Choose'}
            <ArrowRight className="h-3 w-3" />
          </span>
        ) : (
          <ArrowUpRight
            className="text-cream-100/40 group-hover/card:text-cream-50 h-4 w-4 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/card:translate-x-1 group-hover/card:-translate-y-1"
            strokeWidth={1.5}
          />
        )}
      </div>

      <div className="mt-6 flex-1">
        <p
          className={cn(
            'font-mono text-[11px] font-semibold tracking-[0.22em] uppercase',
            isCta ? ctaText[accent] : 'text-gold-400',
          )}
        >
          {card.sub}
        </p>
        <h3
          className={cn(
            'font-display mt-2 text-2xl font-semibold tracking-tight',
            isCta ? 'text-navy-900' : 'text-cream-50',
          )}
        >
          {card.title}
        </h3>
        <p
          className={cn(
            'mt-3 text-sm leading-relaxed',
            isCta ? 'text-mesh-700' : 'text-cream-100/72',
          )}
        >
          {card.description}
        </p>
      </div>

      {/* Reserve space at the bottom for the absolute pagination bars
       * so the description never collides with them. Only meaningful
       * inside the rotating slot, but cheap to include in Platinum too
       * (just empty padding) to keep both cards the same height. */}
      <div className="h-6" aria-hidden />
    </MotionCard>
  )
}

const Ecosystem = () => {
  /* Sticky Platinum + sponsor-only carousel. CTAs (Individual,
   * Donation) are excluded from this section by design. */
  const platinum = ECOSYSTEM.find((c) => c.title === 'Platinum Sponsor')
  const rotating = ECOSYSTEM.filter((c) => c !== platinum && !c.cta)

  const [activeIdx, setActiveIdx] = useState(0)
  const [direction, setDirection] = useState(1)

  /* Hover state pauses auto-advance via a ref the interval reads
   * each tick. Using a ref avoids re-creating the interval on every
   * pointerenter/leave and dodges the stale-closure bug. */
  const hoverRef = useRef(false)

  const goTo = useCallback(
    (next, dir) => {
      setDirection(dir)
      setActiveIdx(((next % rotating.length) + rotating.length) % rotating.length)
    },
    [rotating.length],
  )

  useEffect(() => {
    const id = setInterval(() => {
      if (hoverRef.current) return
      setDirection(1)
      setActiveIdx((i) => (i + 1) % rotating.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(id)
  }, [rotating.length])

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 40 : -40 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -40 : 40 }),
  }

  const active = rotating[activeIdx]

  return (
    <Section id="ecosystem" className="bg-cream-50">
      <SectionHeader
        eyebrow="Sponsors · Registration"
        title={
          <>
            Sponsorship tiers from <span className="text-gold-500">$100 to $10,000</span>.
          </>
        }
        lead="Sponsors and registration options are available across every tier. Donations grow the Joshua Cole Harden Scholarship Fund and benefit The First Tee of Phoenix."
      />

      {/* items-stretch + h-full on each slot makes Platinum and the
       * carousel card share the same row height. The pagination bars
       * sit absolutely positioned over the carousel card so the layout
       * matches Platinum's footprint exactly. */}
      <div className="mt-10 grid items-stretch gap-6 sm:mt-14 sm:gap-7 lg:grid-cols-2">
        {/* Sticky Platinum. */}
        {platinum ? (
          <Link
            href={platinum.href ?? '/registration'}
            aria-label={`Choose ${platinum.title} on the registration page`}
            className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
          >
            <EcosystemCard card={platinum} />
          </Link>
        ) : null}

        {/* Rotating slot — fills the row height and pauses on hover. */}
        <div
          className="relative h-full"
          onMouseEnter={() => {
            hoverRef.current = true
          }}
          onMouseLeave={() => {
            hoverRef.current = false
          }}
        >
          <div className="relative h-full" aria-live="polite">
            <AnimatePresence custom={direction} initial={false} mode="wait">
              <motion.div
                key={active.title}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="h-full"
              >
                <Link
                  href={active.href ?? '/registration'}
                  aria-label={
                    active.ctaLabel
                      ? `${active.ctaLabel} — ${active.title}`
                      : `Choose ${active.title} on the registration page`
                  }
                  className="block h-full rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-cream-50"
                >
                  <EcosystemCard card={active} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Absolute pagination bars at the bottom of the slider card.
           * The card already reserves a 24px footer strip so the bars
           * sit over empty space — no overlap with the description. */}
          <div className="pointer-events-none absolute inset-x-0 bottom-5 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-2">
              {rotating.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  onClick={() => goTo(i, i > activeIdx ? 1 : -1)}
                  aria-label={`Show ${c.title}`}
                  aria-current={i === activeIdx ? 'true' : 'false'}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    i === activeIdx
                      ? 'bg-gold-400 w-6'
                      : 'bg-cream-100/30 hover:bg-cream-100/60 w-3',
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default Ecosystem
