import Link from 'next/link'

import { ArrowRight, ShieldCheck } from 'lucide-react'

import FadeIn from '@/components/motion/fade-in'
import Stagger from '@/components/motion/stagger'
import StaggerItem from '@/components/motion/stagger-item'
import Button from '@/components/ui/button'
import Container from '@/components/ui/container'

import { PROOF_CHIPS } from '@/constants/homepage'

const FinalCta = () => {
  return (
    <section className="bg-navy-950 relative overflow-hidden">
      <div
        className="bg-mesh-grid bg-grid-32 pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[720px] w-[720px] -translate-x-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(194,138,32,0.18) 0%, rgba(194,138,32,0) 60%)',
        }}
        aria-hidden
      />

      <Container className="section-pad relative z-10">
        <FadeIn className="mx-auto max-w-3xl text-center">
          <span className="text-gold-400 before:bg-gold-400/70 mx-auto inline-flex items-center gap-3 font-mono text-xs font-semibold tracking-[0.22em] uppercase before:block before:h-px before:w-10">
            Join us in honoring Josh
          </span>

          <h2 className="font-display text-display-xl text-cream-50 sm:text-display-2xl mt-6 font-semibold tracking-[-0.025em]">
            Saturday, June 6, 2026. <span className="text-gold-400">7:30 AM shotgun.</span>
          </h2>

          <p className="text-cream-100/72 mx-auto mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
            On behalf of Josh, the Harden family, The First Tee of Phoenix and The Legacy Golf Club,
            it is our honor to welcome each of you to the 2026 11th Annual Hackin&apos; for Harden.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button asChild variant="gold" size="lg">
              <Link href="/registration">
                Register your foursome <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghostLight" size="lg">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>

          <Stagger className="mt-12 flex flex-wrap items-center justify-center gap-3" delay={0.06}>
            {PROOF_CHIPS?.map((chip) => {
              const Icon = chip.icon
              const baseChip =
                'border-cream-50/15 bg-cream-50/5 inline-flex items-center gap-2 rounded-full border px-4 py-2 backdrop-blur'

              const inner = (
                <>
                  <Icon
                    className="h-3.5 w-3.5 text-green-300 transition-colors group-hover:text-green-200"
                    strokeWidth={1.5}
                  />
                  <span className="text-cream-100/85 font-mono text-[11px] font-semibold tracking-[0.22em] uppercase">
                    {chip.label}
                  </span>
                </>
              )

              return (
                <StaggerItem key={chip.label}>
                  {chip.href ? (
                    <a
                      href={chip.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Open ${chip.label} on Google Maps`}
                      className={`${baseChip} hover:border-gold-400/60 hover:bg-cream-50/10 group transition-colors`}
                    >
                      {inner}
                    </a>
                  ) : (
                    <span className={baseChip}>{inner}</span>
                  )}
                </StaggerItem>
              )
            })}
          </Stagger>

          <div className="text-cream-100/45 mt-10 inline-flex items-center gap-2 text-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-green-300" />
            <span className="font-mono tracking-[0.22em] uppercase">
              2026 Registration Now Open
            </span>
          </div>
        </FadeIn>
      </Container>
    </section>
  )
}

export default FinalCta
